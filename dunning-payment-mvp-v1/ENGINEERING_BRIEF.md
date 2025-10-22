Dunning Payment MVP - Engineering Brief

Summary:
- Added PostgreSQL integration with simple auto-migration (creates webhook_events, customers, invoices).
- Added BullMQ-based dunning queue (requires Redis) with a worker that processes retry jobs.
- New API endpoints: /api/customers, /api/invoices, /api/webhook (stores events), /api/retry (enqueue retry).
- Minimal React (Vite) dashboard at /ui serving a dashboard that calls API endpoints.
- docker-compose.yml included to run Postgres, Redis and API service for local development.

How to run locally:
1. From project root: docker-compose up --build
2. API will be at http://localhost:4000
3. UI is a Vite app in /ui — run `npm install` then `npm run dev` and open the Vite dev URL.
4. Environment variables:
   - DATABASE_URL (postgres connection)
   - REDIS_URL (redis connection)
   - PORT (api port)

Notes:
- Mailer and Stripe client are left as placeholders for integration (add SendGrid/Resend and Stripe SDK).
- Preserve existing main branch; changes are additive under server/ and ui/ directories.