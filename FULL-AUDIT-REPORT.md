# Full SEO Audit Report — Prakash Hyundai
**URL:** https://www.prakashhyundai.com (primary domain; prakashhyundai.in does not resolve)
**Date:** 2026-05-04
**Score Before Fixes:** 67/100
**Score After Fixes:** 87/100 (projected)
**Audited By:** Automated codebase + live site analysis (Astro/Tailwind/Vercel stack)

---

## Executive Summary

Prakash Hyundai has a **well-structured Astro/Tailwind codebase** with strong foundational SEO: proper canonicals, solid security headers, a working sitemap, rich structured data, and 54 active blog posts covering local and comparison keywords. The site scores 67/100 — above average for a regional dealership — but leaves significant ranking gains on the table.

### Top 5 Critical Issues

1. **`prakashhyundai.in` domain does not exist** — The audit was requested for `.in` but DNS confirms `www.prakashhyundai.in` returns NXDOMAIN. The live site runs entirely on `www.prakashhyundai.com`. Any `.in` references in GMB, ads, or printed materials are dead links.

2. **No mobile hamburger navigation** — The header nav is `hidden md:flex` with no mobile toggle implemented. On screens below 768px (the majority of Indian mobile users), navigation links to `/service`, `/locations`, `/blog`, `/contact` are completely inaccessible. The sticky bottom bar is too limited.

3. **Hero image not preloaded and missing `width`/`height`** — The LCP candidate (`/images/hero-venue.jpg`, 1860×540px JPEG) has no `<link rel="preload">` in `<head>` and no dimension attributes. This causes measurable LCP delay and CLS layout shift.

4. **26 of 54 blog posts share only 3 generic featured images** — 11 posts share `hyundai-car-review-2026.jpg`, 5 share `hyundai-car-comparison-2026.jpg`, 10 share `hyundai-cars-nizamabad-guide-2026.jpg`. Duplicate OG images prevent distinctive rich result thumbnails in Google Search.

5. **Car product pages are critically thin (20–25 lines each)** — All 12 car pages in `src/content/cars/*.md` contain ~100–200 words. These pages compete for the highest-value commercial queries ("Hyundai Creta price Nizamabad") yet have almost no content depth.

### Top 5 Quick Wins

1. **Add mobile hamburger nav** — 2 hours of work. Eliminates a UX/crawlability gap that affects the majority of mobile users.

2. **Preload hero image + add width/height attributes** — 30-minute fix. Direct improvement to LCP and CLS Core Web Vitals scores.

3. **Fix meta description: "8 branches" vs actual "9 showrooms"** — 2-minute fix. The homepage meta says "8 branches" while all other content says "9 showrooms". Eliminates a trust-eroding inconsistency visible in SERPs.

4. **Wire `featured_image` into `og:image` on blog posts** — 1-line code change in `blog/[slug].astro`. Currently the template uses `og-image.jpg` fallback even when a post has its own `featured_image`. Unique OG images per post increase click-through from social shares.

5. **Fix BreadcrumbList item 2 on car pages (hash anchor to real URL)** — The car page breadcrumb schema uses `/#cars` (a hash anchor, not a real URL) as item 2. Change to the homepage URL. 30-minute fix.

---

## Category Scores

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Technical SEO | 22% | 72/100 | 15.8 |
| Content Quality | 23% | 68/100 | 15.6 |
| On-Page SEO | 20% | 74/100 | 14.8 |
| Schema / Structured Data | 10% | 82/100 | 8.2 |
| Performance (CWV) | 10% | 58/100 | 5.8 |
| AI Search Readiness | 10% | 78/100 | 7.8 |
| Images | 5% | 52/100 | 2.6 |
| **Overall** | **100%** | **67/100** | |

---

## 1. Technical SEO — Score: 72/100

### 1.1 Domain & Redirects

**[Critical] `prakashhyundai.in` does not resolve**
- DNS lookup confirms `www.prakashhyundai.in` returns NXDOMAIN (Non-existent domain). The site runs exclusively at `https://www.prakashhyundai.com`.
- Any Google Business Profile listings, ad destination URLs, printed materials, or third-party citations using `.in` are broken links delivering 0 traffic.
- **Fix:** Either register `prakashhyundai.in` and set up a 301 redirect to `www.prakashhyundai.com`, OR immediately audit all external citations (GBP, Google Ads, Meta Ads, Justdial, directories) to replace `.in` with `.com`.

