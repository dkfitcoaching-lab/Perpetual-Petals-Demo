# Deployment Guide — Perpetual Petals

## Hosting

The site is configured for **Netlify** deployment.

## Setup

1. Connect the repository to Netlify (via the Netlify dashboard or CLI).
2. Netlify reads `netlify.toml` automatically — no manual build settings needed.
   - **Base directory:** `site`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`

## What's Configured

| File | Purpose |
|---|---|
| `netlify.toml` | Build settings, redirects, and security/cache headers |
| `site/public/_redirects` | Clean URL redirects (Netlify flat-file format) |
| `site/public/_headers` | Security and caching headers (Netlify flat-file format) |
| `.github/workflows/deploy.yml` | GitHub Actions CI — runs a build check on every PR |

## Security Headers

All pages are served with:

- `X-Frame-Options: DENY` — prevents clickjacking
- `X-Content-Type-Options: nosniff` — prevents MIME-type sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` — restricts resource loading to same-origin
- `Permissions-Policy` — disables camera, microphone, geolocation

## Caching

- Hashed assets (`/_assets/*`) are cached with `immutable, max-age=1y`.
- Other static files (SVG, ICO) are cached for 1 day.

## Local Preview

```bash
cd site
npm install
npm run build
npm run preview
```
