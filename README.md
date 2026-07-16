# fennr.* — Premium Digital Growth Studio

Next.js 14 (App Router) + Tailwind CSS + Framer Motion landing page.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Stack

- **Next.js 14** — App Router, next/font (Archivo display / Inter body / Playfair Display numerals), next/image
- **Tailwind CSS** — full token system in `tailwind.config.ts`
- **Framer Motion** — scroll-morph, staggered hero, sliders, accordion, counters

## Color system (#FFD21E)

| Token          | Hex       | Use                                        |
| -------------- | --------- | ------------------------------------------ |
| `accent`       | `#FFD21E` | Buttons, badges, underlines, fills         |
| `accent-soft`  | `#FFF3C2` | Background washes / glows                  |
| `accent-text`  | `#DFAF00` | Yellow used AS display text (readable)     |
| `accent-deep`  | `#8A6D00` | Small eyebrow labels (AA contrast)         |
| `ink`          | `#23272B` | Headlines                                  |
| `paper`        | `#F1F2F0` | Page background                            |

## Sections / animations

1. **Header** — fixed, blurs + gains shadow on scroll
2. **Hero** — staggered line-mask headline reveal, email capture, polaroid card with rotating NEW! sticker, floating specks
3. **IntroMarquee** — infinite client-logo marquee with edge fade mask + rotating "scroll to see more" circular badge
4. **ChoosingCard** — product chips with active yellow tint
5. **Approach** — 300vh sticky scroll-morph: №1/№2/№3 swap the italic word (Strategy → Operating → Growth), photo, and side panel as you scroll
6. **Services** — 3 polaroid cards, hover lift + image zoom
7. **FilmBlock** — video cover with yellow play button + stat chip
8. **Catalogue** — 2-page card carousel with directional slide
9. **Results** — animated counters on scroll into view
10. **Testimonials** — 01/03 slider with rotating polaroid swap + progress dashes
11. **FAQ** — height-animated accordion
12. **Subscribe** — newsletter + book-a-call + dark studio card
13. **Footer** — sitemap, socials, contacts

Reduced motion is respected throughout (`prefers-reduced-motion`).

## Swapping images

All imagery uses Unsplash/pravatar placeholders (grayscale, matching the reference art direction). Replace the URLs in each component — or drop files into `/public` and update `next.config.mjs` accordingly.
