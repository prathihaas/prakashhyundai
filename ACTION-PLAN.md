# Prakash Hyundai — SEO Action Plan

**Site:** https://www.prakashhyundai.com
**Last updated:** 2026-05-03

---

## Status Legend
- ✅ DONE — Fixed in codebase, pushed to GitHub
- 🔧 MANUAL — Requires manual action outside codebase
- 📋 BACKLOG — Lower priority, future work

---

## CRITICAL (Fix Immediately)

| # | Issue | File | Status |
|---|-------|------|--------|
| C1 | No security headers (HSTS, CSP, X-Frame, Referrer-Policy, Permissions-Policy) | `vercel.json` | ✅ DONE |
| C2 | No Content Security Policy — site vulnerable to XSS clickjacking | `vercel.json` | ✅ DONE |

---

## HIGH (Fix This Week)

| # | Issue | File | Status |
|---|-------|------|--------|
| H1 | AutoDealer schema has no `@id` entity anchor — cross-page linking impossible | `SEOHead.astro`, `index.astro`, `locations.astro` | ✅ DONE |
| H2 | Duplicate AutoDealer schema emitted on ALL pages (car/blog/service have own schemas) | `SEOHead.astro` + all page files | ✅ DONE |
| H3 | No Review[] objects in org schema despite showing reviews on homepage | `SEOHead.astro`, `index.astro` | ✅ DONE |
| H4 | Dynamic `new Date()` lastmod in sitemap — wastes crawl budget | `astro.config.mjs` | ✅ DONE |
| H5 | /lp/ pages included in sitemap | `astro.config.mjs` | ✅ DONE |
| H6 | No AI crawler access in robots.txt (GPTBot, ClaudeBot, PerplexityBot blocked by default) | `public/robots.txt` | ✅ DONE |
| H7 | No llms.txt — site invisible to AI search citation | `public/llms.txt` | ✅ DONE |
| H8 | Car schema `@type: "Product"` missing "Car" type | `cars/[slug].astro` | ✅ DONE |
| H9 | Car schema seller not linked to org `#organization` entity | `cars/[slug].astro` | ✅ DONE |
| H10 | BreadcrumbList missing on blog, service, locations pages | All three pages | ✅ DONE |
| H11 | Blog article author always Person type even for brand bylines | `blog/[slug].astro` | ✅ DONE |
| H12 | Missing GTM preconnect/dns-prefetch hints | `Layout.astro` | ✅ DONE |
| H13 | No `foundingDate` in schema despite "since 2008" claim in footer | `SEOHead.astro`, `index.astro` | ✅ DONE |

---

## MEDIUM (Fix This Month)

| # | Issue | File | Status |
|---|-------|------|--------|
| M1 | Product images hotlinked from Hyundai India CDN — may be blocked/slow | `src/content/cars/*.md` | 🔧 MANUAL |
| M2 | og:locale:alternate te_IN missing for bilingual site signal | `SEOHead.astro` | ✅ DONE |
| M3 | Car card images in homepage grid missing `loading="lazy"` | `index.astro` | ✅ DONE |
| M4 | No `WebPage` schema on inner pages | `SEOHead.astro` | ✅ DONE |
| M5 | AutoRepair schema parentOrganization not linked via @id | `service.astro` | ✅ DONE |
| M6 | /vehicles/:slug redirect missing | `vercel.json` | ✅ DONE |
| M7 | Contact page has no JSON-LD schema | `contact.astro` | 📋 BACKLOG |
| M8 | areaServed array incomplete (missing Banswada, Bodhan, Yellareddy, Karimnagar) | `SEOHead.astro` | ✅ DONE |
| M9 | Service page has no cross-link to /locations | `service.astro` | ✅ DONE |

---

## LOW (Backlog)

