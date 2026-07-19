import { generateRegistrationOptions } from '@simplewebauthn/server'
import { getRelyingParty, getOrigin } from '../../../../lib/passkey'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const rp = getRelyingParty()

  const options = await generateRegistrationOptions({
    rpName: rp.name,
    rpID: rp.id,
    userName: 'Brian Ivie',
    attestationType: 'none',
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'required',
    },
  })

  return res.status(200).json(options)
}
