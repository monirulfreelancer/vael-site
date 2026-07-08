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

| Variable              | Description                                            |
| --------------------- | ----------------------------------------------------- |
| `DATABASE_URL`        | PostgreSQL connection string (required by Prisma)     |
| `AUTH_SECRET`         | Secret for signing admin session JWTs                 |
| `RESEND_API_KEY`      | Resend API key                                        |
| `CONTACT_TO`          | Address that receives contact submissions             |
| `CONTACT_FROM`        | Verified sender address for outgoing mail             |
| `NEXT_PUBLIC_SITE_URL`| Canonical site origin (defaults to production URL)    |
| `ADMIN_EMAIL`         | Seed-only: initial admin user email                   |
| `ADMIN_PASSWORD`      | Seed-only: initial admin user password                |

`ADMIN_EMAIL` and `ADMIN_PASSWORD` are read only by the seed script to create
the first admin user; they are not used at runtime.

The canonical site origin lives in `lib/site.ts` (`SITE.url`), which reads
`NEXT_PUBLIC_SITE_URL` and falls back to `https://vael.studio`. All metadata,
canonicals, sitemap, robots, and JSON-LD derive from it.

## Database

The blog and case studies are stored in PostgreSQL and read through Prisma. The
`.mdx` files under `content/` are the original source and seed data; they are
kept as a backup.

Local setup:

```bash
# 1. Point DATABASE_URL at a running Postgres instance in .env
# 2. Create the schema and generate the client
npx prisma migrate dev --name init

# 3. Load the MDX content (and an admin user if ADMIN_EMAIL/ADMIN_PASSWORD are set)
npx prisma db seed
```

`npx prisma generate` regenerates the client after any schema change. The public
pages read from the database via ISR (`revalidate = 60`), so new or edited
content appears within a minute without a redeploy.

### First-run migration and seeding (production)

The production database is only reachable from inside the Docker network, so the
container migrates and seeds itself on start. `scripts/start.sh` (the image's
entrypoint) runs, in order:

1. `npx prisma migrate deploy` — applies any pending migrations. It never
   generates new ones, so it is safe to run on every boot.
2. `node scripts/seed.mjs` — seeds content **only into empty tables**. If the
   `Post` or `CaseStudy` table already has rows, that table is skipped, so a
   restart never overwrites posts edited in the admin panel. The step is
   wrapped so a seed failure does not stop the server from starting.
3. `node server.js` — starts Next.js.

The admin user is (re)checked on every boot: if `ADMIN_EMAIL` and
`ADMIN_PASSWORD` are set and no user with that email exists, one is created.
Once it exists, the seed never touches its password, so those vars only matter
on the first boot. To rotate the password later, change it from the admin panel
or update the row directly, not by changing the env vars.

Because the schema, migrations, MDX seed source, and the Prisma CLI are all
copied into the runtime image, no manual database step is needed on deploy. To
re-import the original MDX content, empty the relevant table first, then restart
the container.

The `prisma db seed` command (which uses `tsx prisma/seed.ts`) is the equivalent
for local development.

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
