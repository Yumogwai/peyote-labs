# Peyote Labs — lessons

## 2026-08-23 — Live button audit: never fake a send

**Tried:** Clicked every nav/CTA/footer link on www.peyote-labs.com (desktop + mobile). Internal and product URLs all 200. LinkedIn 200.

**Failed:** The only real broken control was `Send to Peyote Labs`. The form `preventDefault`’d and showed “Message received” with no backend — leads vanished. Mobile menu could stay open after a client-side route change because `SiteNav` lives in the layout and `open` state persisted.

**Rule now:**
- Contact success copy is allowed only after `/api/contact` returns ok. If the relay fails, open a prefilled `mailto:` — never a fake thank-you.
- Close the mobile drawer on `pathname` change, not only on the link `onClick`.
- Next.js `app/icon.tsx` does **not** satisfy `/favicon.ico` (browsers still request it → 404). Rewrite `/favicon.ico` → `/icon`.
- `metadataBase` does not emit canonicals or per-page `og:title`. Set `alternates.canonical` and `openGraph.title` on every route or inner pages inherit the homepage OG card.
