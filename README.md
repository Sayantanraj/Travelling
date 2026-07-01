# Howladar Tour & Travels — Website

A production-ready, **mobile-first, cinematic travel website** for **Howladar Tour & Travels** — a 21-year-old Bengali tour operator from Sheoraphuli, Hooghly, West Bengal.

The site is **Bengali-first** (English secondary), tuned for Android phones, and built around one conversion goal: get the visitor to tap **WhatsApp** or **Call** within seconds. There is no payment gateway — every booking happens over WhatsApp or phone.

**Live (after deploy):** `https://<your-project>.vercel.app`
**Repo:** https://github.com/Sayantanraj/Travelling

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 14** (App Router, TypeScript, `src/` dir) |
| Styling | **Tailwind CSS** (custom brand theme) |
| Animation | **Framer Motion** |
| Smooth scroll | **Lenis** |
| Icons | **lucide-react** |
| Fonts | `next/font/google` — Noto Sans Bengali + Inter + Playfair Display |
| Images | `next/image` (local files in `/public/tours`) |
| Hosting | **Vercel** (zero-config) |

No Redux, no CSS-in-JS, no payment gateway, no chat widget (the WhatsApp float **is** the chat).

---

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (~100 static pages)
npm start        # serve the production build
```

> If port 3000 is busy, Next will use 3001 — just run one dev server at a time.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, Preloader, Header, Footer, BottomNav, WhatsApp float, Lenis
│   ├── page.tsx            # Home (all sections)
│   ├── offers/page.tsx     # Dedicated bumper-offers page
│   ├── packages/
│   │   ├── page.tsx        # Filterable listing
│   │   └── [slug]/page.tsx # Tour detail (SSG, one page per tour)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── globals.css         # Tailwind layers + brand utilities
│   ├── sitemap.ts / robots.ts
├── components/
│   ├── animations/         # FadeIn, Stagger, CountUp, ParallaxImage
│   ├── hero/HeroSection    # Looping sea video + Ken-Burns montage
│   ├── layout/             # Header (+ mobile drawer), Footer, BottomNav, WhatsAppFloat, Preloader, SmoothScroll
│   ├── sections/           # AnniversaryBand, BumperCarousel, SeasonalTours, FeaturedRows, BranchMap, WhyHowladar, Testimonials, FinalCTA
│   ├── tour/               # TourCard, PackagesView (filters), TourDetailClient
│   └── contact/ContactForm # Form that submits to WhatsApp
├── lib/
│   ├── data/
│   │   ├── tours.ts        # 54 tours + 24 bumper offers (Bengali + English)
│   │   ├── agents.ts       # 8 branch agents (with map pin coords)
│   │   ├── company.ts      # Brand constants, phones, address, trust stats
│   │   └── images.ts       # Destination → local image map + hero video
│   ├── hooks/useReducedMotion.ts
│   └── utils/              # whatsapp.ts (waUrl/telUrl/formatINR), cn.ts
└── public/tours/           # 51 location-accurate destination photos
scripts/
├── fetch-images.mjs        # Resolve accurate Wikipedia lead images per place
└── download-images.mjs     # Download those images into /public/tours
```

---

## Pages & Features

- **Home** — Hero (looping sea video + Ken-Burns photo fallback, animated counters), saffron anniversary band, horizontally-scrolling **bumper offers carousel** (with desktop arrow controls that appear contextually), 5-tab **season selector** → filtered tour grid, International/Premium row, Weekend escapes, interactive **West Bengal branch map** (8 pulsing pins → tap-to-call modal), "Why Howladar" pillars, auto-scrolling **testimonials marquee**, final CTA.
- **/offers** — Dedicated page listing all 24 bumper offers, sorted by biggest discount.
- **/packages** — Filterable listing. Mobile **bottom-sheet** filters / desktop sticky sidebar. Filter state persists in URL query params (`?region=hills&season=bumper`).
- **/packages/[slug]** — Per-tour detail (statically generated): hero, day-by-day **itinerary timeline**, inclusions/exclusions, departure-date chips, embedded Google Map, mandatory train notice, sticky price card (desktop) / bottom action bar (mobile).
- **/about** — Founders, 21-year timeline, Group of Hotels intro.
- **/contact** — All office + 8 branch agent numbers, HQ map, and a form that opens a pre-filled WhatsApp message.

