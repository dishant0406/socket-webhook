export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle GET requests for testing
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'Webhook endpoint is working',
      method: 'POST',
      expectedContentType: 'application/json'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookData = req.body;
  console.log('Webhook received:', webhookData);

  // Get Socket.IO instance and broadcast
  const io = res.socket.server.io;
  if (io) {
    io.emit('webhook-data', webhookData);
  }

  res.status(200).json({ 
    success: true, 
    message: 'Webhook received and broadcasted',
    data: webhookData,
    connectedClients: io ? io.engine.clientsCount : 0
  });
}