# Alagappa University Study Centre, Melur — Website

Official-style website for the Alagappa University (Directorate of Distance Education)
learner support centre at Karthik Complex, Alagar Kovil Road, Melur, Tamil Nadu 625106.

## Pages
| URL | Purpose |
| --- | --- |
| `/` | Home — hero with 3D cards, programmes, admission steps, reviews, map |
| `/programmes` | Filterable programme list + comparison table |
| `/programmes/<slug>` | Detail page per programme with its own enquiry form |
| `/admissions` | Admission enquiry form (sends via WhatsApp), call/directions |
| `/about` | About the centre + gallery with lightbox |
| `/reviews` | Google (4.9 / 221) and Justdial (5.0 / 212) ratings, review excerpts |
| `/contact` | Call, WhatsApp, Instagram, map and directions |
| `/faq`, `/privacy`, `/terms` | Help and legal pages |

## Tech stack
TanStack Start (React 19, server-side rendering), Vite, Tailwind CSS v4, TypeScript,
Zod validation, Vitest tests. No database — nothing personal is stored.

## Folder structure
```
src/
  config/business.ts   ← ALL business details (phone, WhatsApp, address, hours, maps, social)
  config/images.ts     ← ALL image references (swap photos here)
  data/programs.ts     ← programmes (add/edit → every page updates)
  data/content.ts      ← reviews, admission steps, FAQs
  data/gallery.ts      ← gallery entries
  assets/images/       ← brand/ hero/ about/ gallery/ (animations/ when needed)
  components/site/     ← header, footer, 3D hero, enquiry form, map, gallery …
  routes/              ← one file per page
  styles.css           ← design system: colours, fonts, light & dark themes
IMAGE-GUIDE.txt        ← exactly which photos to supply
```

## Run locally
```sh
bun install      # or npm install
bun run dev      # http://localhost:8080
bunx vitest run  # tests (enquiry validation, WhatsApp number, spam guard)
```

## Common edits
- **Phone / WhatsApp / address / hours / Instagram:** edit `src/config/business.ts`.
- **WhatsApp:** `whatsapp` = country code + number, digits only (e.g. `918098891689`).
  It is currently assumed to be the same as the phone line — confirm.
- **Email:** set `email` in `src/config/business.ts`; an Email card appears on Contact automatically.
- **Google Maps:** `maps.place`, `maps.directions`, `maps.embed` in the same file (no API key needed).
- **Images:** follow `IMAGE-GUIDE.txt`, then update `src/config/images.ts`.
  Add gallery photos with one line each in `src/data/gallery.ts`.
- **Programmes:** edit `src/data/programs.ts`.
- **Colours / fonts:** edit tokens at the top of `src/styles.css` (`:root` = light, `.dark` = dark).

## How enquiries work
The form validates on the device (name, Indian mobile, optional email, programme),
blocks bots (hidden honeypot field + minimum fill time) and duplicates (30-second cooldown),
then opens WhatsApp with the message pre-filled to the centre. The visitor taps **Send**.
No data is stored on the website. To also receive enquiries by email or keep them in a
database, a backend (e.g. Lovable Cloud + an email service) can be added later.

## Security
- No secrets in the code; no environment variables are required today.
- Security headers on every response: `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `Strict-Transport-Security`, `Cross-Origin-Opener-Policy` (see `src/server.ts`).
- All external links use `rel="noopener noreferrer"`; user text is cleaned and URL-encoded.
- No raw HTML injection anywhere; React escapes all content.
- If you add a backend later, keep keys in secrets (never `VITE_` variables), and use `.env.example` for placeholders.

## SEO
Unique title/description/Open Graph tags per page, semantic headings, image alt text,
`EducationalOrganization` structured data (address, geo, phone) and `FAQPage` data.
Review stars are **not** added to structured data (Google disallows self-served review markup).
A sitemap and canonical URLs should be added once the final domain is known.

## Deploy
Publish from the Lovable editor (Publish button). A custom domain can be connected in
Project Settings → Domains. Hosting provides HTTPS, CDN caching and compression automatically.
