# Aureon Growth

Premium marketing agency website with full lead-capture stack.

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion 11 · Prisma 6 · SQLite · Resend · Zod

---

## Quick start

```powershell
cd C:\Users\juanc\lancheros-studio

# First time only — installs deps + runs DB migration
npm run setup

# Start dev server (port 3000)
npm run dev:3000
```

Open http://localhost:3000

### If `npm run` fails on PowerShell

Your execution policy blocks `npx`/`npm` scripts. Use:

```powershell
node node_modules/next/dist/bin/next dev --port 3000
```

---

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev:3000` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run db:studio` | Open Prisma Studio (visual DB explorer) on http://localhost:5555 |
| `npm run db:leads` | Print all captured leads to terminal |
| `npm run db:migrate` | Create + apply a new DB migration |
| `npm run db:reset` | ⚠️ Wipe DB and re-run all migrations |
| `npm run setup` | Full install (deps + migrations + Prisma client) |

---

## Environment setup

Copy `.env.example` to `.env` and fill in:

```env
DATABASE_URL="file:./dev.db"                                  # ✅ already set
RESEND_API_KEY=""                                             # ⚠️ get from https://resend.com
EMAIL_FROM="Aureon Growth <onboarding@resend.dev>"
EMAIL_TO="your-real-inbox@gmail.com"                          # ⚠️ change to YOUR email
NEXT_PUBLIC_WHATSAPP_NUMBER="573212396665"                    # ✅ already set
```

**Without `RESEND_API_KEY`**, the form still works — leads save to the DB. Only emails are skipped.

---

## Project structure

```
lancheros-studio/
├── app/
│   ├── api/contact/route.ts      # Lead capture endpoint
│   ├── gracias/page.tsx          # Post-submit thank you page
│   ├── layout.tsx                # SEO + fonts
│   ├── page.tsx                  # Homepage (assembles sections)
│   ├── sitemap.ts                # Auto-generated sitemap.xml
│   ├── robots.ts                 # Auto-generated robots.txt
│   └── globals.css
├── components/
│   ├── layout/Navbar.tsx
│   ├── common/
│   │   ├── FloatingWhatsApp.tsx  # Sticky WhatsApp button
│   │   ├── ParticleField.tsx
│   │   ├── AnimatedCounter.tsx
│   │   └── ...
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Results.tsx
│       ├── Portfolio.tsx
│       ├── Process.tsx
│       ├── AiAutomation.tsx
│       ├── Testimonials.tsx
│       ├── CTA.tsx               # Pre-close section
│       ├── FAQ.tsx               # 8-question accordion
│       ├── Contact.tsx           # Real form (Zod + react-hook-form)
│       └── Footer.tsx
├── lib/
│   ├── prisma.ts                 # DB singleton
│   ├── email.ts                  # Resend wrapper + HTML templates
│   ├── validation.ts             # Zod schemas + dropdown options
│   ├── whatsapp.ts               # Centralized WhatsApp config
│   └── utils.ts
├── prisma/
│   ├── schema.prisma             # Lead + Subscriber models
│   ├── dev.db                    # Local SQLite database
│   └── migrations/
└── .env                          # Your secrets (gitignored)
```

---

## How the lead capture works

1. User fills `Contact` form → react-hook-form validates with Zod schema
2. Honeypot field `website` catches bots (silent success)
3. POST to `/api/contact` → rate-limited (3 req/min/IP)
4. Lead saved to SQLite via Prisma
5. Two emails sent in parallel via Resend:
   - **Internal:** Notification to `EMAIL_TO` with all lead data + reply/WhatsApp buttons
   - **Client:** Premium auto-reply HTML to the user's email
6. Form shows success state with WhatsApp shortcut

---

## Production deployment notes

For production, swap SQLite → Postgres (Supabase recommended):

1. In `prisma/schema.prisma` change `provider = "sqlite"` to `provider = "postgresql"`
2. Set `DATABASE_URL` to your Supabase/Neon/Railway connection string
3. Run `npx prisma migrate deploy`
4. Verify your domain in Resend, update `EMAIL_FROM` to `hola@yourdomain.com`

---

## Contact

- WhatsApp: +57 321 239 6665
- Email: hola@aureongrowth.com
- Location: Bogotá, Colombia · Remote Global
