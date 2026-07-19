import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import { getRelyingParty, getOrigin, getStoredCredential } from '../../../../lib/passkey'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { credential, expectedChallenge } = req.body || {}
  if (!credential || !expectedChallenge) {
    return res.status(400).json({ error: 'Missing credential or expectedChallenge' })
  }

  const storedCred = getStoredCredential()
  if (!storedCred) {
    return res.status(400).json({ error: 'No passkey registered' })
  }

  const rp = getRelyingParty()

  const authenticator = {
    credentialID: Buffer.from(storedCred.id, 'base64url'),
    credentialPublicKey: Buffer.from(storedCred.publicKey, 'base64url'),
    counter: storedCred.counter,
    transports: storedCred.transports || [],
  }

  try {
    const verification = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge,
      expectedOrigin: [getOrigin()],
      expectedRPID: rp.id,
      credential: authenticator,
      requireUserVerification: true,
    })

    return res.status(200).json({ verified: verification.verified })
  } catch (err) {
    return res.status(400).json({ verified: false, error: err.message })
  }
}
