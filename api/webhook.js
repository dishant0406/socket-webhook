export const config = {
  api: {
    bodyParser: true,
  },
};

export default function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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
    return res.status(200).json({ 
      success: true, 
      message: 'Webhook received and broadcasted',
      connectedClients: io.engine.clientsCount
    });
  }

  return res.status(200).json({ 
    success: true, 
    message: 'Webhook received (no active connections)',
    connectedClients: 0
  });
}
