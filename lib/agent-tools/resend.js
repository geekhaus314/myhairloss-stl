const BASE = 'https://api.resend.com'

async function resendFetch(path, options = {}) {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not configured')
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend API error (${res.status}): ${err}`)
  }
  return res.json()
}

export const resendTools = {
  resend_domains: {
    description: 'List all Resend domains and their verification status',
    execute: async () => resendFetch('/domains'),
  },
  resend_domain_info: {
    description: 'Get detailed info about a specific Resend domain',
    params: ['domain_id'],
    execute: async ({ domain_id }) => resendFetch(`/domains/${domain_id}`),
  },
  resend_contacts: {
    description: 'List all contacts in an audience',
    params: ['audience_id?'],
    execute: async ({ audience_id }) => {
      if (!audience_id) {
        const audiences = await resendFetch('/audiences')
        if (audiences.data?.length) audience_id = audiences.data[0].id
        else return { message: 'No audiences found' }
      }
      return resendFetch(`/audiences/${audience_id}/contacts`)
    },
  },
  resend_audiences: {
    description: 'List all Resend audiences',
    execute: async () => resendFetch('/audiences'),
  },
  resend_send_email: {
    description: 'Send an email via Resend (use carefully)',
    params: ['from', 'to', 'subject', 'html?'],
    execute: async ({ from, to, subject, html = '' }) => {
      return resendFetch('/emails', {
        method: 'POST',
        body: JSON.stringify({ from, to: Array.isArray(to) ? to : [to], subject, html }),
      })
    },
  },
}
