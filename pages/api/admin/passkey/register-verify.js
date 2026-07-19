import { verifyRegistrationResponse } from '@simplewebauthn/server'
import { getRelyingParty, getOrigin } from '../../../../lib/passkey'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { credential, expectedChallenge } = req.body || {}
  if (!credential || !expectedChallenge) {
    return res.status(400).json({ error: 'Missing credential or expectedChallenge' })
  }

  const rp = getRelyingParty()

  try {
    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge,
      expectedOrigin: [getOrigin()],
      expectedRPID: rp.id,
    })

    if (!verification.verified || !verification.registrationInfo) {
      return res.status(400).json({ verified: false, error: 'Registration verification failed' })
    }

    const { credentialPublicKey, credentialID, counter } = verification.registrationInfo

    const storedCredential = {
      id: Buffer.from(credentialID).toString('base64url'),
      publicKey: Buffer.from(credentialPublicKey).toString('base64url'),
      counter,
      transports: credential.response?.transports || [],
    }

    return res.status(200).json({ verified: true, credential: storedCredential })
  } catch (err) {
    return res.status(400).json({ verified: false, error: err.message })
  }
}