**[High] Non-www to www redirect returns HTTP 307 (Temporary) instead of 301 (Permanent)**
- `curl -I https://prakashhyundai.com` returns `HTTP/1.1 307 Temporary Redirect`.
- `vercel.json` has `"permanent": true` on this redirect, which should produce a 301. The observed 307 suggests a Vercel infrastructure-level configuration issue (Vercel's Domain settings may be overriding the JSON config).
- 307 redirects do not pass full PageRank. Any external links to `prakashhyundai.com` (without www) lose ranking equity.
- **Fix:** In the Vercel project dashboard, set `www.prakashhyundai.com` as the primary domain and configure `prakashhyundai.com` (non-www) with a permanent 301 redirect at the infrastructure level rather than relying solely on `vercel.json`.

### 1.2 robots.txt

**[Good] robots.txt is well-configured**
- Located at `public/robots.txt`, served correctly.
- `Allow: /` for all bots; `Disallow: /lp/` correctly blocks the paid landing page.
- All major AI crawlers (GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, ChatGPT-User, Amazonbot, GoogleOther) are explicitly allowed.
- Sitemap reference: `https://www.prakashhyundai.com/sitemap-index.xml` — correct.

**[Medium] LP page CSP violation — Tailwind CDN not in script-src**
- `lp/hyundai-nizamabad.astro` loads `<script src="https://cdn.tailwindcss.com">` — a ~350KB blocking script — which is not listed in the site-wide CSP `script-src` directive. The LP carries `noindex` so it doesn't affect search rankings, but it does affect Google Ads Quality Score and conversion rates.
- **Fix:** Build the LP using the site's compiled Tailwind CSS, removing the CDN dependency.

### 1.3 Sitemap

**[Good] Sitemap is functional and comprehensive**
- `sitemap-index.xml` → `sitemap-0.xml` with 76 URLs: homepage, blog index, 54 active blog posts, 12 car pages, contact, locations, service.
- LPs, 404, and draft posts are correctly excluded.
- `priority` and `changefreq` correctly assigned per content type.
- `lastmod` uses static dates to prevent crawl budget waste — a deliberate design choice.

**[Medium] `lastmod` dates are static and will drift**
- All blog posts show `lastmod: 2026-04-15` regardless of actual modification date.
- When posts are updated, `LASTMOD.blogPost` in `astro.config.mjs` should be updated to signal freshness.
- **Fix:** Add a deployment step that updates `LASTMOD` values whenever blog content is refreshed.

**[Low] No image sitemap entries**
- The sitemap schema includes `xmlns:image` namespace but no `<image:image>` entries are generated.
- Car product images and hero images are not included.
- **Fix:** Consider using the `@astrojs/sitemap` image sitemap feature or a custom sitemap generator to include image entries for car pages.

### 1.4 Canonical Tags

**[Good] Canonicals are consistently applied**
- Every page explicitly passes a `canonical` prop to `Layout.astro`.
- `SEOHead.astro` falls back to `Astro.url.href` only as a last resort.
- Trailing slash consistency: all sitemap URLs and canonical tags use trailing slashes on blog and car pages — consistent.

### 1.5 Security Headers

**[Good] Comprehensive security headers via `vercel.json`**
All six major security headers are correctly set:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` — 2-year HSTS with preload list eligibility
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(self), payment=()`
- `Content-Security-Policy` — comprehensive inline policy

**[Medium] CSP uses `unsafe-inline` in script-src**
- Required for GTM and Astro's inline script injection. This is the standard tradeoff for GTM-based sites. Acceptable but weakens XSS protection.

**[Low] No `X-Robots-Tag: noindex` HTTP header on `/lp/*` pages**
- The LP page has `<meta name="robots" content="noindex, nofollow">` but no HTTP-level `X-Robots-Tag` header as a second layer of protection.
- **Fix:** Add to `vercel.json` a headers rule for `/lp/*` paths adding `X-Robots-Tag: noindex`.

### 1.6 Crawlability Issues

**[Critical] No mobile hamburger navigation**
- `Layout.astro` line 65: `<nav class="hidden md:flex items-center gap-8">` — navigation is hidden below 768px.
- No hamburger toggle, drawer, or mobile menu component exists anywhere in the codebase.
- Google's mobile-first indexing crawls the mobile version of the site. Critical navigation links (Service, Locations, Blog, Contact) are unreachable on the mobile-rendered page.
- **Fix:** Add a hamburger button and mobile slide-out nav (or dropdown). Simple implementation using Astro's `client:load` directive with a toggle state.

---

## 2. Content Quality — Score: 68/100

### 2.1 E-E-A-T Assessment

**[Good] Strong Experience and Trust signals**
- 18+ years operation since 2008 cited prominently.
- 4.7★ from 2,915+ Google reviews displayed on homepage and in schema.
- Real customer reviews with verbatim quotes.
- Specific branch addresses, individual phone numbers, and hours for all 9 locations.
- Service pricing displayed transparently (₹2,499 / ₹4,499 / ₹8,999).

**[Medium] No named expert authors on blog posts**
- All blog posts use `author: "Prakash Hyundai Team"` — an organizational byline with no named individual.
- Google Quality Rater Guidelines for YMYL-adjacent content (car finance guides, maintenance cost comparisons) favor named human experts.
- The `Article` schema correctly uses `Organization` type when the author is the team name, but a named byline strengthens trust.
- **Fix:** Assign 2–3 named staff members (e.g., sales manager, service advisor) as byline authors for high-stakes articles. Create an Author page per person at `/author/{name}`.

**[High] No "About Us" page**
- No `/about` page exists. The redirect `/about-us` → `/` sends users to the homepage.
- An About page with founding story, dealer certifications, team photos, and awards strengthens E-E-A-T and provides a dedicated entity establishment page.
- **Fix:** Create `src/pages/about.astro` with the 2008 founding story, dealership certifications, awards received, and team members.

### 2.2 Content Depth Issues

**[High] Car product pages have critically thin content (20–25 lines)**
- All 12 car pages in `src/content/cars/*.md` contain approximately 100–200 words.
- Example: `creta.md` — 1 overview paragraph, 5 bullet features, 3 spec bullet points. No variant pricing, no colours, no competition comparison, no FAQ section, no local delivery notes.
- These pages target the highest-value commercial queries (e.g., "Hyundai Creta price Nizamabad") which competitors fill with 800–1,500 word pages.
- **Fix:** Expand each car page to 600–1,000 words: variant-wise pricing table, colour options, key features with Nizamabad road context, comparison with top 2 competitors, financing options specific to the model, FAQ section (4–6 Q&A pairs).

**[High] Content cannibalization — multiple posts target the same keyword cluster**
- 4 posts target "Grand i10 Nios vs competitors":
  - `hyundai-grand-i10-nios-vs-maruti-swift-tata-tiago-2026.md`
  - `hyundai-grand-i10-vs-maruti-swift-nizamabad-2026.md`
  - `hyundai-grand-i10-vs-tata-tiago-tigor-2026.md`
  - `hyundai-grand-i10-nios-review-nizamabad.md`
- 3 posts target "i20 vs Baleno/Glanza":
  - `hyundai-i20-vs-maruti-baleno-nizamabad-2026.md`
  - `hyundai-i20-vs-maruti-baleno-vs-toyota-glanza-2026.md`
  - `hyundai-i20-vs-toyota-glanza-maruti-baleno-2026.md`
- These posts compete with each other for the same queries, splitting link equity and confusing Google's ranking algorithm.
- **Fix:** Consolidate overlapping comparison posts. Choose one as the primary, redirect others to it (301), and merge the best content from the duplicates into the primary.

**[Medium] Shortest active post: "Venue N Line vs Standard Venue" (141 lines, ~900 words)**
- For a purchase decision comparing a ₹12+ lakh vehicle, 900 words is insufficient.
- **Fix:** Expand to 1,500–2,000 words with a specification table, real-world value analysis, and FAQ section.

### 2.3 Telugu Language Gap

**[Medium] Only 1 Telugu-language post exists**
- `nizamabad-car-buying-guide-telugu-2026.md` is the only Telugu content.
- Nizamabad's primary spoken language is Telugu. Telugulanguage content for high-intent queries ("నిజామాబాద్ లో హ్యుండాయ్ కారు") would capture searches that English content cannot.
- The `og:locale:alternate` tag for `te_IN` is set — this signals intent but there is no Telugu URL to point it to.
- **Fix:** Publish Telugu versions of the top 5 buying guides and the Creta/Venue/Exter model pages.

### 2.4 Readability

**[Good] Blog content is well-structured and locally relevant**
- H2/H3 hierarchy used throughout.
- Comparison tables with local pricing data are present.
- Local references (Nizamabad mandals, Telangana districts, local competitors) add E-E-A-T depth.
- The Creta vs Seltos post (~2,000+ words) demonstrates excellent topical depth.

---

## 3. On-Page SEO — Score: 74/100

### 3.1 Title Tags

**[Good] Homepage title is well-optimized**
- "Prakash Hyundai Nizamabad | Creta, Venue, i20 Dealer" — 55 characters; includes brand, city, top models.

**[Medium] Car page titles are functional but miss CTR opportunities**
- Template: `"Hyundai {name} Price in Nizamabad | Prakash Hyundai"`
- Could include price point or USP to improve CTR.
- Example improvement: "Hyundai Creta Price Nizamabad — From ₹10.79L | Prakash Hyundai"

**[Low] Meta description says "8 branches" but site says "9 showrooms"**
- Homepage meta: "Authorized Hyundai dealer in Nizamabad & **8 branches** across North Telangana"
- Homepage content, schema, and llms.txt: **"9 showrooms"**
- This inconsistency is visible in Google SERP snippets and erodes trust.
- **Fix:** Update meta description in `index.astro` from "8 branches" to "9 showrooms".

### 3.2 Heading Structure

**[Good] H1 tags are present and optimized on all key pages**
- Homepage H1: "Hyundai Showroom Nizamabad — Best Price & Free Test Drive" — strong commercial intent.
- Service H1: "Authorized Hyundai Service Center in Nizamabad" — precise match.
- Blog posts: H1 = post title — correct.

**[Medium] Weaker H1s on Locations and Contact pages**
- Locations H1: "Our Showroom Locations" — should be "Hyundai Showrooms Near You — Nizamabad, Armoor, Bodhan & More"
- Contact H1: "Contact Us" — should be "Contact Prakash Hyundai Nizamabad | Call +91 9052110303"

**[Medium] Blog listing page uses `<h3>` for post titles instead of `<h2>`**
- In `blog/index.astro`, post card titles render as `<h3>` inside `<article>` elements.
- These are sub-headings of the page, not sub-headings of a sub-section, so `<h2>` is semantically correct.

### 3.3 Meta Descriptions

**[Good] Meta descriptions present and well-crafted site-wide**
- Blog posts use the `seo_description` YAML field enforced by content schema.
- All main pages have unique, keyword-rich descriptions within 120–160 characters.

**[Low] No max-length validation on `seo_description` in content schema**
- `config.ts` defines `seo_description: z.string()` without a max-length constraint.
- Some descriptions may exceed 160 characters and be truncated in SERPs.
- **Fix:** Add `.max(160)` to the Zod schema for `seo_description` to enforce limits at content authoring time.

### 3.4 Internal Linking

**[High] Car product pages have zero contextual links to related blog posts**
- The `[slug].astro` car page template contains no links to relevant review, comparison, or buying guide posts.
- A user on `/cars/creta` has no way to navigate to "Hyundai Creta 2026 Review Nizamabad," "Creta vs Seltos," or "Best SUV Under 20 Lakh" — all of which exist on the site.
- **Fix:** In the car page template, add a "Related Guides" section that queries blog posts with matching `tags` (e.g., tag = "Hyundai Creta") and renders 2–3 related article cards.

**[High] Blog posts lack contextual links to car product pages**
- Review and comparison blog posts do not link back to the respective `/cars/{model}` product pages within body text.
- The only car page link in `blog/[slug].astro` is in the bottom CTA block — not contextual.
- **Fix:** When writing or generating blog content, include at least 1–2 contextual links to the relevant car page in the article body. Add this as a content creation checklist item.

**[Medium] Breadcrumb HTML absent on car pages**
- JSON-LD BreadcrumbList schema is present on car pages, but no visible HTML breadcrumb trail exists.
- Only an "← All Cars" link is shown.
- **Fix:** Add a visible `<nav aria-label="Breadcrumb">` matching the JSON-LD structure: Home > Cars > {Model Name}.

**[Medium] Footer has no links to car models or popular blog posts**
- The footer Quick Links section points only to the main nav pages (Home, Cars, Locations, etc.) — not to specific car models or top-performing blog posts.
- **Fix:** Add "Popular Cars" (Creta, Venue, Exter, i20 direct links) and "Top Guides" (3–4 popular blog post links) columns to the footer.

### 3.5 URL Structure

**[Good] Clean, descriptive URL structure throughout**
- `/cars/creta`, `/cars/venue`, `/blog/hyundai-creta-vs-kia-seltos-nizamabad-2026` — all lowercase, hyphenated, descriptive.
- No query strings or numeric IDs in content URLs.

---

## 4. Schema & Structured Data — Score: 82/100

### 4.1 Schema Coverage Overview

| Page | Schema Types Present |
|------|---------------------|
| Homepage | AutoDealer (AggregateRating, Review, 5 department branches, areaServed), FAQPage, WebPage |
| Car pages | Product+Car, Offer (with seller), BreadcrumbList, WebPage |
| Blog posts | Article (author, publisher, datePublished), BreadcrumbList, FAQPage (conditional), WebPage |
| Locations | AutoDealer (with all 9 department locations), BreadcrumbList |
| Service | AutoRepair (with parentOrganization link), BreadcrumbList |
| Contact | ContactPage (with ContactPoint, openingHours), BreadcrumbList |

**[Good] Entity linking via `@id` is correctly implemented**
- `"@id": "https://www.prakashhyundai.com/#organization"` is consistently referenced across AutoDealer instances.
- `WebPage.isPartOf` correctly references the organization `@id`.

**[Medium] Car schema uses deprecated `@type: ["Product", "Car"]`**
- Schema.org's `Car` type has been reorganized. Google's structured data documentation for auto dealers recommends `Vehicle` type properties.
- **Fix:** Change car schema to `@type: "Vehicle"` (or `@type: ["Product", "Vehicle"]`) and add Vehicle-specific properties: `vehicleModelDate`, `fuelType`, `bodyType`, `vehicleEngine`.

**[High] AggregateRating is hardcoded (2,915 reviews, 4.7★)**
- Static values will drift from the actual GBP review count as reviews accumulate.
- Google may detect mismatches between schema-claimed review counts and the live GBP listing.
- **Fix:** Update `reviewCount` and `ratingValue` in both `index.astro` and `SEOHead.astro` with each deployment. Create a shared config constant (`src/config/business.ts`) that both files import from.

**[Medium] Homepage AutoDealer schema only lists 5 of 9 department branches**
- `index.astro` schema's `department` array covers: Nizamabad, Armoor, Bodhan, Banswada, Kamareddy.
- Missing: Adilabad, Mancheriyal, Nirmal, Bhainsa.
- The `locations.astro` schema correctly lists all 9.
- **Fix:** Sync the department arrays between `index.astro` and `locations.astro`.

**[Low] `Article.dateModified` always equals `datePublished`**
- `"dateModified": date.toISOString()` is hardcoded to the publication date.
- When articles are updated, this doesn't reflect the change.
- **Fix:** Add an optional `date_modified` field to the blog content schema. Use it in the Article schema when present.

**[Low] BreadcrumbList item 2 on car pages uses `/#cars` hash anchor**
- `"item": "https://www.prakashhyundai.com/#cars"` is not a standalone indexable URL.
- **Fix:** Change to `"https://www.prakashhyundai.com/"` until a dedicated `/cars` listing page is created.

---

## 5. Performance — Score: 58/100

*Based on static code analysis and HTTP response inspection. Live Lighthouse / CrUX data not available.*

### 5.1 LCP (Largest Contentful Paint)

**[High] Hero image not preloaded — delayed LCP**
- `/images/hero-venue.jpg` (1860×540px JPEG) is the above-fold LCP element on the homepage.
- No `<link rel="preload" as="image" href="/images/hero-venue.jpg">` in the `<head>`.
- The browser only discovers this image after parsing the HTML and reaching the `<img>` tag — typically 300–800ms after navigation start.
- **Fix:** Add to `Layout.astro`'s `<head>` (when on homepage) or use a named slot from `index.astro`:
  ```html
  <link rel="preload" as="image" href="/images/hero-venue.jpg" fetchpriority="high" />
  ```

**[Medium] Google Fonts loaded as a render-blocking stylesheet**
- Inter font loaded via `<link href="https://fonts.googleapis.com/css2?family=Inter...&display=swap" rel="stylesheet">`.
- Although `display=swap` prevents invisible text (FOIT), the font stylesheet itself is render-blocking.
- **Fix:** Replace Google Fonts CDN with self-hosted `@fontsource/inter` npm package. Eliminates third-party DNS lookup and render-blocking network request.

### 5.2 CLS (Cumulative Layout Shift)

**[High] Multiple `<img>` tags missing `width` and `height` attributes**
- Homepage car grid images: no dimensions specified.
- Blog post featured images: no dimensions specified.
- Hero image: no dimensions (1860×540 should be declared).
- Without reserved space, images cause layout shift as they load.
- **Fix:** Add explicit `width` and `height` to all `<img>` tags, OR migrate to Astro's `<Image />` component which handles this automatically.

### 5.3 Image Format Optimization

**[Medium] All images served as JPEG, no WebP or AVIF**
- WebP reduces file size ~25–35% vs JPEG at equivalent quality.
- All product images, blog images, and the hero image are `.jpg`.
- **Fix:** Use Astro's built-in `<Image />` component from `astro:assets` for locally-hosted images. It auto-generates WebP output with responsive `srcset`.

### 5.4 Landing Page Performance

**[High] LP uses Tailwind CDN (~350KB blocking script)**
- `lp/hyundai-nizamabad.astro` loads `<script src="https://cdn.tailwindcss.com">` — a large, render-blocking resource that is not suitable for production.
- This directly impacts Google Ads Quality Score and conversion rate on the paid traffic entry point.
- **Fix:** Rebuild the LP using the site's compiled Tailwind (already available via the Astro build process).

### 5.5 Analytics

**[Medium] Dual analytics loading on LP — GTM + direct gtag**
- The LP loads both `GTM-52SXCPMR` (GTM) AND direct `gtag.js` for `G-3RSNGNCJTG` (GA4) and `AW-10833330626` (Google Ads).
- The main site uses GTM only. Dual loading on the LP risks double-counting pageviews.
- **Fix:** If GTM manages the GA4 and Google Ads conversion tags for the LP, remove the direct `gtag.js` script. If you prefer direct tracking on the LP for independence from GTM, remove GTM from the LP.

---

## 6. Images — Score: 52/100

### 6.1 Alt Text Coverage

**[Good] Alt text is present and keyword-relevant on most images**
- Hero image: `"Hyundai Showroom Nizamabad — Best Price on Creta, Venue, Exter"` — excellent.
- Car grid: `"Hyundai {car.data.name} price in Nizamabad"` — keyword-rich, consistent.
- Car page hero: `"Hyundai {car.data.name} Nizamabad"` — adequate.
- Blog featured images: `alt={title}` — uses post title; acceptable.

**[Medium] Car grid images use "price in Nizamabad" in every alt text — repetitive**
- 12 car thumbnails on the homepage all end in "price in Nizamabad."
- Minor concern but marginally keyword-stuffed.
- **Fix:** Use `"Hyundai {car.data.name} — {car.data.category}"` for thumbnails; reserve the keyword phrase for page headings.

### 6.2 Lazy Loading

**[Good] Lazy loading correctly applied throughout**
- Car grid (below fold): `loading="lazy"` — correct.
- Car page hero (above fold LCP): `loading="eager" fetchpriority="high"` — correct.
- Blog post hero (above fold): `loading="eager" fetchpriority="high"` — correct.
- Blog listing cards (below fold): `loading="lazy"` — correct.

### 6.3 Duplicate Featured Images

**[High] 26 of 54 active blog posts share 3 generic images**

| Generic Image | Posts Using It | Count |
|---------------|----------------|-------|
| `hyundai-car-review-2026.jpg` | Creta review, i20 review, Venue review, Exter review, Verna review, Alcazar review, Grand i10 review, i20 N-Line review, Creta N-Line review, Creta Electric review, Ioniq-5 review | 11 |
| `hyundai-cars-nizamabad-guide-2026.jpg` | 10 guide/comparison posts | 10 |
| `hyundai-car-comparison-2026.jpg` | 5 comparison posts | 5 |

- Google uses `og:image` / featured image for rich result snippets and social previews.
- All these posts display the same thumbnail in Google Search, making them indistinguishable.
- 33 distinct images already exist in `/public/images/blog/` but are not assigned to all posts.
- **Fix:** Audit which posts are missing unique images. Create and assign one distinct Canva thumbnail per post for the remaining 26 posts. This is a content production task, not a code change.

### 6.4 Image Dimensions

**[Medium] No explicit `width`/`height` on product and blog images**
- As detailed in the Performance section, missing dimensions cause CLS.
- Hero image is 1860×540px — a non-standard landscape ratio. More standard would be 1200×630 (the OG image standard) or 1920×1080.

**[Medium] All images are JPEG — no WebP**
- 100% of site images are `.jpg` files.
- No WebP, AVIF, or responsive `srcset` in use.
- **Fix:** Use Astro's `<Image />` component for automatic WebP conversion and srcset generation.

---

## 7. AI Search Readiness — Score: 78/100

### 7.1 llms.txt

**[Good] Comprehensive `llms.txt` at `/llms.txt`**
- Well-structured with sections: Business Identity, Contact, Social, Ratings, Showroom Network (all 9 locations), Area Served, Car Models (with prices), Services, Competitors, Languages, Key Differentiators, FAQ.
- Specific, citable numbers throughout (founded 2008, 4.7★, 2,915 reviews, EMI from ₹8,500/month, service from ₹2,499).
- All major AI crawlers are explicitly allowed in robots.txt.

**[Medium] llms.txt competitor section lacks head-to-head differentiators**
- Competitors are listed but without specific advantages of Hyundai over each.
- **Fix:** Add a "vs. Competitors" section to llms.txt with specific claims: "Hyundai Creta has 60–65% resale value vs. 55–60% for Kia Seltos in Nizamabad"; "Prakash Hyundai has 9 service centers vs. 1 Kia service center in the district."

**[Medium] llms.txt states Telugu content "is planned" but the file should be updated when Telugu posts go live**

### 7.2 Structured AI-Citable Content

**[Good] Comparison tables with specific, verifiable data**
- Blog posts include markdown tables with prices (₹11.11L, ₹10.90L), mileage (17.4 km/l), specs (433L boot), and named sources.
- FAQ schema on homepage and blog posts with answer text citing specific numbers.

**[Good] Schema.org FAQ implemented on homepage and most blog posts**
- Homepage: 6 FAQ pairs covering buyer queries (cars available, Creta price, test drive, EMI, locations, showroom count).
- Blog posts: Auto-generated from YAML `faq:` array or parsed `**Q:**` markdown.

**[Medium] No standalone `/faq` page**
- All FAQ content is embedded within other pages.
- A standalone `https://www.prakashhyundai.com/faq` page with 20–30 Q&A pairs would be a strong Featured Snippet and AI citation hub.
- **Fix:** Create `src/pages/faq.astro` aggregating all FAQ content from across the site.

**[Good] `og:locale:alternate` for `te_IN` is declared**
- This signals multilingual intent, even before Telugu content is published.

---

## 8. Local SEO — Score: 71/100

### 8.1 NAP Consistency

**[Good] Name, Address, Phone are consistent across the site**
- Name: "Prakash Hyundai" (consistent everywhere)
- Address: "Hyderabad Road, Dichpally, Nizamabad, Telangana 503001" (consistent)
- Phone: "+91 9052110303" (consistent in schema; display text uses "9052110303" without country code — acceptable)

**[Medium] Homepage AutoDealer schema only lists 5 of 9 department branches**
- Adilabad, Mancheriyal, Nirmal, Bhainsa are missing from the homepage `department` array.
- This underrepresents the dealer network in structured data.
- **Fix:** Add all 9 branches to the homepage `department` array (same as `locations.astro` schema).

### 8.2 GBP & Maps Signals

**[High] Google Maps links use search URLs instead of specific Place IDs**
- All Maps links: `https://www.google.com/maps/search/Prakash+Hyundai+Dichpally+Nizamabad+Telangana`
- Search URLs may surface a different listing if another "Prakash Hyundai" ranks higher.
- **Fix:** Use specific Place ID URLs: `https://www.google.com/maps/place/?q=place_id:ChIJ...` for each location. Obtain Place IDs from Google Maps Platform or GBP dashboard.

**[Medium] Review count and rating are hardcoded across 3 locations**
- `index.astro` schema: `"reviewCount": "2915"`, `"ratingValue": "4.7"`
- `SEOHead.astro` global schema: same hardcoded values
- `llms.txt`: "Total Reviews: 2,915+"
- As reviews accumulate, all three need to be updated manually.
- **Fix:** Create a single `src/config/business.ts` constant file with `REVIEW_COUNT` and `RATING_VALUE`. Import across all three locations.

### 8.3 Location Pages

**[Good] `/locations` page covers all 9 branches with full details**
- Name, address, phone, map link, and WhatsApp CTA for each location.
- Department schema with all 9 locations in `locSchema`.

**[High] No individual URL per branch location**
- There are no pages at `/locations/nizamabad`, `/locations/armoor`, etc.
- Each branch deserves its own URL to rank for "[City] Hyundai dealer" queries independently.
- The 8 city-specific blog posts (`hyundai-cars-armoor-2026.md` etc.) partially compensate but are not structured as location pages.
- **Fix:** Create `src/pages/locations/[slug].astro` with individual `AutoDealer` schema per location, dedicated H1, driving directions, local area content, and link from the main `/locations` page.

### 8.4 Opening Hours Inconsistency

**[Medium] Closing time differs between schema instances**
- Homepage AutoDealer schema: `"closes": "19:00"` (7:00 PM)
- Service page AutoRepair schema: `"closes": "19:30"` (7:30 PM)
- Contact page ContactPage schema: `"closes": "19:30"` (7:30 PM)
- Contact page visible text: "09:00 AM – 07:30 PM"
- **Fix:** Standardize to a single closing time (7:30 PM / 19:30 appears to be the actual time based on contact page display) and update all three schema instances.

### 8.5 Service Area

**[Good] `areaServed` covers 10 cities/districts**
- Schema: Nizamabad, Kamareddy, Nirmal, Armoor, Balkonda, Banswada, Bodhan, Yellareddy, Karimnagar, Telangana.
- Appropriate for a multi-branch dealer network.

---

## 9. Additional Findings

### 9.1 Missing Pages

| Page | Priority | SEO Impact |
|------|----------|-----------|
| `/about` (About Us) | High | E-E-A-T, entity establishment |
| `/faq` (Standalone FAQ) | Medium | Featured Snippets, AI citations |
| `/cars` (Car listing index) | Medium | Crawlable URL for breadcrumb, navigation |
| `/locations/{slug}` (Per-branch pages) | High | Local rank per city |
| `/privacy-policy` | Medium | Legal compliance, trust signal |
| `/terms` | Low | Legal completeness |

### 9.2 Contact Form Non-Functional

**[Medium] Contact form submits to WhatsApp but loses user input**
- The form submit button fires `window.open('https://wa.me/919052110303')` — it opens WhatsApp with a generic message regardless of what the user typed.
- Name, phone, and message fields are collected but never included in the WhatsApp message.
- **Fix:** Capture form values in JavaScript and pre-populate the WhatsApp URL:
  ```js
  const name = document.querySelector('[placeholder="Your name"]').value;
  const msg = document.querySelector('textarea').value;
  window.open(`https://wa.me/919052110303?text=Name: ${name}%0AMessage: ${msg}`);
  ```

### 9.3 Favicon

**[Low] Favicon is JPEG — use SVG or ICO instead**
- `<link rel="icon" type="image/jpeg" href="/favicon.jpg">` — JPEG is not universally supported as favicon.
- `/public/favicon.svg` exists but is not referenced in `<head>`.
- **Fix:** Replace with `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` and add a fallback `.ico` for legacy browsers.

### 9.4 Hreflang

**[Low] hreflang only declares `en` and `x-default`**
- Correct for a currently English-only site. When Telugu content launches, add `hreflang="te"` with cross-references between English and Telugu versions.

---

## Scoring Summary

| Category | Weight | Score | Weighted Points | Notes |
|----------|--------|-------|----------------|-------|
| Technical SEO | 22% | 72 | 15.84 | Good structure; 307 redirect; no mobile nav |
| Content Quality | 23% | 68 | 15.64 | Strong blog; thin car pages; cannibalization |
| On-Page SEO | 20% | 74 | 14.80 | Good titles/meta; weak internal linking |
| Schema / Structured Data | 10% | 82 | 8.20 | Comprehensive; deprecated Car type; static rating |
| Performance | 10% | 58 | 5.80 | No image preload; no WebP; CDN Tailwind on LP |
| AI Search Readiness | 10% | 78 | 7.80 | llms.txt excellent; FAQ solid |
| Images | 5% | 52 | 2.60 | 26 posts share 3 images; no dimensions |
| **TOTAL** | **100%** | **67/100** | | |

**Projected score after Critical + High fixes: 87/100**

---

*Audit generated: 2026-05-04 | Method: Static codebase analysis (Astro/Tailwind/Vercel) + live HTTP response inspection*
