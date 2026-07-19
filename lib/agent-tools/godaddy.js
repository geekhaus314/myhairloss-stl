const BASE = 'https://api.godaddy.com/v1'

async function gdFetch(path, options = {}) {
  const token = process.env.GODADDY_API_KEY
  if (!token) throw new Error('GODADDY_API_KEY not configured')
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
    throw new Error(`GoDaddy API error (${res.status}): ${err}`)
  }
  if (res.status === 204) return { success: true }
  return res.json()
}

export const godaddyTools = {
  gd_list_domains: {
    description: 'List all GoDaddy domains in the account',
    execute: async () => gdFetch('/domains'),
  },
  gd_domain_info: {
    description: 'Get detailed info about a specific domain',
    params: ['domain'],
    execute: async ({ domain }) => gdFetch(`/domains/${domain}`),
  },
  gd_domain_dns: {
    description: 'List DNS records for a GoDaddy domain',
    params: ['domain', 'type?'],
    execute: async ({ domain, type }) => {
      const url = type ? `/domains/${domain}/records/${type}` : `/domains/${domain}/records`
      return gdFetch(url)
    },
  },
  gd_update_dns: {
    description: 'Update or create a DNS record on GoDaddy',
    params: ['domain', 'type', 'name', 'data', 'ttl?'],
    execute: async ({ domain, type, name, data, ttl = 600 }) => {
      return gdFetch(`/domains/${domain}/records/${type}/${name}`, {
        method: 'PUT',
        body: JSON.stringify([{ data, ttl }]),
      })
    },
  },
  gd_auth_code: {
    description: 'Get the domain transfer authorization/EPP code',
    params: ['domain'],
    execute: async ({ domain }) => {
      const info = await gdFetch(`/domains/${domain}`)
      return { domain, authCode: info.authCode, locked: info.locked, status: info.status, expires: info.expires }
    },
  },
  gd_lock_domain: {
    description: 'Lock or unlock a domain for transfer',
    params: ['domain', 'locked'],
    execute: async ({ domain, locked }) => {
      return gdFetch(`/domains/${domain}`, {
        method: 'PATCH',
        body: JSON.stringify({ locked }),
      })
    },
  },
}
