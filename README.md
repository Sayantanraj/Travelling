# Howladar Tour & Travels — Website

Production-ready, mobile-first, cinematic travel website for **Howladar Tour & Travels** (Hooghly, West Bengal). Bengali-first, WhatsApp-driven bookings.

## Stack
Next.js 14 (App Router, TS, `src/`) · Tailwind CSS · Framer Motion · Lenis smooth scroll · Embla · Lucide · next/image · next/font (Noto Sans Bengali + Inter + Playfair Display).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (97 static pages)
npm start        # serve production build
```

## Pages
- `/` — Hero (video + Ken-Burns montage), Anniversary band, Bumper carousel (24 offers), Season tabs + tour grid, International/Premium row, Weekend escapes, WB branch map (8 pulsing pins + modal), Why Howladar, Testimonials marquee, Final CTA.
- `/packages` — Filterable listing (mobile bottom-sheet / desktop sidebar, URL query state).
- `/packages/[slug]` — Detail: hero, day-by-day itinerary, inclusions/exclusions, departure chips, Google map, mandatory train notice, sticky price card / mobile action bar.
- `/about` · `/contact` (form posts to WhatsApp).

## Data
- `src/lib/data/tours.ts` — 54 tours + 24 bumper offers (Bengali + English).
- `src/lib/data/agents.ts` — 8 branch agents.
- `src/lib/data/company.ts` — brand constants.
- `src/lib/data/images.ts` — destination → Unsplash photo map. **Swap these URLs for the owner's own photography.** `heroVideo` is a Pexels stock clip; replace with brand footage.

## Notes
- Bookings are WhatsApp / phone only (no payment gateway). Primary WhatsApp: `+91 9123861588`.
- All CTAs pre-fill the package name in Bengali.
- Respects `prefers-reduced-motion`.

## Deploy (Vercel)
Push to a Git repo and import in Vercel — zero config. Remote image hosts (`images.unsplash.com`) are whitelisted in `next.config.mjs`.
