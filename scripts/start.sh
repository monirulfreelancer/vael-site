#!/bin/sh
set -e
echo "Running database migrations..."
npx prisma migrate deploy
echo "Seeding database if empty..."
node scripts/seed.mjs || echo "Seed step failed, continuing anyway"
echo "Starting server..."
exec node server.js
