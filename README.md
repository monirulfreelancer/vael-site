# Vael

Website for Vael, an AI software development agency. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4. Fully statically generated, self-hosted fonts, zero third-party scripts.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env` and fill in the values (used by the contact form):

| Variable              | Description                                       |
| --------------------- | ------------------------------------------------- |
| `RESEND_API_KEY`      | Resend API key                                    |
| `CONTACT_TO`          | Address that receives contact submissions         |
| `CONTACT_FROM`        | Verified sender address for outgoing mail         |
| `NEXT_PUBLIC_SITE_URL`| Canonical site origin (defaults to production URL)|

The canonical site origin lives in `lib/site.ts` (`SITE.url`), which reads
`NEXT_PUBLIC_SITE_URL` and falls back to `https://vael.studio`. All metadata,
canonicals, sitemap, robots, and JSON-LD derive from it.

## SEO and AEO assets

- `public/llms.txt` is a hand-written summary for AI answer engines. It contains
  the domain as literal URLs, so **update it whenever the domain changes** (the
  `SITE.url` env var does not reach this static file).
- `public/og.svg` is a placeholder social preview card. **Replace it with a real
  1200x630 PNG before launch**, since some social platforms do not render SVG
  previews. After adding `og.png`, update the image references in
  `app/layout.tsx` from `/og.svg` to `/og.png`.

## Deploy on Coolify

1. Create a new resource in Coolify and point it at this Git repository.
2. Set the **Build Pack** to **Dockerfile** (the `Dockerfile` at the repo root is a multi-stage build that runs the app from Next.js standalone output).
3. Set the exposed **port** to `3000`.
4. Add the environment variables from `.env.example` under the resource's environment settings.
5. Deploy. The container runs as a non-root user and starts with `node server.js`.

## Project structure

```
app/         routes, layout, global styles
components/  shared React components
lib/         utilities and data loading
content/     MDX case studies
public/      static assets
```
