const ZEN_API_URL = 'https://opencode.ai/zen/v1/chat/completions'
const ZEN_MODEL = 'deepseek-v4-flash-free'

const SYSTEM_PROMPT = `You are a helpful assistant for Brian Ivie's hair loss website (myhairloss.com). Brian is the business owner, not a developer. 

Your job:
- Answer questions about the site's content (blog posts, services, products)
- Explain technical concepts in simple, plain English
- Check the site's public status by fetching URLs
- Suggest what Brian should ask his developer to do

You CANNOT:
- Make any changes to the site, DNS, code, or services
- Access any API keys, passwords, or secrets
- Execute any destructive actions
- Write to any database or service
- Access the admin panel or backend

Only use fetch() to read public URLs (website pages, blog posts). Be helpful and encouraging.`

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Send POST with JSON body { message: "..." }', { status: 405 })
    }

    const url = new URL(request.url)
    const secret = url.searchParams.get('secret')
    if (!secret || secret !== process.env.TELEGRAM_BOT_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return new Response('Invalid JSON', { status: 400 })
    }

    const userMessage = body.message?.text || body.message
    if (!userMessage) {
      return new Response('Missing message', { status: 400 })
    }

    const chatId = body.message?.chat?.id || body.chat_id

    try {
      const response = await fetch(ZEN_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: ZEN_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 1000,
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        return new Response(`Zen API error: ${errText}`, { status: 500 })
      }

      const data = await response.json()
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'

      if (chatId) {
        const botToken = process.env.TELEGRAM_BOT_TOKEN
        if (botToken) {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: reply,
              parse_mode: 'Markdown',
            }),
          })
        }
      }

      return new Response(JSON.stringify({ reply }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (err) {
      return new Response(`Error: ${err.message}`, { status: 500 })
    }
  },
}
