export default function handler(req, res) {
  res.status(200).json({ 
    status: 'Server is running',
    endpoints: {
      webhook: '/api/webhook',
      socket: '/api/socketio'
    }
  });
}