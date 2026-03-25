# Perpetual Petals — Full Production Rebuild

## Status: AWAITING VISUAL REFERENCES

### What's Needed Before Work Begins

Drop files into these directories:

- **`/reference/current-site/`** — Full-page screenshots of current Squarespace site (desktop + mobile)
- **`/reference/inspiration/`** — Competitor/aspirational sites that represent target quality
- **`/assets/images/`** — All floral photography, logo, headshots, event photos
- **`/reference/brand-assets/`** — Brand guidelines, color specs, mood boards

### Current Site Issues (Critical)

1. **Single HTML file** — No CMS, no framework, no build system
2. **Images hotlinked from Squarespace CDN** — Will break when Squarespace is cancelled
3. **Non-functional form** — Submit button shows "Thank You" but data goes nowhere
4. **No navigation** — No header, no menu, no way to jump between sections
5. **Generic template aesthetic** — Indistinguishable from a free Squarespace theme
6. **Typography problems** — Font-weight 300 everywhere, line-height 2.0, low contrast
7. **No SEO** — Missing Open Graph tags, structured data, sitemap
8. **No analytics** — No tracking, no conversion measurement
9. **No hosting/deployment** — Just a static file with no infrastructure

### Rebuild Scope: Full Production Site

- Modern framework (Next.js or Astro)
- Headless CMS for client content management
- Working form with backend processing
- Self-hosted, optimized imagery
- Professional hosting and deployment pipeline
- SEO, analytics, and performance optimization
- Design that justifies a $30,000 contract for a multimillion-dollar client
