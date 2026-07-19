const BASE = 'https://api.vercel.com/v1'

async function vercelFetch(path, options = {}) {
  const token = process.env.VERCEL_TOKEN
  if (!token) throw new Error('VERCEL_TOKEN not configured')
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Vercel API error (${res.status}): ${err}`)
  }
  return res.json()
}

const PROJECT_ID = process.env.VERCEL_PROJECT_ID || 'prj_f0FVyn4MUOvN0vrqnzjvHjWbgQzz'

export const vercelTools = {
  vercel_project: {
    description: 'Get Vercel project details',
    execute: async () => vercelFetch(`/projects/${PROJECT_ID}`),
  },
  vercel_deployments: {
    description: 'List recent Vercel deployments',
    params: ['limit?'],
    execute: async ({ limit = 10 }) => vercelFetch(`/deployments?projectId=${PROJECT_ID}&limit=${limit}`),
  },
  vercel_latest_deployment: {
    description: 'Get latest deployment status',
    execute: async () => {
      const data = await vercelFetch(`/deployments?projectId=${PROJECT_ID}&limit=1`)
      return data.deployments?.[0] || { error: 'No deployments found' }
    },
  },
  vercel_trigger_deploy: {
    description: 'Trigger a new Vercel deployment (redeploy)',
    params: ['branch?'],
    execute: async ({ branch = 'main' }) => {
      return vercelFetch(`/projects/${PROJECT_ID}/deployments`, {
        method: 'POST',
        body: JSON.stringify({ name: 'myhairloss.com', gitSource: { ref: branch, repoId: undefined } }),
      })
    },
  },
  vercel_env_vars: {
    description: 'List all environment variables for the project (names only, not values for security)',
    execute: async () => {
      const data = await vercelFetch(`/projects/${PROJECT_ID}/env`)
      return (data.envs || []).map(e => ({
        key: e.key,
        type: e.type,
        targets: e.target,
        created: e.created,
      }))
    },
  },
  vercel_set_env: {
    description: 'Set an environment variable on Vercel',
    params: ['key', 'value', 'targets?'],
    execute: async ({ key, value, targets = ['production', 'preview'] }) => {
      return vercelFetch(`/projects/${PROJECT_ID}/env`, {
        method: 'POST',
        body: JSON.stringify([{ key, value, target: targets }]),
      })
    },
  },
  vercel_delete_env: {
    description: 'Delete an environment variable',
    params: ['key'],
    execute: async ({ key }) => {
      return vercelFetch(`/projects/${PROJECT_ID}/env/${key}`, { method: 'DELETE' })
    },
  },
  vercel_domains: {
    description: 'List domains on the Vercel project',
    execute: async () => vercelFetch(`/projects/${PROJECT_ID}/domains`),
  },
  vercel_speed_insights: {
    description: 'Get Vercel Speed Insights (Core Web Vitals) — how fast pages load for real visitors',
    execute: async () => {
      try {
        const res = await fetch(`https://api.vercel.com/v1/query/speed-insights/metrics?projectId=${PROJECT_ID}`, {
          headers: { 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` },
        })
        if (!res.ok) {
          const err = await res.text()
          return { error: `Speed Insights API error: ${err}` }
        }
        return res.json()
      } catch (e) {
        return { error: e.message }
      }
    },
  },
  vercel_web_analytics: {
    description: 'Get Vercel Web Analytics data (visitors, pageviews, top pages)',
    params: ['period?'],
    execute: async ({ period = '7d' }) => {
      const since = Date.now() - (parseInt(period) || 7) * 86400000
      const baseUrl = 'https://api.vercel.com/v1/query/web-analytics'

      const countRes = await fetch(`${baseUrl}/visits/count?projectId=${PROJECT_ID}&filter=timestamp gt ${since}`, {
        headers: { 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` },
      })
      const count = countRes.ok ? await countRes.json() : { error: await countRes.text() }

      const topPages = await fetch(`${baseUrl}/visits/aggregate?projectId=${PROJECT_ID}&filter=timestamp gt ${since}&by=requestPath&limit=10`, {
        headers: { 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` },
      })
      const pages = topPages.ok ? await topPages.json() : { error: await topPages.text() }

      const countries = await fetch(`${baseUrl}/visits/aggregate?projectId=${PROJECT_ID}&filter=timestamp gt ${since}&by=country&limit=5`, {
        headers: { 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` },
      })
      const countryData = countries.ok ? await countries.json() : { error: await countries.text() }

      return { totalVisits: count, topPages: pages, topCountries: countryData }
    },
  },
  vercel_analytics_summary: {
    description: 'Get a quick analytics summary — visitor count, top pages, and traffic sources',
    execute: async () => {
      const since = Date.now() - 7 * 86400000
      const baseUrl = 'https://api.vercel.com/v1/query/web-analytics'

      try {
        const countRes = await fetch(`${baseUrl}/visits/count?projectId=${PROJECT_ID}&filter=timestamp gt ${since}`, {
          headers: { 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` },
        })
        if (!countRes.ok) {
          const err = await countRes.text()
          return { error: `Analytics API error: ${err}`, hint: 'Web Analytics may need a few hours to start collecting data after being enabled.' }
        }
        const count = await countRes.json()

        const topPages = await fetch(`${baseUrl}/visits/aggregate?projectId=${PROJECT_ID}&filter=timestamp gt ${since}&by=requestPath&limit=5`, {
          headers: { 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` },
        })
        const pages = topPages.ok ? await topPages.json() : null

        const referrers = await fetch(`${baseUrl}/visits/aggregate?projectId=${PROJECT_ID}&filter=timestamp gt ${since}&by=referrer&limit=5`, {
          headers: { 'Authorization': `Bearer ${process.env.VERCEL_TOKEN}` },
        })
        const refs = referrers.ok ? await referrers.json() : null

        return { period: 'last 7 days', totalVisits: count, topPages: pages, topReferrers: refs }
      } catch (e) {
        return { error: e.message }
      }
    },
  },
}
