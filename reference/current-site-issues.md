# Perpetual Petals — Current Website Issues Audit

## Overview
Full audit of perpetual-petals.com as it exists today. These issues represent quality, functionality, and credibility gaps that undermine the brand's positioning as a premium, luxury floral membership.

---

## 1. BROKEN / NON-FUNCTIONAL

| # | Issue | Impact |
|---|-------|--------|
| 1.1 | **Form submits to nowhere** — The "Submit Application" button runs JavaScript that hides the form and shows "Thank You," but **zero data is sent anywhere**. No email, no database, no CRM. Every lead is lost. | **Critical — losing every potential client** |
| 1.2 | **All images hotlinked from Squarespace CDN** — Every image on the site loads from `images.squarespace-cdn.com`. When the Squarespace subscription ends, **every image on the site will break**. The site will be blank. | **Critical — ticking time bomb** |
| 1.3 | **Instagram link goes nowhere** — Footer Instagram icon links to `#` (a blank anchor). Doesn't go to the actual Instagram page. | Broken link, looks amateur |
| 1.4 | **No navigation / no menu** — There is no header nav, no hamburger menu, no way to jump between sections. Users must scroll the entire page. | Major usability failure |

---

## 2. SPELLING & GRAMMAR ERRORS

| # | Issue | Where |
|---|-------|-------|
| 2.1 | **"Windermeres"** — Missing apostrophe. Should be **"Windermere's"** | Appears in multiple locations on Squarespace site |
| 2.2 | **"compliment your setting"** — Wrong word. Should be **"complement"** (to complete/enhance, not to flatter) | Gatherings page, Design step |
| 2.3 | **"are curate and delivered"** — Missing letter. Should be **"are curated"** | FAQ: "How does the membership work?" |
| 2.4 | **"created-"** — Hyphen used instead of em dash. Should be **"created —"** | Membership page |
| 2.5 | **"schedule- weekly"** — Hyphen used instead of em dash. Should be **"schedule — weekly"** | FAQ: "How does the membership work?" |
| 2.6 | **"extra- dinner parties"** — Hyphen used instead of em dash throughout | FAQ: "Can I request something special?" |

---

## 3. CONTENT / COPY PROBLEMS

| # | Issue | Details |
|---|-------|---------|
| 3.1 | **Massively repetitive content** — The same description of "private floral membership" is repeated nearly word-for-word in: the hero section, the "What Sets Us Apart" section, the "Private Floral Placement" section, and the FAQ. A visitor reads essentially the same paragraph 4+ times. | Feels like filler, not premium |
| 3.2 | **"The Perpetual Petal" (singular)** — Inconsistent brand naming. The business is "Perpetual Petals" but the membership page says "The Perpetual Petal is an ongoing floral narrative." | Sloppy branding |
| 3.3 | **"access to me"** — First-person voice ("Members have priority access to me") in the FAQ, while the entire rest of the site uses third-person voice ("she creates..."). Inconsistent and unprofessional. | FAQ: "Can I request something special?" |
| 3.4 | **Fake testimonial** — The testimonial section quotes "A Perpetual Petals Member" but the quote is actually a line pulled from the site's own copy ("Each arrangement arrives as it is meant to."). It's not a real customer testimonial — it's the brand quoting itself. | Credibility killer |
| 3.5 | **No pricing information anywhere** — For a membership service with "placement levels" and an "Investment Range" dropdown, the site never communicates even a price range or tier structure. | Friction for serious clients |
| 3.6 | **"Founded by" is redundant** — The founder section header says "Lori Fronzak" with subtitle "Founder & Floral Designer," then the bio paragraph starts with "Founded by Lori Fronzak (Ell)..." — saying "founded by" twice. | Clumsy writing |

---

## 4. DESIGN & UX ISSUES

