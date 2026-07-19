import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  Shield, Send, Globe, LogOut, RefreshCw, FileText, Wrench,
  Activity, Terminal, Bot, User, Loader2, CheckCircle,
  XCircle, AlertTriangle, Eye, Mail, Zap, Trash2, Lock,
  ChevronRight, ChevronDown, LayoutDashboard, ClipboardList, BookOpen, MessageSquare
} from 'lucide-react'

const QUICK_ACTIONS = [
  { label: 'Site Status', tool: 'site_status', icon: Globe, platform: 'site' },
  { label: 'Blog Posts', tool: 'site_list_posts', icon: FileText, platform: 'site' },
  { label: 'Health Check', tool: 'site_health', icon: Activity, platform: 'site' },
  { label: 'Email Status', tool: 'resend_domains', icon: Mail, platform: 'resend' },
  { label: 'CF Zones', tool: 'cf_list_zones', icon: Globe, platform: 'cloudflare' },
  { label: 'Vercel Deploys', tool: 'vercel_deployments', icon: RefreshCw, platform: 'vercel' },
  { label: 'GH Repo', tool: 'gh_repo_info', icon: Activity, platform: 'github' },
  { label: 'Stripe Balance', tool: 'stripe_balance', icon: Zap, platform: 'stripe' },
  { label: 'GoDaddy Domains', tool: 'gd_list_domains', icon: Globe, platform: 'godaddy' },
  { label: 'Env Check', tool: 'site_env_check', icon: ClipboardList, platform: 'site' },
]

const PLATFORM_COLORS = {
  site: 'border-blue-500/20 text-blue-400',
  cloudflare: 'border-orange-500/20 text-orange-400',
  vercel: 'border-white/20 text-white/60',
  github: 'border-purple-500/20 text-purple-400',
  stripe: 'border-indigo-500/20 text-indigo-400',
  resend: 'border-cyan-500/20 text-cyan-400',
  godaddy: 'border-green-500/20 text-green-400',
}

