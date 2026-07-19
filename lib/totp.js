import { authenticator } from 'otplib'

export function getSecret() {
  return process.env.ADMIN_TOTP_SECRET
}

export function isEnabled() {
  return !!getSecret()
}

export function generateSecret() {
  return authenticator.generateSecret()
}

export function verify(token, secret) {
  const s = secret || getSecret()
  if (!s) return false
  try {
    return authenticator.verify({ token, secret: s })
  } catch {
    return false
  }
}

export function verifyWithSecret(token, secret) {
  return verify(token, secret)
}