| # | Issue | Details |
|---|-------|---------|
| 4.1 | **Blue line under header on Squarespace site** — There's a bright blue horizontal rule under the navigation that clashes with the soft pink/mauve color palette. Looks like an unstyled default element. | Visible on every page |
| 4.2 | **Plus (+) icon in the header** — The top-left corner has a mysterious "+" icon. No label, unclear what it does. | Confusing on mobile |
| 4.3 | **Scrolling marquee text gets cut off** — The animated text ticker shows fragments like "ONALLY CURATED" and "HOUGHTFULLY PLAC" — the text is simply too large for the viewport and gets clipped mid-word. | Looks broken on mobile |
| 4.4 | **Form field borders are chunky black** — The event inquiry form has thick black borders on all inputs, completely inconsistent with the soft, elegant aesthetic of the rest of the site. | Feels like a default template form |
| 4.5 | **Inconsistent text alignment** — Main page uses centered text; Gatherings page switches to left-aligned. The FAQ uses left-aligned. No consistent design system. | Disjointed experience |
| 4.6 | **Oval image frames everywhere** — Every single image is displayed in the same oval/egg frame. No variety in image treatment, making it feel like a template. | Repetitive, looks like a free theme |
| 4.7 | **font-weight: 300 on everything** — Almost all body text uses the lightest weight available (300). Combined with line-height 2.0, it creates low contrast, hard-to-read text that feels wispy, not elegant. | Accessibility concern + poor readability |
| 4.8 | **No Open Graph / social sharing tags** — Sharing the site on Instagram, Facebook, or iMessage shows no preview image, no description. Just a bare URL. For a visual brand, this is a missed opportunity. | Bad social presence |
| 4.9 | **No favicon** — Browser tab shows a generic icon. | Minor but unprofessional |
| 4.10 | **reCAPTCHA badge overlaps content** — The Google reCAPTCHA badge sits on top of content in the bottom-right corner of the form pages. | Visual clutter |

---

## 5. TECHNICAL / INFRASTRUCTURE

| # | Issue | Details |
|---|-------|---------|
| 5.1 | **Entire site is a single HTML file** — No framework, no components, no CMS. Every change requires editing raw HTML. The client cannot update anything themselves. | Unmaintainable |
| 5.2 | **No backend** — The form `e.preventDefault()` blocks submission and just shows a "Thank You" message. There is literally no data processing. No email gets sent. No data gets stored. | Every lead is lost |
| 5.3 | **No analytics** — No Google Analytics, no tracking pixels, no conversion tracking. There's no way to know how many people visit, where they come from, or if anyone clicks "Submit." | Flying blind |
| 5.4 | **No sitemap.xml** — Search engines can't efficiently crawl the site. | Poor SEO |
| 5.5 | **No structured data / Schema.org** — Google doesn't know this is a local business. No LocalBusiness schema, no service schema. Won't appear in rich results. | Invisible to Google |
| 5.6 | **Images not optimized** — Full-resolution PNGs loaded from Squarespace CDN. No WebP, no srcset, no responsive images. On mobile, users download unnecessarily large files. | Slow page load |
| 5.7 | **No SSL certificate info / security headers** — Basic security hygiene missing. | Unprofessional |
| 5.8 | **No 404 page** — If someone visits a wrong URL, they get a default error page. | Looks broken |
| 5.9 | **Copyright says 2026** — `© 2026 Perpetual Petals` — either premature or hardcoded. Should be dynamic. | Minor detail, shows lack of polish |

---

## 6. WHAT THIS MEANS FOR THE BUSINESS

- **Every form submission is lost.** Not a single lead has been captured through the website.
- **The site will break entirely** when the Squarespace CDN subscription lapses — all images will vanish.
- **The brand appears amateur** to the luxury clientele it's targeting — typos, repetitive copy, broken links, and template-quality design don't justify a premium membership price point.
- **Zero visibility** — No SEO, no analytics, no social sharing previews. The site may as well not exist for discoverability.
- **The client is locked out** — They can't update content, add photos, or manage anything without a developer editing raw HTML.

---

*Compiled from mobile screenshots and source code review of perpetual-petals.com, March 2026.*