function ValidationBadge({ validation }) {
  if (!validation) return null
  const confidence = Math.round((validation.confidence || 0) * 100)
  const color = confidence >= 80 ? 'text-green-400 bg-green-500/10' : confidence >= 50 ? 'text-yellow-400 bg-yellow-500/10' : 'text-red-400 bg-red-500/10'
  return (
    <div className="flex items-center gap-3 mt-2 text-[10px]">
      <span className={`${color} px-2 py-0.5 rounded font-bold`}>{confidence}% confidence</span>
      <span className="text-white/20">{validation.stepsCompleted}/7 steps passed</span>
      {validation.crossValidation && <span className="text-yellow-400/60">{validation.crossValidation}</span>}
    </div>
  )
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  const isSystem = msg.role === 'system'
  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs px-4 py-2 rounded-full flex items-center gap-2">
          <AlertTriangle className="w-3 h-3" />
          {msg.content}
        </div>
      </div>
    )
  }
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-[#c5a059]' : 'bg-[#111] border border-[#333]'}`}>
        {isUser ? <User className="w-4 h-4 text-[#0a0a0a]" /> : <Bot className="w-4 h-4 text-[#c5a059]" />}
      </div>
      <div className={`max-w-[80%] rounded-xl px-4 py-3 ${isUser ? 'bg-[#c5a059] text-[#0a0a0a]' : 'bg-[#111] border border-[#222] text-white'}`}>
        <p className="text-sm whitespace-pre-wrap leading-relaxed font-mono">{msg.content}</p>
        {msg.toolExecutions?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {msg.toolExecutions.map((te, i) => (
              <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${
                te.ok ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-red-500/30 text-red-400 bg-red-500/5'
              }`}>
                {te.ok ? <CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> : <XCircle className="w-2.5 h-2.5 inline mr-0.5" />}
                {te.tool} {te.elapsed ? `${te.elapsed}ms` : ''}
              </span>
            ))}
          </div>
        )}
        {msg.model && !isUser && <p className="text-[10px] text-white/15 mt-1">via {msg.model}</p>}
        <p className={`text-[10px] mt-1 ${isUser ? 'text-[#0a0a0a]/50' : 'text-white/20'}`}>{msg.timestamp}</p>
      </div>
    </div>
  )
}

function AuditLogEntry({ entry }) {
  const statusColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    blocked: 'text-yellow-400',
    auth_failure: 'text-red-500',
    rate_limited: 'text-orange-400',
    validation_failure: 'text-yellow-400',
    safety_blocked: 'text-red-400',
    execution_error: 'text-red-300',
  }
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#1a1a1a] last:border-0">
      <div className={`mt-0.5 flex-shrink-0`}>
        {entry.status === 'success' ? <CheckCircle className="w-4 h-4 text-green-400" /> :
         entry.status?.includes('block') || entry.status?.includes('failure') ? <XCircle className="w-4 h-4 text-red-400" /> :
         <AlertTriangle className="w-4 h-4 text-yellow-400" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-sm font-medium">{entry.tool || entry.action}</span>
          <span className={`text-[10px] font-bold uppercase ${statusColors[entry.status] || 'text-white/30'}`}>{entry.status}</span>
          {entry.destructive && <span className="text-red-400 text-[10px] font-bold">DESTRUCTIVE</span>}
        </div>
        {entry.elapsed && <p className="text-white/20 text-[10px]">Elapsed: {entry.elapsed}ms</p>}
        {entry.error && <p className="text-red-400/60 text-[10px] mt-1">{entry.error}</p>}
        <p className="text-white/20 text-[10px] mt-1">{entry.timestamp}</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('agent')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [auditLog, setAuditLog] = useState([])
  const [pendingConfirmation, setPendingConfirmation] = useState(null)
  const [showDocs, setShowDocs] = useState(false)
  const chatRef = useRef(null)
  const inputRef = useRef(null)

  const getToken = () => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('admin_token='))
    return cookie?.split('=')[1]
  }

  const checkAuth = useCallback(async () => {
    const token = getToken()
    if (!token) { router.push('/admin/login'); return }
    try {
      const res = await fetch('/api/admin/auth', { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) { router.push('/admin/login'); return }
      setAuthenticated(true)
    } catch { router.push('/admin/login') }
  }, [router])

  const fetchAuditLog = useCallback(async () => {
    try {
      const token = getToken()
      const res = await fetch('/api/admin/audit', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setAuditLog(data.log || [])
      }
    } catch {}
  }, [])

  useEffect(() => { checkAuth() }, [checkAuth])

  useEffect(() => {
    if (authenticated && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Admin Agent ready. Powered by Big Pickle via OpenCode Zen.\n\nI have full access to:\n\n- Cloudflare (DNS, Email, Cache, Settings)\n- Vercel (Deploys, Env Vars, Domains)\n- GitHub (Repo, Files, Issues, Commits)\n- Stripe (Payments, Customers, Products)\n- Resend (Email, Domains, Contacts)\n- GoDaddy (Domains, DNS, Auth Codes)\n- Site (Blog Posts, Health, Content)\n\nAsk me anything in natural language. I\'ll figure out which tools to use.\n\nEvery action passes through a 7-step validation pipeline. Destructive actions require explicit confirmation.',
        timestamp: new Date().toLocaleTimeString(),
      }])
    }
  }, [authenticated])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if (activeTab === 'audit') fetchAuditLog()
  }, [activeTab, fetchAuditLog])

  const chatWithAgent = async (message, history) => {
    const token = getToken()
    const res = await fetch('/api/agent/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ message, history }),
    })
    return res.json()
  }

  const executeToolDirect = async (toolName, params = {}) => {
    const token = getToken()
    const res = await fetch('/api/agent/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ tool: toolName, params }),
    })
    return res.json()
  }

  const handleSend = async (text) => {
    if (!text.trim() || loading) return
    const now = new Date().toLocaleTimeString()
    const userMsg = { role: 'user', content: text.trim(), timestamp: now }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const history = messages.filter(m => m.role === 'user' || m.role === 'assistant').map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content,
    }))

    try {
      const result = await chatWithAgent(text, history)

      if (result.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Error: ${result.error}`,
          timestamp: new Date().toLocaleTimeString(),
        }])
        setLoading(false)
        return
      }

      let pendingDestructive = null
      if (result.toolExecutions?.length) {
        for (const te of result.toolExecutions) {
          if (te.requiresConfirmation || te.error?.includes?.('DESTRUCTIVE')) {
            pendingDestructive = te
          }
        }
      }

      if (pendingDestructive) {
        setPendingConfirmation({ tool: pendingDestructive.tool, params: pendingDestructive.params || {} })
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: result.message || 'Done.',
        toolExecutions: result.toolExecutions,
        model: result.model,
        timestamp: new Date().toLocaleTimeString(),
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Connection error: ${err.message}`,
        timestamp: new Date().toLocaleTimeString(),
      }])
    }
    setLoading(false)
    inputRef.current?.focus()
  }

  const handleConfirm = async () => {
    if (!pendingConfirmation) return
    const conf = pendingConfirmation
    setPendingConfirmation(null)
    setLoading(true)

    try {
      const result = await executeToolDirect(conf.tool, { ...(conf.params || {}), _confirmed: true })
      let response = ''
      if (result.ok === false) response = `Error: ${result.error}`
      else if (result.result) response = typeof result.result === 'string' ? result.result : JSON.stringify(result.result, null, 2)
      else response = 'Action completed.'

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        validation: result.validation,
        elapsed: result.elapsed,
        timestamp: new Date().toLocaleTimeString(),
      }])

      await chatWithAgent(`The destructive action "${conf.tool}" was confirmed and executed successfully. Summarize the result for the user.`, messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })))
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error executing ${conf.tool}: ${err.message}`,
        timestamp: new Date().toLocaleTimeString(),
      }])
    }
    setLoading(false)
  }

  const logout = () => {
    document.cookie = 'admin_token=; path=/admin; max-age=0'
    router.push('/admin/login')
  }

  if (!authenticated) return null

  const tabs = [
    { id: 'agent', label: 'Agent', icon: Terminal },
    { id: 'audit', label: 'Audit Log', icon: ClipboardList },
  ]

  return (
    <>
      <Head>
        <title>Admin Agent | Brian Ivie Hair &amp; Extensions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="h-screen flex flex-col bg-[#0a0a0a] text-white">
        {/* Header */}
        <header className="border-b border-[#222] px-6 py-3 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c5a059] rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#0a0a0a]" />
            </div>
            <div>
              <h1 className="text-sm font-bold">Hello, Brian!</h1>
              <p className="text-white/30 text-[10px]">Your admin agent is ready</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://myhairloss.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#c5a059] text-xs flex items-center gap-1 transition-colors">
              <Globe className="w-3 h-3" /> Site
            </a>
            <button onClick={logout} className="text-white/30 hover:text-red-400 text-xs flex items-center gap-1 transition-colors">
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
        </header>

        {/* Docs Banner */}
        <div className="border-b border-[#222] flex-shrink-0">
          <button
            onClick={() => setShowDocs(!showDocs)}
            className="w-full px-6 py-3 flex items-center justify-between text-left hover:bg-[#111] transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-xs text-white/50">How does this work?</span>
            </div>
            {showDocs ? <ChevronDown className="w-3.5 h-3.5 text-white/30" /> : <ChevronRight className="w-3.5 h-3.5 text-white/30" />}
          </button>
          {showDocs && (
            <div className="px-6 pb-4 space-y-4 text-xs text-white/50 leading-relaxed">
              <div>
                <h3 className="text-white/70 font-bold mb-1 flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Natural Language Chat</h3>
                <p>Type anything in plain English. The agent understands your intent and picks the right tools automatically. No commands to memorize.</p>
                <p className="mt-1 text-white/30">Examples: "check Stripe balance", "list all blog posts", "what DNS records do we have?", "is the site healthy?"</p>
              </div>
              <div>
                <h3 className="text-white/70 font-bold mb-1 flex items-center gap-1.5"><Terminal className="w-3 h-3" /> Quick Action Buttons</h3>
                <p>Click the colored buttons above the input to instantly run common checks — site status, email status, deployments, payments, and more.</p>
              </div>
              <div>
                <h3 className="text-white/70 font-bold mb-1 flex items-center gap-1.5"><Shield className="w-3 h-3" /> Safety Pipeline</h3>
                <p>Every action goes through 7 validation steps: authentication, rate limiting, input sanitization, parameter validation, destructive action guards, execution, and audit logging. Nothing runs without your credentials.</p>
              </div>
              <div>
                <h3 className="text-white/70 font-bold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> Destructive Actions</h3>
                <p>Actions that delete data, purge caches, or trigger deploys will ask for your explicit confirmation before executing. You'll see a red confirmation bar at the top.</p>
              </div>
              <div>
                <h3 className="text-white/70 font-bold mb-1 flex items-center gap-1.5"><Zap className="w-3 h-3" /> What Can It Do?</h3>
                <p>Full access to your entire infrastructure — Cloudflare DNS/email/cache, Vercel deployments/env vars, GitHub repo/files/issues, Stripe payments/products/customers, Resend email, GoDaddy domains, and your blog content. 52 tools total.</p>
              </div>
              <div>
                <h3 className="text-white/70 font-bold mb-1 flex items-center gap-1.5"><ClipboardList className="w-3 h-3" /> Audit Log</h3>
                <p>Switch to the "Audit Log" tab to see every action the agent has taken, including timestamps, success/failure status, and which tools were called.</p>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <nav className="border-b border-[#222] px-6 flex gap-0 flex-shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#c5a059] text-[#c5a059]'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === 'agent' && (
          <>
            {/* Confirmation Banner */}
            {pendingConfirmation && (
              <div className="mx-6 mt-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-red-400 text-sm font-bold">Destructive Action Pending</p>
                    <p className="text-red-400/60 text-xs">{pendingConfirmation.tool}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setPendingConfirmation(null)} className="px-3 py-1.5 text-xs text-white/60 border border-[#333] rounded hover:bg-[#1a1a1a]">Cancel</button>
                  <button onClick={handleConfirm} className="px-3 py-1.5 text-xs text-red-400 border border-red-500/30 rounded hover:bg-red-500/10 font-bold">Confirm</button>
                </div>
              </div>
            )}

            {/* Chat Area */}
            <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#111] border border-[#333] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-[#c5a059]" />
                  </div>
                  <div className="bg-[#111] border border-[#222] rounded-xl px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#c5a059] animate-spin" />
                    <span className="text-white/30 text-xs">Running validation pipeline...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 border-t border-[#1a1a1a] flex-shrink-0">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {QUICK_ACTIONS.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(action.label)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all hover:scale-[1.02] whitespace-nowrap flex-shrink-0 ${
                      PLATFORM_COLORS[action.platform] || 'border-[#333] text-white/60'
                    }`}
                  >
                    <action.icon className="w-3 h-3" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-6 pb-4 flex-shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(input) }} className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything... check Stripe balance, list blog posts, DNS records, deploy..."
                  className="flex-1 bg-[#111] border border-[#333] text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#c5a059] transition-colors placeholder:text-white/20"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-[#c5a059] text-[#0a0a0a] px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#d4b46a] transition-colors disabled:opacity-30 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        )}

        {activeTab === 'audit' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm uppercase tracking-widest text-white/40 font-bold">Audit Trail ({auditLog.length} entries)</h2>
                <button onClick={fetchAuditLog} className="text-white/30 hover:text-[#c5a059] text-xs flex items-center gap-1 transition-colors">
                  <RefreshCw className="w-3 h-3" /> Refresh
                </button>
              </div>
              <div className="bg-[#111] border border-[#222] rounded-lg divide-y divide-[#1a1a1a]">
                {auditLog.length === 0 ? (
                  <p className="text-white/20 text-sm text-center py-12">No audit entries yet</p>
                ) : (
                  auditLog.map((entry, i) => <AuditLogEntry key={i} entry={entry} />)
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
