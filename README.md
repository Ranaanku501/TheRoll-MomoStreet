# The Roll & Momos Street Food

Marketing + ordering website built with Next.js 15 (App Router), TypeScript and Tailwind CSS v3.
Customers browse the menu, build a cart, and the order is sent to your WhatsApp — no backend needed.

The menu is pure veg + egg: there are no chicken or meat items. Items with `veg: false` are egg
dishes and get an amber badge on the card.

## Run it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Pages

| Route      | What's on it                                                      |
| ---------- | ----------------------------------------------------------------- |
| `/`        | Hero, category grid, bestsellers, why-us, reviews, timings CTA    |
| `/menu`    | All 49 items with search, category tabs and pure veg / egg filter |
| `/about`   | Story, timeline and the three rules behind the counter            |
| `/contact` | Address, timings, map placeholder and a WhatsApp enquiry form     |

## The two files you will edit most

### 1. `src/lib/site.ts` — your shop details

Phone number, **WhatsApp number**, address, timings, socials, minimum order.
Set `whatsapp` to digits only with the country code, e.g. `"919812345678"` — this powers every
"Order on WhatsApp" button.

### 2. `src/lib/menu.ts` — the menu itself

Add or edit items in the `menu` array:

```ts
{
  id: "steamed-veg-momos",      // unique, used as the cart key
  name: "Steamed Veg Momos",
  description: "Eight hand-pleated dumplings…",
  price: 70,                     // half plate / single price
  priceFull: 120,                // optional — shows an extra "Add full" button
  categoryId: "momos",           // must match a category id below
  veg: true,                     // false marks it as an egg item (amber badge)
  emoji: "🥟",                   // shown when there is no photo
  tags: ["bestseller"],          // bestseller | spicy | new | chefs-pick
  image: "/menu/steamed-momos.jpg", // optional, see below
}
```

Categories live in the same file (`momos`, `rolls`, `spring-rolls`, `noodles`, `burgers`,
`sides`, `beverages`). Anything tagged `bestseller` automatically appears on the home page.

## Adding real food photos

Drop images into `public/menu/` and point the item's `image` field at them
(e.g. `image: "/menu/egg-roll.jpg"`). Without an image the card falls back to a gradient +
emoji tile, so the site never looks broken. Aim for ~800×600 JPGs under 200 KB.

Your logo is at `public/logos.png` (used in the navbar) and `src/app/icon.png` (browser tab).

## How ordering works

`src/components/cart-provider.tsx` holds the cart in React context and mirrors it to
`localStorage`, so a cart survives a page refresh. On checkout it builds a pre-filled
`wa.me` message with every line item and the total. To move to real online payments later,
replace the WhatsApp link in `src/components/cart-drawer.tsx` with a checkout API route.

## Install as an app (PWA)

The site is an installable Progressive Web App, so customers can add it to their phone's
home screen from a plain link — no app store needed.

| Piece                              | What it does                                                    |
| ---------------------------------- | --------------------------------------------------------------- |
| `src/app/manifest.ts`              | App name, colours, icons, home-screen shortcuts                 |
| `public/sw.js`                     | Service worker: caches pages and assets for slow / no internet   |
| `public/offline.html`              | Shown if someone opens the app with no connection                |
| `src/components/install-prompt.tsx`| "Install app" banner, plus Add to Home Screen steps on iPhone    |
| `public/icons/`                    | 192px, 512px and maskable icons generated from the logo          |

**Android / Chrome** fires the install prompt automatically; the banner's Install button
triggers it. **iPhone / Safari** has no such API, so the banner shows the Share →
Add to Home Screen steps instead. Dismissing it hides the banner for 14 days.

The service worker is only registered in production builds, so it never interferes with
`npm run dev`. To test the install flow locally:

```bash
npm run preview   # build + start, then open http://localhost:3000
```

Installation requires **HTTPS** (or localhost). It will not work when a phone opens your
laptop's IP over plain http — deploy first, then test on the phone.

After changing `public/sw.js`, bump the `VERSION` constant at the top so returning visitors
get the new cache instead of the stale one.

## Theme

Brand colours (`chilli`, `masala`, `charcoal`, `cream`), fonts and animations are defined in
`tailwind.config.ts`. Reusable classes like `.btn-primary`, `.card`, `.chip` and
`.container-page` live in `src/app/globals.css`.

## Note on Node

This project is pinned to Next.js 15 because Node 18 is installed. Upgrading to Node 20+
lets you move to Next 16, which also clears the remaining `npm audit` advisories.
