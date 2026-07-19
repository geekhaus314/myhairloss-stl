import { executeWithSafety, listAvailableTools } from './agent-executor'

const ZEN_API_URL = 'https://opencode.ai/zen/v1/chat/completions'
const ZEN_MODEL = 'big-pickle'
const MAX_TOOL_ROUNDS = 5

const SYSTEM_PROMPT = `You are the admin agent for myhairloss.com — a hair loss resource and service site run by Brian Ivie (DBA "Brian Ivie Hair & Extensions", LLC "Personal Image Solutions"). You have access to the site's infrastructure through platform tools.

You can:
- Check site health, DNS, email routing, blog posts, deployment status
- Manage Cloudflare DNS, cache, email routing
- Manage Vercel deployments, env vars, domains
- Check Stripe payments, products, balances
- Send emails via Resend
- Manage GoDaddy domains
- Read and list GitHub repo files, commits, issues

IMPORTANT RULES:
- Always be concise and direct in your responses.
- When a tool returns data, summarize it clearly — don't dump raw JSON.
- For destructive actions (marked with _confirmed), warn the user first and explain what will happen.
- Never expose API keys, tokens, or secrets in your responses.
- If a tool call fails, explain what went wrong and suggest next steps.
- You can call multiple tools in sequence to complete a task, but explain what you're doing.

Current site facts:
- Domain: myhairloss.com (Cloudflare DNS, Vercel hosting)
- Admin portal: admin.myhairloss.com
- Email: 7 forwarding rules via Cloudflare Email Routing -> myhairloss.com
- Blog: 31 posts across 6 categories
- Payments: Stripe (live keys)
- Domain expires: Jan 2027 (GoDaddy registrar, transfer deferred)`

function toolsToOpenAIFormat() {
  const tools = listAvailableTools()
  return tools.map(t => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.destructive
        ? `${t.description} [DESTRUCTIVE - requires _confirmed: true]`
        : t.description,
      parameters: {
        type: 'object',
        properties: t.params.reduce((acc, p) => {
          const required = !p.endsWith('?')
          const name = p.replace('?', '')
          acc[name] = { type: 'string', description: name }
          return acc
        }, {}),
        required: t.params.filter(p => !p.endsWith('?')).map(p => p.replace('?', '')),
      },
    },
  }))
}

async function callZenAPI(messages, tools) {
  const body = {
    model: ZEN_MODEL,
    messages,
    max_tokens: 2000,
  }
  if (tools && tools.length > 0) {
    body.tools = tools
  }

  const res = await fetch(ZEN_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenCode Zen API error ${res.status}: ${text}`)
  }

  return res.json()
}

function buildUserMessages(conversationHistory) {
  if (!conversationHistory || conversationHistory.length === 0) return []
  return conversationHistory.map(msg => ({
    role: msg.role,
    content: msg.content,
  }))
}

export async function chatWithAgent(userMessage, conversationHistory = [], req = null) {
  const tools = toolsToOpenAIFormat()
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...buildUserMessages(conversationHistory),
    { role: 'user', content: userMessage },
  ]

  const toolExecutions = []
  let lastResponse = null

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const response = await callZenAPI(messages, tools)
    const choice = response.choices?.[0]
    if (!choice) break

    const assistantMessage = choice.message
    lastResponse = assistantMessage

    messages.push({ role: 'assistant', content: assistantMessage.content, tool_calls: assistantMessage.tool_calls })

    if (choice.finish_reason !== 'tool_calls' || !assistantMessage.tool_calls?.length) {
      break
    }

    for (const toolCall of assistantMessage.tool_calls) {
      const toolName = toolCall.function.name
      let params = {}
      try {
        params = JSON.parse(toolCall.function.arguments)
      } catch {
        params = {}
      }

      const startTime = Date.now()
      let toolResult
      try {
        toolResult = await executeWithSafety(toolName, params, req)
      } catch (err) {
        toolResult = { ok: false, error: err.message }
      }
      const elapsed = Date.now() - startTime

      toolExecutions.push({
        tool: toolName,
        params: safety_maskParams(params),
        ok: toolResult.ok,
        elapsed,
        confidence: toolResult.validation?.confidence,
      })

      messages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolResult.ok ? toolResult.result : { error: toolResult.error }),
      })
    }
  }

  return {
    message: lastResponse?.content || 'No response generated.',
    toolExecutions,
    model: ZEN_MODEL,
  }
}

function safety_maskParams(params) {
  const SECRET_KEYS = ['password', 'secret', 'token', 'api_key', 'apikey', 'authorization']
  const masked = {}
  for (const [k, v] of Object.entries(params)) {
    if (SECRET_KEYS.some(sk => k.toLowerCase().includes(sk))) {
      masked[k] = '[REDACTED]'
    } else {
      masked[k] = v
    }
  }
  return masked
}
