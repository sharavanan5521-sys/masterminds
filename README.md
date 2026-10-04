# Masterminds Training & Marketing — Website

Showcase site built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Motion. Every page is statically generated.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where things live

| What | Where |
|---|---|
| All page copy (contact details, audiences, philosophy, methodology…) | `src/content/site.ts` |
| The six programmes (summary, key areas, audience, outcomes, image) | `src/content/programmes.ts` |
| Training delivery formats + engagement process | `src/content/delivery.ts` |
| Brand colours & fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| Logo pieces (cut from the original artwork) | `public/brand/` |
| Photos (Unsplash stock — replace with real training photos) | `public/images/` |

## Pages

`/` · `/about` · `/programmes` · `/programmes/[slug]` (6 pages) · `/training-delivery` · `/contact`

## Mockup placeholders to replace

- Contact details in `src/content/site.ts` (email, phone, WhatsApp, address, social links)
- `site.url` in `src/content/site.ts` once the domain is known
- Map placeholder on `/contact`
- Contact form is front-end only (`src/app/contact/contact-form.tsx`) — wire to a Server Action + email provider (e.g. Resend)
- `audience` / `outcomes` per programme are draft copy for the client to confirm

## Deploy

Import the repo in Vercel — no configuration needed. If the repo root is the parent folder, set **Root Directory** to `website`.
