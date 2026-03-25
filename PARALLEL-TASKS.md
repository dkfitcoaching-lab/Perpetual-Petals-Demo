# Perpetual Petals — Parallel Build Tasks

## Foundation (DONE)
The Astro project is scaffolded in `/site/` with 12 components, a design system, and a clean build. Each task below is **fully independent** — they touch different files and can run simultaneously in separate Claude Code sessions.

---

## Task 1: Image Pipeline & Optimization
**Branch:** `claude/task-01-images`
**Files:** `site/public/images/`, `site/src/components/HeroImage.astro`, `site/src/components/Gallery.astro`, `site/src/components/Founder.astro`
**Instructions:**
1. Download all 6 images from the Squarespace CDN URLs listed in the old `index.html` and save to `site/public/images/`
2. Convert all images to WebP format (keep originals as fallback)
3. Create responsive variants: 400w, 800w, 1200w, 1800w
4. Update HeroImage.astro, Gallery.astro, and Founder.astro to use `<picture>` elements with `srcset` and WebP sources
5. Add proper `width`/`height` attributes to prevent layout shift
6. Create an OG image (1200x630) for social sharing at `site/public/images/og-image.jpg`

---

## Task 2: Navigation & Mobile Menu Polish
**Branch:** `claude/task-02-navigation`
**Files:** `site/src/components/Navigation.astro`
**Instructions:**
1. Add smooth scroll offset accounting for fixed header height
2. Add active section highlighting (scroll spy) — highlight current nav link based on scroll position
3. Add a mobile menu overlay/backdrop that dims the page when menu is open
4. Ensure the mobile menu traps focus for accessibility (tab cannot escape the open menu)
5. Add close-on-Escape keyboard handler
6. Test that the nav works flawlessly at every breakpoint: 320px, 375px, 414px, 768px, 1024px, 1440px

---

## Task 3: Opening Section Animations
**Branch:** `claude/task-03-opening`
**Files:** `site/src/components/Opening.astro`
**Instructions:**
1. Refine the title reveal animation — add a subtle scale or fade that feels organic
2. Add a soft parallax or gradient shift as user begins to scroll
3. Hide the scroll indicator after the user scrolls past the opening
4. Add a subtle decorative element (thin ornamental line, petal illustration, or monogram)
5. Ensure all animations respect `prefers-reduced-motion`
6. Test on iOS Safari, Chrome, and Firefox

---

## Task 4: Gallery Lightbox & Interaction
**Branch:** `claude/task-04-gallery`
**Files:** `site/src/components/Gallery.astro` (add a new `site/src/components/Lightbox.astro` if needed)
**Instructions:**
1. Add a click-to-expand lightbox for gallery images
2. Lightbox should include: backdrop blur, smooth open/close animation, left/right navigation, close button, keyboard navigation (Escape, arrows)
3. Image counter (e.g., "2 / 5")
4. Disable body scroll when lightbox is open
5. Touch/swipe support for mobile
6. Lazy loading for all gallery images
7. Must work without any external dependencies — pure CSS + vanilla JS

---

## Task 5: Form Validation & UX
**Branch:** `claude/task-05-form`
**Files:** `site/src/components/Application.astro`
**Instructions:**
1. Add client-side validation with clear, elegant error messages (not browser defaults)
2. Email format validation, phone format help
3. Add a loading spinner/state on the submit button while sending
4. Success confirmation with a subtle animation
5. Error state with retry option
6. Set up Formspree: create a form at formspree.io, get the endpoint URL, replace `YOUR_FORM_ID` in the component
7. Test the full submission flow end-to-end

---

## Task 6: FAQ Accordion Polish
**Branch:** `claude/task-06-faq`
**Files:** `site/src/components/FAQ.astro`
**Instructions:**
1. Add smooth open/close animation (height transition using CSS grid trick or max-height)
2. Ensure only one FAQ item is open at a time (the `name="faq"` attribute on `<details>` should handle this in modern browsers — verify cross-browser)
3. Add subtle background highlight on the open item
4. Ensure keyboard accessibility — Enter and Space toggle items
5. Add ARIA attributes for screen readers
6. Test on Safari (which has historically had issues with `<details>` animations)

---

