import { chatWithAgent } from '../../../lib/agent-llm'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const auth = req.headers.authorization
  const apiKey = req.headers['x-agent-api-key']
  const token = apiKey || (auth && auth.replace('Bearer ', ''))
  if (!token || (token !== process.env.ADMIN_PASSWORD && token !== process.env.AGENT_API_KEY)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { message, history = [] } = req.body || {}
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing "message" parameter' })
  }

  try {
    const result = await chatWithAgent(message, history, req)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: `Agent error: ${error.message}` })
  }
}
