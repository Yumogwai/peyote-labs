# Peyote Labs — company website

Marketing site for the Peyote Labs studio (services + products hub).

## Visibility

`public-ok` — company face for outreach and LinkedIn.

## Stack

Next.js App Router · TypeScript · Tailwind v4 · deploy on Vercel (`peyote-labs`).

## Products linked from this site

- JobCommand → `../JobCommand/` / job-command.com
- WellFitCV → `../WellFitCV/` / wellfitcv.com

## Rules

- Never mention Andrii's current employer / Workday in copy.
- Company voice (studio), not personal freelancer voice.
- GitHub `Yumogwai/peyote-labs` is source of truth — not v0.

## Deploy (fast path — confirmed 2026-08-12)

- Vercel Git Integration is on: **every push to `main` → Production** on www.peyote-labs.com.
- Other branches → Preview only (not the live site).
- **Exception to OS Never-auto:** for this project the agent may `git push` to `main` (and merge open PRs into `main`) so the live site updates without a second approve. No force-push. No other projects inherit this.