### Cross-cutting UX
- **Animated preloader** — branded splash (animated wordmark, plane tracing a flight arc, glow orbs, % counter) that waits for assets to load, then fades to reveal the site.
- **Mobile drawer menu** — premium right-side drawer (gradient, glow, per-item icons, active highlight) over a transparent-black backdrop.
- **WhatsApp-first** — every tour card and detail page has a WhatsApp button pre-filled with the package name in Bengali; a floating pulse button appears after scrolling.
- **Sticky bottom nav** (mobile) — Home · Packages · Offers · Call · WhatsApp.
- Respects `prefers-reduced-motion`; no horizontal scroll; ≥44px tap targets.

---

## How It Was Built — Workflow

1. **Scaffold** — Next.js 14 + TypeScript + Tailwind, brand theme (indigo `#1E3A8A`, saffron `#F59E0B`, etc.), and the three Google fonts wired through `next/font`. Bengali baseline `line-height: 1.7`.
2. **Data layer** — The full tour dataset (54 tours + 24 bumper offers), branch agents, and company constants were entered into `src/lib/data/`. Bengali names were reconstructed from the printed brochure/PDF.
3. **Layout shell** — Header (transparent → solid on scroll + mobile drawer), Footer (all phones + 8 agents), BottomNav, WhatsApp float, and Lenis smooth scroll, all mounted in the root layout.
4. **Core components** — Reusable animation primitives and the workhorse `TourCard`, then every home section, the packages filter, and the detail page.
5. **Pages** — Home, /offers, /packages, /packages/[slug], /about, /contact, plus sitemap & robots.
6. **Imagery (accurate, local)** — Generic stock was replaced with **location-accurate photos**:
   - `scripts/fetch-images.mjs` resolves the representative lead image for each destination from Wikipedia.
   - `scripts/download-images.mjs` downloads those into `public/tours/` (so they're served locally — fast, no hotlink rate limits).
   - `src/lib/data/images.ts` maps each tour to its local `/tours/<key>.jpg`.
7. **Polish passes** — Animated preloader, looping sea hero video, premium mobile drawer, responsive 2-up grids for mobile (Why-Howladar, footer), and contextual carousel arrows.
8. **Verify & ship** — `npm run build` (all pages compile), pushed to GitHub, deployed on Vercel.

---

## Customising Content

| Want to change… | Edit |
|---|---|
| Tours / prices / itineraries | `src/lib/data/tours.ts` |
| Branch agents | `src/lib/data/agents.ts` |
| Phones / address / email / stats | `src/lib/data/company.ts` |
| A destination photo | Replace the matching file in `public/tours/` (keep the filename) |
| The hero video | `heroVideo` in `src/lib/data/images.ts` |
| Brand colors | `tailwind.config.ts` |

To refresh imagery for new destinations: add the place to `scripts/download-images.mjs` and run `node scripts/download-images.mjs`.

---

## Deployment (Vercel)

1. Push to GitHub (already done: `Sayantanraj/Travelling`).
2. On [vercel.com](https://vercel.com), **Add New → Project**, import the repo.
3. Keep all defaults (framework auto-detected as Next.js, no env vars needed) and click **Deploy**.
4. Every `git push` to `main` then auto-redeploys.

```bash
# typical update cycle
git add -A
git commit -m "your message"
git push
```

---

## Notes
- **Bookings are WhatsApp / phone only** — primary WhatsApp `+91 9123861588`.
- Photos and the hero video are placeholders sourced for accuracy; the owner can swap any of them for their own footage/photography.
- Bengali copy was transcribed from the brochure — worth a final proofread before launch.
