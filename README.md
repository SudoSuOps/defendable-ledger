# defendable-ledger

**The cracked ledger of the DefendableOS ecosystem.**

Sovereign · in-house · hash-verifiable. Every Router receipt, every Tribunal verdict, every SwarmJelly training pair, every Deed — recorded here.

- Canonical: https://defendableledger.com
- Legacy / secondary: https://ledger.mrdefendable.com, https://streetledger.eth.limo

Ring ring · to the shed.

## What this repo is

The public proof surface for the DefendableLedger. A Vite/React static site with three pages:

- `/` — the doctrine · the four rails · the five Royal Jelly tiers
- `/records` — published receipts · verdicts · training pairs · deeds (populating as the spine mints)
- `/verify` — client-side SHA-256 verification (WebCrypto · nothing sent to a server)

Records get published into `/public/records/` by the DefendableRouter batch publisher and are statically served as JSON.

## What this repo is NOT

- Not a database.
- Not a write API.
- Not a chain anchor (we hash in-house; no Hedera / IPFS / external anchoring).

The spine writes records locally; this repo is the publication-layer mirror.

## Stack

- Vite 5 + React 18 + TypeScript
- TailwindCSS
- React Router 6
- WebCrypto SHA-256 for client-side verification

## Develop

```bash
npm install
npm run dev          # local dev on http://localhost:5173
npm run build        # production build → ./dist
npm run preview      # serve ./dist locally
```

## Deploy

Cloudflare Pages auto-deploys on every push to `main`. Output dir is `dist/`. Custom domains: `defendableledger.com` + `www.defendableledger.com`.

## Doctrine

Operator-grade. Books and records. Class A 5-cap. No fluff. No startup-speak. No AI hype.
Sovereign compute. In-house cooks. No external chain anchoring. Receipts first.

The language lives in the blocks.
