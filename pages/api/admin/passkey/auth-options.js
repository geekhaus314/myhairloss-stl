import { generateAuthenticationOptions } from '@simplewebauthn/server'
import { getRelyingParty, getStoredCredential } from '../../../../lib/passkey'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const storedCred = getStoredCredential()
  if (!storedCred) {
    return res.status(400).json({ error: 'No passkey registered' })
  }

  const rp = getRelyingParty()

  const options = await generateAuthenticationOptions({
    rpID: rp.id,
    userVerification: 'required',
    allowCredentials: [{
      id: Buffer.from(storedCred.id, 'base64url'),
      type: 'public-key',
      transports: storedCred.transports || [],
    }],
  })

  return res.status(200).json(options)
}