| # | Issue | Notes | Status |
|---|-------|-------|--------|
| L1 | OG image quality not verified | Verify `public/og-image.jpg` is 1200×630 and Hyundai branded | 🔧 MANUAL |
| L2 | Blog posts don't link to car model pages | Add contextual links in blog content (e.g., Creta article → /cars/creta) | 📋 BACKLOG |
| L3 | Contact page schema missing | Add LocalBusiness or ContactPage schema to `contact.astro` | 📋 BACKLOG |
| L4 | hreflang for Telugu pages | Add `te-IN` hreflang when Telugu content created | 📋 BACKLOG |
| L5 | Blog listing page has no BreadcrumbList or FAQPage | Low-hanging schema opportunity | 📋 BACKLOG |
| L6 | No favicon.svg fallback visible in browser tab (using .jpg) | Replace with proper SVG favicon | 📋 BACKLOG |
| L7 | GMB posts not linked to blog content | Cross-promote blog on Google Business Profile | 🔧 MANUAL |
| L8 | No local directory citations | Submit to Justdial, Sulekha, IndiaMART | 🔧 MANUAL |

---

## Manual Action Items

### M1 — Self-host Car Product Images
**Why:** CDN images from `www.hyundai.com` may have hotlink restrictions and slow down LCP.

**Steps:**
1. Download each car image from the URL in `src/content/cars/*.md`
2. Save to `public/images/products/[slug].jpg` (e.g., `creta.jpg`, `venue.jpg`)
3. Update `image:` frontmatter in each `.md` file:
   ```yaml
   image: /images/products/creta.jpg
   ```
4. Apply to all 12 car files: creta, venue, venue-n-line, exter, i20, i20-n-line, grand-i10-nios, aura, verna, alcazar, creta-n-line, ioniq-5

### L1 — Verify/Replace OG Image
**Why:** The OG image at `/og-image.jpg` appears to exist (file is in `public/`) but quality/branding not verified.

**Steps:**
1. Create a 1200×630 JPG in Canva with:
   - Hyundai blue (#002C5F) background
   - "PRAKASH HYUNDAI" in white
   - "Authorized Dealer | Nizamabad, Telangana" subtitle
   - Hyundai logo or car image
2. Save as `public/og-image.jpg`

### GMB/GBP Optimization (Manual)
1. Add weekly GBP posts linking to new blog content
2. Respond to all unanswered reviews
3. Add product catalog photos for all 12 car models
4. Ensure all 9 branch GMB profiles are verified and consistent

---

## Commits Made (2026-05-03)

| Commit | Description |
|--------|-------------|
| `f40b5d5` | feat(seo): add security headers, static sitemap lastmod, AI-crawler robots.txt |
| `39f5ab2` | feat(schema): enrich org schema with @id, foundingDate, reviews, WebPage schema |
| `2decd00` | feat(schema): fix page-level schemas, BreadcrumbList, noOrgSchema on inner pages |
| `02e3ab3` | feat(geo): add llms.txt for AI search engine indexing and citation readiness |

---

## Files Changed Summary

| File | Changes |
|------|---------|
| `vercel.json` | +security headers (HSTS, CSP, X-Frame, etc.) +/vehicles/:slug redirect |
| `astro.config.mjs` | Static lastmod dates, filter /lp/ from sitemap |
| `public/robots.txt` | AI crawler Allow blocks, Disallow /lp/ |
| `public/llms.txt` | NEW — Full AI context document |
| `src/components/SEOHead.astro` | @id, foundingDate, Review[], WebPage schema, noOrgSchema prop, og:locale:alternate |
| `src/layouts/Layout.astro` | noOrgSchema passthrough, GTM preconnect/dns-prefetch |
| `src/pages/index.astro` | Enriched hyRatingSchema, noOrgSchema=true, lazy car images |
| `src/pages/cars/[slug].astro` | ["Product","Car"] type, @id, seller #organization, noOrgSchema |
| `src/pages/blog/[slug].astro` | Organization author type, BreadcrumbList, noOrgSchema |
| `src/pages/service.astro` | @id, parentOrganization #organization, BreadcrumbList, location cross-link |
| `src/pages/locations.astro` | @id matching #organization, BreadcrumbList, noOrgSchema |
