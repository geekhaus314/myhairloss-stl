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
    description: 'Get Vercel Speed Insights summary for the project',
    execute: async () => {
      try {
        return await vercelFetch(`/v1/speed-insights/${PROJECT_ID}/metrics`)
      } catch {
        return { message: 'Speed Insights not available (requires Vercel Analytics enabled)' }
      }
    },
  },
  vercel_web_analytics: {
    description: 'Get Vercel Web Analytics data (visitors, pageviews, top pages)',
    params: ['period?'],
    execute: async ({ period = '7d' }) => {
      try {
        const data = await vercelFetch(`/v1/analytics/${PROJECT_ID}?period=${period}`)
        return data
      } catch {
        return { message: 'Web Analytics not available (requires Vercel Analytics enabled in project settings)' }
      }
    },
  },
  vercel_analytics_summary: {
    description: 'Get a quick analytics summary — visitor count, top pages, and traffic sources',
    execute: async () => {
      try {
        const data = await vercelFetch(`/v1/analytics/${PROJECT_ID}?period=7d`)
        return {
          period: 'last 7 days',
          data,
          note: 'This shows real user data from the last week.',
        }
      } catch {
        return {
          message: 'Analytics not available yet. To enable: go to vercel.com → myhairloss-stl → Settings → Analytics → Enable.',
        }
      }
    },
  },
}
