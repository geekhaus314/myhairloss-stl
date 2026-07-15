// Email routing config.
//
// NOTIFY_EMAIL — where booking/contact/order notifications are delivered.
// Currently a personal inbox; switch to booking@myhairloss.com once the Zoho
// mailbox + DNS are live.
//
// FROM_EMAIL — the "from" address for outbound mail. Until the myhairloss.com
// domain is verified in Resend, mail can only be sent from Resend's shared
// onboarding domain and only to the Resend account owner's address. After you
// verify myhairloss.com in Resend, set RESEND_FROM to e.g.
// "MYHAIRLOSS.COM <booking@myhairloss.com>".

export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'brianiviehair@proton.me'

export const FROM_EMAIL =
  process.env.RESEND_FROM || 'MYHAIRLOSS.COM <onboarding@resend.dev>'
