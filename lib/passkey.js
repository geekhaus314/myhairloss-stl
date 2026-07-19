const RP_NAME = 'Brian Ivie Hair & Extensions'
const RP_ID = process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '')?.split(':')[0] || 'myhairloss.com'

export function getRelyingParty() {
  return { name: RP_NAME, id: RP_ID }
}

export function getOrigin() {
  return `https://${RP_ID}`
}

export function getStoredCredential() {
  try {
    const raw = process.env.ADMIN_PASSKEY_CREDENTIAL
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
