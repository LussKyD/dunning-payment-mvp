dunning-payment-mvp

Complete repo scaffold.

Dunning Payment MVP

StatusWorking API + UI prototype  
Branch:`main`  
Frameworks:
- API: Node.js (Express)  
- UI: Vite + React  
- Queue: BullMQ (Redis-ready)  
- Webhooks: Stripe-compatible endpoint  


Getting Started

Install Dependencies
```bash
npm install
```

Run Both Servers (API + UI)
```bash
npm run dev
```
API: http://localhost:3000

UI: http://localhost:5173/dunning-payment-mvp/

Test Health Endpoint
```bash
curl http://localhost:3000/api/health
```
See: {"status": "ok"}

Test Stripe Webhook Simulation
```bash
curl -X POST http://localhost:3000/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -d @webhooks/sample_payloads/stripe_invoice_payment_failed.json
```
See: {"received": true}

DRACO iNC BRIEF

> Express serves backend API with modular routing

> BullMQ is preconfigured for async job queues (email, retry, etc.)

> Vite serves the admin UI dashboard

> GitHub + Devcontainer enabled for consistent Codespaces build



Folder Structure

```bash
dunning-payment-mvp/
 ├── api/               # Express backend
 │   ├── routes/        # Webhook + API routes
 │   └── server.js      # Entry point
 ├── ui/                # Vite + React frontend
 ├── db/                # Migration + schema stubs
 ├── webhooks/          # Stripe test payloads
 ├── package.json       # Concurrent dev scripts
 └── README.md
```


Current Milestone

> Working local API and UI

> Stripe webhook verified

> Health check operational

> Git LFS + Devcontainer configured


