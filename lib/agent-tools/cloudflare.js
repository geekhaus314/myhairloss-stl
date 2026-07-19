const BASE = 'https://api.cloudflare.com/client/v4'

async function cfFetch(path, options = {}) {
  const token = process.env.CLOUDFLARE_API_TOKEN
  if (!token) throw new Error('CLOUDFLARE_API_TOKEN not configured')
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.errors?.[0]?.message || 'Cloudflare API error')
  return data.result
}

export const cloudflareTools = {
  cf_list_zones: {
    description: 'List all Cloudflare zones',
    execute: async () => cfFetch('/zones'),
  },
  cf_zone_info: {
    description: 'Get detailed info about a zone (DNS records, settings, etc)',
    params: ['zone_name'],
    execute: async ({ zone_name }) => {
      const zones = await cfFetch(`/zones?name=${zone_name}`)
      if (!zones.length) throw new Error(`Zone ${zone_name} not found`)
      return zones[0]
    },
  },
  cf_list_dns: {
    description: 'List all DNS records for a zone',
    params: ['zone_name', 'type?'],
    execute: async ({ zone_name, type }) => {
      const zones = await cfFetch(`/zones?name=${zone_name}`)
      if (!zones.length) throw new Error(`Zone ${zone_name} not found`)
      const url = type ? `/zones/${zones[0].id}/dns_records?type=${type}` : `/zones/${zones[0].id}/dns_records`
      return cfFetch(url)
    },
  },
  cf_create_dns: {
    description: 'Create a DNS record (A, CNAME, MX, TXT, etc)',
    params: ['zone_name', 'type', 'name', 'content', 'priority?', 'ttl?'],
    execute: async ({ zone_name, type, name, content, priority, ttl = 1 }) => {
      const zones = await cfFetch(`/zones?name=${zone_name}`)
      if (!zones.length) throw new Error(`Zone ${zone_name} not found`)
      const body = { type, name, content, ttl }
      if (priority) body.priority = priority
      return cfFetch(`/zones/${zones[0].id}/dns_records`, { method: 'POST', body: JSON.stringify(body) })
    },
  },
  cf_delete_dns: {
    description: 'Delete a DNS record by ID',
    params: ['zone_name', 'record_id'],
    execute: async ({ zone_name, record_id }) => {
      const zones = await cfFetch(`/zones?name=${zone_name}`)
      if (!zones.length) throw new Error(`Zone ${zone_name} not found`)
      return cfFetch(`/zones/${zones[0].id}/dns_records/${record_id}`, { method: 'DELETE' })
    },
  },
  cf_update_dns: {
    description: 'Update a DNS record',
    params: ['zone_name', 'record_id', 'type', 'name', 'content', 'ttl?'],
    execute: async ({ zone_name, record_id, type, name, content, ttl = 1 }) => {
      const zones = await cfFetch(`/zones?name=${zone_name}`)
      if (!zones.length) throw new Error(`Zone ${zone_name} not found`)
      return cfFetch(`/zones/${zones[0].id}/dns_records/${record_id}`, {
        method: 'PUT',
        body: JSON.stringify({ type, name, content, ttl }),
      })
    },
  },
  cf_email_routing_status: {
    description: 'Check Cloudflare Email Routing status for a zone',
    params: ['zone_name'],
    execute: async ({ zone_name }) => {
      const zones = await cfFetch(`/zones?name=${zone_name}`)
      if (!zones.length) throw new Error(`Zone ${zone_name} not found`)
      try {
        return await cfFetch(`/zones/${zones[0].id}/email/routing`)
      } catch {
        return { status: 'not_configured', message: 'Email routing not onboarded yet' }
      }
    },
  },
  cf_email_routing_rules: {
    description: 'List all Email Routing rules',
    params: ['zone_name'],
    execute: async ({ zone_name }) => {
      const zones = await cfFetch(`/zones?name=${zone_name}`)
      if (!zones.length) throw new Error(`Zone ${zone_name} not found`)
      return cfFetch(`/zones/${zones[0].id}/email/routing/rules`)
    },
  },
  cf_purge_cache: {
    description: 'Purge Cloudflare cache for a zone (all or specific URLs)',
    params: ['zone_name', 'purge_everything?'],
    execute: async ({ zone_name, purge_everything = true }) => {
      const zones = await cfFetch(`/zones?name=${zone_name}`)
      if (!zones.length) throw new Error(`Zone ${zone_name} not found`)
      return cfFetch(`/zones/${zones[0].id}/purge_cache`, {
        method: 'POST',
        body: JSON.stringify({ purge_everything }),
      })
    },
  },
  cf_zone_settings: {
    description: 'Get zone settings (SSL, caching, security, etc)',
    params: ['zone_name'],
    execute: async ({ zone_name }) => {
      const zones = await cfFetch(`/zones?name=${zone_name}`)
      if (!zones.length) throw new Error(`Zone ${zone_name} not found`)
      return cfFetch(`/zones/${zones[0].id}/settings`)
    },
  },
}
