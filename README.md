Brian Ivie Hair — Next.js starter

This repo is a minimal Next.js static site scaffold for Brian Ivie Hair (a DBA of Saint Louis LLC). Ready to edit content, add images, and deploy to Vercel.

Quick start

1. Install dependencies:
   npm install

2. Run locally:
   npm run dev

3. Build & export static files (optional):
   npm run export
   - exported static site will be in ./out

Deploy to Vercel

1. Create a GitHub repo and push this project.
2. Sign in to Vercel and import the GitHub repo.
3. Vercel will auto-detect Next.js — deploy preview will be created.
4. Add your domain (myhairloss.com) in Vercel's Domains tab — Vercel gives DNS records to add at Wix.

DNS notes (Wix)

- In Wix DNS manager, follow Vercel's instructions. Usually:
  - Add an A record(s) (if Vercel asks) for the apex (@) OR set an ALIAS/ANAME
  - Add a CNAME for www pointing to Vercel's assigned target (e.g., cname.vercel-dns.com)
- After DNS updates, verify domain in Vercel and set as primary.

Content & assets

- Replace placeholder text and contact info (email, phone).
- Add business photos to /public and reference them from pages.
- Replace Formspree form action with your Formspree project URL or connect a serverless function.
- Add Calendly link on contact page for booking.

Next steps I can do for you:
- Add Tailwind + responsive layout
- Migrate pages/content from your current Wix site (I can copy pages and images)
- Connect the repo to GitHub and deploy to Vercel for you (you'll need to authorize Vercel/GitHub)

