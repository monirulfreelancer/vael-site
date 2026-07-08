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
RUN npx prisma generate
RUN npm run build

# Stage 3: production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# The generated Prisma client and its query engine are not fully traced into
# the Next.js standalone output, so copy them in explicitly. The schema is
# copied too so `npx prisma migrate deploy` can run from the container.
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