## Task 7: Performance & Core Web Vitals
**Branch:** `claude/task-07-performance`
**Files:** `site/astro.config.mjs`, `site/src/layouts/BaseLayout.astro`, `site/src/styles/global.css`
**Instructions:**
1. Self-host Google Fonts (download Cormorant Garamond + Raleway WOFF2 files, add to `site/public/fonts/`)
2. Add `font-display: swap` and proper `@font-face` declarations
3. Remove the Google Fonts `<link>` tags
4. Add resource hints: `dns-prefetch`, `preload` for critical assets
5. Minify inline SVGs
6. Add a proper `robots.txt` and `sitemap.xml` to `site/public/`
7. Target: Lighthouse 95+ on Performance, 100 on Accessibility, 100 on Best Practices, 100 on SEO

---

## Task 8: Deployment Pipeline
**Branch:** `claude/task-08-deploy`
**Files:** New files: `netlify.toml` or `vercel.json`, `.github/workflows/deploy.yml`
**Instructions:**
1. Configure for Netlify OR Vercel (Netlify preferred for static sites)
2. Add `netlify.toml` with build command, publish directory, redirect rules
3. Add custom headers: security headers (CSP, X-Frame-Options, etc.), cache headers for static assets
4. Create GitHub Actions workflow for CI: build check on every PR
5. Add a `_redirects` file for clean URLs
6. Document the deployment process in a brief `DEPLOY.md`

---

## Task 9: 404 Page & Error Handling
**Branch:** `claude/task-09-404`
**Files:** New `site/src/pages/404.astro`
**Instructions:**
1. Create a beautiful 404 page that matches the brand aesthetic
2. Include the navigation and footer (use BaseLayout)
3. Elegant messaging: "This page doesn't exist, but something beautiful is waiting for you."
4. Link back to homepage
5. Subtle decorative element or animation
6. Make sure Astro generates it properly for the hosting platform

---

## Task 10: Analytics & Tracking Setup
**Branch:** `claude/task-10-analytics`
**Files:** `site/src/layouts/BaseLayout.astro`, new `site/src/components/Analytics.astro`
**Instructions:**
1. Create an Analytics component that loads Google Analytics 4 (GA4) with proper consent
2. Add conversion tracking for form submissions
3. Add a minimal, elegant cookie consent banner that matches the site's aesthetic
4. Ensure analytics doesn't impact page load (defer/async loading)
5. Add `data-*` attributes to key CTAs for event tracking
6. Placeholder GA4 measurement ID (to be replaced with real one)

---

## Task 11: Micro-Interactions & Polish
**Branch:** `claude/task-11-polish`
**Files:** `site/src/styles/global.css`, various components
**Instructions:**
1. Add hover states to all interactive elements (buttons, cards, links)
2. Smooth page-section transitions as user scrolls
3. Subtle parallax on the hero image
4. Service card hover: gentle lift + shadow
5. Button press effect (slight scale down on click)
6. Ensure all transitions use the design system's `--ease-out` and `--duration` variables
7. Add a subtle page-load transition (fade in from white)

---

## Task 12: Accessibility Audit
**Branch:** `claude/task-12-a11y`
**Files:** All components
**Instructions:**
1. Run an automated accessibility audit (axe-core or similar)
2. Ensure all images have descriptive alt text
3. Verify color contrast ratios meet WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text)
4. Test full keyboard navigation flow (Tab through entire page)
5. Ensure focus indicators are visible and styled to match the brand
6. Add skip-to-content link
7. Test with a screen reader (VoiceOver or NVDA descriptions)
8. Verify all form inputs have associated labels
9. Check heading hierarchy (no skipped levels)

---

## How to Run These

Each task can be run in a **separate Claude Code session** with this prompt pattern:

```
You are working on the Perpetual Petals website at /home/user/Perpetual-Petals-Demo/site/.
The project uses Astro. The build command is `cd site && npx astro build`.

Your task is: [PASTE THE TASK DESCRIPTION ABOVE]

Branch: [BRANCH NAME]
- Create the branch from `claude/fix-website-quality-FKGTo`
- Make your changes
- Verify the build passes
- Commit and push

Do not modify files outside your listed file scope.
```

## Merge Order

Tasks 1-12 are independent and can merge in any order. After all are merged:
1. Run a final integration build
2. Deploy to staging
3. Client review
