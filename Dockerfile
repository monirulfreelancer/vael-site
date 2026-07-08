# Stage 1: install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
# Copy the Prisma schema before install so @prisma/client's postinstall can
# generate the client successfully.
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# Stage 2: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# A DATABASE_URL must be present for the Prisma client to construct during the
# build. It does not need to be reachable: data reads fail gracefully and ISR
# fills content in at runtime. Coolify can override this with a build arg.
ARG DATABASE_URL="postgresql://user:password@localhost:5432/vael?schema=public"
ENV DATABASE_URL=$DATABASE_URL
# lib/auth throws at import if AUTH_SECRET is missing, and the admin routes are
# imported during the build. A placeholder is enough to compile; the real
# secret is supplied at runtime.
ARG AUTH_SECRET="build-time-placeholder-secret"
ENV AUTH_SECRET=$AUTH_SECRET
RUN npx prisma generate
RUN npm run build

# Stage 3: production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV HOME=/home/nextjs
# Keep the Prisma CLI from trying to write telemetry/update checks to HOME.
ENV CHECKPOINT_DISABLE=1
ENV PRISMA_HIDE_UPDATE_MESSAGE=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --home /home/nextjs nextjs

# The Next.js standalone bundle only traces what the server imports. The
# start-up migrate + seed step needs the Prisma CLI and the libraries the seed
# reads, which are not in that bundle. Install just those into a clean /app.
# Pin the CLI to the same version as @prisma/client (see package-lock) so
# migrate deploy does not warn about a CLI/client version mismatch.
RUN npm install --omit=dev --no-save prisma@6.19.3 gray-matter bcryptjs \
  && npm cache clean --force

# Application: standalone server, static assets, and public files.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Generated Prisma client + query engine (not fully traced into standalone).
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Schema + migrations (migrate deploy) and the MDX seed source.
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/content ./content
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts

# ISR writes revalidated pages to .next/cache; make sure the app user can write
# there and to its home, and can execute the start script.
RUN mkdir -p .next/cache \
  && chown -R nextjs:nodejs .next /home/nextjs \
  && chmod +x scripts/start.sh

USER nextjs

EXPOSE 3000

CMD ["sh", "scripts/start.sh"]
