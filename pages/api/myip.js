export default function handler(req, res) {
  const ip = req.headers['cf-connecting-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket.remoteAddress
  res.status(200).json({ ip })
}
