export default function handler(req, res) {
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
    connectedClients: io ? io.engine.clientsCount : 0
  });
}