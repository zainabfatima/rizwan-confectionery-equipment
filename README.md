# Rizwan Confectionery Equipment

Marketing site for a US partner of MEMAK confectionery machinery. Chocolate, gummy, caramel, nougat, and bar equipment only — bakery and biscuit lines are out of scope.

Product copy lives in `data/machines.json`. Company name, phone, email, and the homepage headline live in `config/site.ts`.

## Requirements

- Node.js 20 or newer
- A Formspree form id if you want the quote form to submit without opening the visitor’s email app

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set these in `.env.local`:

- `NEXT_PUBLIC_FORMSPREE_ID` — the id from `https://formspree.io/f/{id}`
- `NEXT_PUBLIC_SITE_URL` — the public site URL, with no trailing slash

If `NEXT_PUBLIC_FORMSPREE_ID` is empty, the quote and contact forms open a `mailto:` draft to `info@rizwanconfectionery.com`. Files cannot be attached through mailto; the visitor attaches them in their mail app.

Replace the demo phone and WhatsApp number in `config/site.ts` before a public launch. Leave `whatsapp` as an empty string to hide the WhatsApp button.

## Refresh the catalog

```bash
npm run import
```

`scripts/import-memak.ts` reads `robots.txt`, crawls confectionery categories on memak.com, waits between requests, downloads photos into `public/images/machines/{slug}/`, and writes `data/machines.json`.

- Specification numbers are kept as published.
- Summaries and descriptions come from `scripts/editorial.ts` so they are original US-buyer copy. A page with no editorial entry gets a short generated description that does not paste the manufacturer’s sentences.
- A page that cannot be fetched is still listed, with `todo` set and a placeholder image.
- Failures are printed and written to `data/import-log.json` (gitignored).

Re-running the import overwrites `data/machines.json`. Edit `scripts/editorial.ts` if you want copy changes to survive the next import.

## Production build

```bash
npm run build
npm start
```

`npm run build` statically generates the catalog and product pages, then `next-sitemap` writes `sitemap.xml` and `robots.txt`.

## Deploy on Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel. No extra build settings are required (`npm run build` is the default).
3. Add `NEXT_PUBLIC_FORMSPREE_ID` and `NEXT_PUBLIC_SITE_URL` in the Vercel project environment.
4. Redeploy so canonical URLs pick up the production domain.

Or from this folder, after `npx vercel login`:

```bash
npx vercel --prod
```

## Content map

| Path | Purpose |
| --- | --- |
| `/` | Homepage |
| `/machines` | Filterable catalog |
| `/machines/[category]` | Category landing page |
| `/machines/[category]/[slug]` | Product page |
| `/turnkey-lines` | Full line scopes |
| `/about` | Partnership story |
| `/services` | Install, training, parts, maintenance |
| `/faq` | Buyer questions and FAQ schema |
| `/contact` | Email, phone, hours, map, form |
| `/quote` | Quote form, including `?machine=` prefill |

MEMAK is a trademark of Memak Machinery. Product images and specifications are used courtesy of the manufacturer. Confirm every rating on the quotation.
