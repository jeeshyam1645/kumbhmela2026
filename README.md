# Magh Mela Stays (2027)

Camp booking site for Magh Mela, Prayagraj — [maghmelastays.in](https://maghmelastays.in).
English at `/`, Hindi at `/hi`.

This branch (`rewrite-2027`) is a full rewrite in Next.js. The old site (v1) lives on `master`.

## Setup in 5 minutes

Requires Node 20+.

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL (Neon dev branch)
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run check` | Lint + typecheck (same as CI) |

## How the code is organised

```
messages/            All page text, en.json and hi.json (keep both in sync)
src/app/[locale]/    Pages. One folder per URL
src/components/      Shared UI: ui/ (buttons, sections), layout/ (header, footer)
src/config/          Site facts: phone, bathing dates, routes, image hosts
src/db/              Database schema and connection (Drizzle + Neon)
src/features/        Everything for one feature in one place (camps, pujas, home, whatsapp)
src/i18n/            Language setup
src/proxy.ts         Decides which pages this app serves (see below)
```

Common edits:

- **Change phone, email, address:** `src/config/site.ts`
- **Change bathing dates:** `src/config/bathing-dates.ts`
- **Change any text:** `messages/en.json` and `messages/hi.json`
- **Change home slides:** `src/features/home/content.ts`
- **Colours and fonts:** the `@theme` block in `src/app/globals.css`

## Released in parts

The site is rebuilt one part at a time. Pages that are not rebuilt yet are
served from the old site, so visitors never see a broken page.

`REBUILT_PATHS` in `src/config/routes.ts` lists the pages this app serves.
Every other path (including `/api`) is forwarded by `src/proxy.ts` to
`LEGACY_SITE_URL`. When a page is rebuilt, add its path to `REBUILT_PATHS`.

| Part | Contents |
| --- | --- |
| 1 | New design, header, footer, mobile bar, Home page |
| 2 | All public pages, WhatsApp click-to-chat, SEO |
| 3 | Login (OTP, Google, email), booking, notifications. Old backend retired |
| 4 | Admin and self-service photo/text editor |
| 5 | WhatsApp booking bot |

## Deployment

Vercel project `maghmelastays-2027`, production branch `rewrite-2027`.
Environment variables: see `.env.example`.

## Database rules

Until Part 3, the old site still writes to the same tables. Schema changes in
`src/db/schema.ts` must be **additive only** (new tables or nullable columns).
