# Vael — AI software development agency website

Next.js 15 + Tailwind v4. Charcoal/amber dark theme. Case studies are MDX files.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Where to edit things

| You want to change… | Edit this file |
|---|---|
| Brand name "Vael" | Find-replace across `components/` + `app/layout.tsx` |
| Domain (SEO/OG/sitemap) | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` (the `SITE` const) |
| Hero copy | `components/Hero.tsx` |
| Services copy | `components/Services.tsx` |
| Process / timeline | `components/Process.tsx` |
| Pricing tiers | `components/Pricing.tsx` |
| Testimonials | `components/Testimonials.tsx` |
| About + stats | `components/About.tsx` |
| Contact email / links | `components/CTA.tsx`, `components/Footer.tsx` |
| Colors | `app/globals.css` (the `@theme` block) |

## Add a new case study (no code)

1. Drop a new `.mdx` file in `content/case-studies/`.
2. Copy the frontmatter from any existing file and fill it in.
3. Add a cover image to `public/work/` and point `thumbnail:` at it.
4. Set `featured: true` to show it on the homepage.

That's it — the homepage grid, `/work` index, and detail page all pick it up automatically.

Replace the placeholder SVGs in `public/work/` with real screenshots (PNG/JPG is fine — just update the filename in the frontmatter).

## Contact form

Works out of the box (logs submissions to the server). To receive emails:

1. Sign up at https://resend.com (free tier), get an API key.
2. In Coolify, add env vars: `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
3. Verify your sending domain in Resend for a custom `from` address.

## Analytics

Add Plausible (self-host on your VPS) or any script in `app/layout.tsx` inside `<body>`. For self-hosted Plausible, drop:

```tsx
<script defer data-domain="vael.studio" src="https://plausible.yourdomain.com/js/script.js" />
```

## Deploy on Coolify

This is set up exactly like your other apps.

1. Push to a GitHub repo.
2. Coolify → New Resource → **Dockerfile** (the included `Dockerfile` uses Next.js standalone output — small image, fast).
3. Set domain (e.g. `vael.studio`), Coolify handles SSL.
4. Add env vars from `.env.example` if using the contact form.
5. Deploy.

The Dockerfile is multi-stage and outputs a standalone server (`node server.js`), so the runtime image stays lean. Port `3000`.

## SEO notes (already wired)

- Per-page metadata + OpenGraph/Twitter cards (`app/layout.tsx`, case study pages)
- Auto sitemap at `/sitemap.xml`, robots at `/robots.txt`
- Static generation (SSG) — pages prerender to HTML for fast loads + crawlability
- Replace `public/og.png.svg` with a real 1200×630 `og.png` and update the path in `layout.tsx`

## Quick SEO wins after launch

- Submit sitemap in Google Search Console
- Real case study content with specific metrics > generic copy (Google rewards depth)
- One landing page per main service if you want to rank for "AI MVP development" etc.
- Page titles already follow `Page · Vael` pattern — keep them keyword-led
