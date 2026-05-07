# SEO Action Plan — Prakash Hyundai
**Site:** https://www.prakashhyundai.com
**Updated:** 2026-05-04
**Current Score:** 67/100 | **Target Score:** 87/100

---

## Priority Legend
- **CRITICAL** — Blocks traffic, causes penalties, or actively breaks functionality. Fix immediately.
- **HIGH** — Significantly impacts rankings or user experience. Fix within 1 week.
- **MEDIUM** — Meaningful optimization opportunity. Fix within 1 month.
- **LOW** — Nice-to-have improvement. Backlog.

---

## CRITICAL Priority (Fix Immediately)

### C1 — Register or redirect `prakashhyundai.in` domain
**Category:** Technical SEO | **Effort:** 1 hour | **Impact:** High

`www.prakashhyundai.in` does not resolve (NXDOMAIN). Any Google Business Profile links, ads, or printed materials pointing to `.in` are sending users to a dead URL.

**Steps:**
1. Check all Google Business Profile listings — replace any `.in` URLs with `https://www.prakashhyundai.com`
2. Check Google Ads and Meta Ads destination URLs — replace `.in` with `.com`
3. Check all directory listings (Justdial, Sulekha, CarDekho, etc.) for `.in` references
4. Optionally: Register `prakashhyundai.in` domain and configure a 301 redirect to `www.prakashhyundai.com` via the registrar's DNS settings

---

### C2 — Fix non-www to www redirect from 307 to 301
**Category:** Technical SEO | **Effort:** 30 minutes | **Impact:** Medium

`https://prakashhyundai.com` (non-www) returns HTTP 307 Temporary Redirect instead of 301 Permanent. This loses PageRank from non-www inbound links.

**Steps:**
1. Log into Vercel dashboard → Project Settings → Domains
2. Set `www.prakashhyundai.com` as the primary domain
3. Configure `prakashhyundai.com` (non-www) with a permanent redirect (Vercel's built-in domain redirect, not relying solely on `vercel.json`)
4. Verify with `curl -I https://prakashhyundai.com` that it returns `HTTP/1.1 301 Moved Permanently`

---

### C3 — Add mobile hamburger navigation
**Category:** Technical SEO + UX | **Effort:** 2–3 hours | **Impact:** Very High

The nav is `hidden md:flex` with no mobile menu. On mobile (majority of Nizamabad traffic), users cannot access /service, /locations, /blog, or /contact from the header.

**Implementation in `src/layouts/Layout.astro`:**

```astro
---
// Add to frontmatter — no change needed
---
<!-- Replace existing header nav block with: -->
<header class="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
  <div class="container mx-auto px-6 py-4 flex justify-between items-center">
    <a href="/" class="text-[#002C5F] font-bold text-2xl tracking-tighter">
      PRAKASH<span class="font-light">HYUNDAI</span>
    </a>

    <!-- Desktop Nav (unchanged) -->
    <nav class="hidden md:flex items-center gap-8">
      {navLinks.map(link => (
        <a href={link.href} class="text-sm font-medium text-gray-600 hover:text-[#002C5F] transition-colors">
          {link.label}
        </a>
      ))}
    </nav>

    <div class="flex items-center gap-3">
      <a href="https://wa.me/919052110303?text=..." class="hidden sm:flex items-center gap-2 bg-[#002C5F] text-white px-5 py-2.5 rounded-full text-sm font-bold">
        <MessageCircle size={18} /> WhatsApp
      </a>
      <!-- Hamburger button -->
      <button id="menu-toggle" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition" aria-label="Toggle menu">
        <svg id="menu-icon-open" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu Drawer -->
  <nav id="mobile-menu" class="hidden md:hidden border-t border-gray-100 bg-white px-6 py-4">
    {navLinks.map(link => (
      <a href={link.href} class="block py-3 text-sm font-medium text-gray-700 hover:text-[#002C5F] border-b border-gray-50 last:border-0">
        {link.label}
      </a>
    ))}
    <a href="https://wa.me/919052110303" class="mt-4 flex items-center justify-center gap-2 bg-[#002C5F] text-white py-3 rounded-xl font-bold text-sm">
      WhatsApp Us
    </a>
  </nav>
</header>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  toggle?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
    iconOpen?.classList.toggle('hidden');
    iconClose?.classList.toggle('hidden');
  });
</script>
```

---

## HIGH Priority (Fix Within 1 Week)

### H1 — Preload hero image + add width/height attributes
**Category:** Performance (LCP + CLS) | **Effort:** 30 minutes | **Impact:** High

**In `src/pages/index.astro` frontmatter, add a head slot:**
```astro
---
// existing frontmatter
---
<Layout ...>
  <link rel="preload" as="image" href="/images/hero-venue.jpg" slot="head" />
  <!-- ... rest of page -->
```

**Or add directly to `Layout.astro` head when on homepage.** Alternatively, in the `<img>` tag:
```html
<img
  src="/images/hero-venue.jpg"
  width="1860"
  height="540"
  class="w-full h-auto object-cover"
  alt="Hyundai Showroom Nizamabad — Best Price on Creta, Venue, Exter"
  fetchpriority="high"
/>
```

---

### H2 — Expand car product pages from ~150 words to 600–1,000 words each
**Category:** Content Quality | **Effort:** 2–3 hours per car | **Impact:** Very High

All 12 car pages in `src/content/cars/*.md` need substantial content expansion.

**Target structure for each car page:**
```markdown
## Overview
[2–3 paragraphs about the model, its positioning, who it's for in Nizamabad]

## Variant-Wise Pricing (Ex-Showroom Nizamabad)
| Variant | Fuel | Price |
|---------|------|-------|
| E | Petrol | ₹X.XX lakh |
| S | Petrol | ₹X.XX lakh |
...

## Colour Options
[List all available colours]

## Key Reasons to Buy the [Model] in Nizamabad
- [Local road suitability]
- [Service center availability]
- [Resale value in Telangana]

## How It Compares
[Brief comparison with 1–2 top competitors]

## Finance Options
[EMI calculation examples, available banks through Prakash Hyundai]

## Frequently Asked Questions
**Q: What is the on-road price of Hyundai [Model] in Nizamabad?**
A: ...

**Q: Which variant of [Model] is best for Nizamabad?**
A: ...
```

**Priority order:** Creta → Venue → i20 → Exter → Grand i10 Nios → Verna → Alcazar → Aura → rest

---

### H3 — Fix content cannibalization: consolidate duplicate comparison posts
**Category:** Content Quality | **Effort:** 3–4 hours | **Impact:** High

**Grand i10 Nios consolidation:**
- Keep: `hyundai-grand-i10-nios-review-nizamabad.md` (review) + `hyundai-grand-i10-nios-vs-maruti-swift-tata-tiago-2026.md` (3-way comparison)
- Redirect (301) → merge: `hyundai-grand-i10-vs-maruti-swift-nizamabad-2026.md` → redirect to `hyundai-grand-i10-nios-vs-maruti-swift-tata-tiago-2026`
- Redirect (301) → merge: `hyundai-grand-i10-vs-tata-tiago-tigor-2026.md` → redirect to `hyundai-grand-i10-nios-vs-maruti-swift-tata-tiago-2026`

**i20 vs Baleno/Glanza consolidation:**
- Keep: `hyundai-i20-vs-maruti-baleno-vs-toyota-glanza-2026.md` (comprehensive 3-way)
- Redirect (301): `hyundai-i20-vs-maruti-baleno-nizamabad-2026.md` → to the 3-way comparison
- Redirect (301): `hyundai-i20-vs-toyota-glanza-maruti-baleno-2026.md` → to the 3-way comparison

**Implementation:** Add 301 redirects to `vercel.json`:
```json
{ "source": "/blog/hyundai-grand-i10-vs-maruti-swift-nizamabad-2026", "destination": "/blog/hyundai-grand-i10-nios-vs-maruti-swift-tata-tiago-2026", "permanent": true }
```

---

### H4 — Fix Google Maps links to use Place IDs
**Category:** Local SEO | **Effort:** 1 hour | **Impact:** Medium-High

Replace generic search URLs with specific Place ID links for each location.

**Steps:**
1. Open Google Maps, search each location, right-click the pin → "Share" → copy the "short URL"
2. Or use the GBP dashboard → get the "Maps URL" from each location
3. Replace search URLs in `locations.astro`, `index.astro`, and `contact.astro`

**Example replacement:**
```
BEFORE: https://www.google.com/maps/search/Prakash+Hyundai+Dichpally+Nizamabad+Telangana
AFTER:  https://www.google.com/maps/place/Prakash+Hyundai/@18.6725,78.0941,17z/data=...
```

---

### H5 — Create individual branch location pages
**Category:** Local SEO | **Effort:** 4–5 hours | **Impact:** High

Create `src/pages/locations/[slug].astro` with individual pages per branch.

**Steps:**
1. Create location data in `src/content/locations/` (9 markdown files, one per branch)
2. Create `src/pages/locations/[slug].astro` template with:
   - Individual `AutoDealer` schema with specific address, phone, hours
   - H1: "Hyundai Showroom [City] — [Phone]"
   - Driving directions from nearby landmarks
   - Link back to main `/locations` page
   - Link to car model pages
3. Update main `/locations` page to link to individual branch pages
4. Add branch pages to sitemap (should auto-include via Astro sitemap integration)

---

### H6 — Fix meta description "8 branches" → "9 showrooms"
**Category:** On-Page SEO | **Effort:** 2 minutes | **Impact:** Low (but easy fix)

In `src/pages/index.astro`, change:
```astro
description="Authorized Hyundai dealer in Nizamabad & 8 branches across North Telangana..."
```
To:
```astro
description="Authorized Hyundai dealer in Nizamabad & 9 showrooms across North Telangana..."
```

---

### H7 — Add internal linking: car pages ↔ related blog posts
**Category:** On-Page SEO | **Effort:** 3–4 hours | **Impact:** High

**Car page → blog: Add a "Related Guides" section to `src/pages/cars/[slug].astro`**

```astro
---
// In the frontmatter, after existing imports:
const allPosts = await getCollection('blog', ({ data }) => !data.draft);
const relatedPosts = allPosts
  .filter(post => post.data.tags?.some(tag => tag.toLowerCase().includes(car.data.name.toLowerCase())))
  .slice(0, 3);
---

{relatedPosts.length > 0 && (
  <section class="container mx-auto px-6 py-12">
    <h2 class="text-2xl font-bold text-[#1C1C1C] mb-6">Related Guides</h2>
    <div class="grid md:grid-cols-3 gap-6">
      {relatedPosts.map(post => (
        <a href={`/blog/${post.slug}`} class="p-5 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all block">
          <p class="text-xs font-bold text-[#00AAD2] uppercase mb-2">{post.data.category}</p>
          <h3 class="font-bold text-gray-800 leading-snug">{post.data.title}</h3>
        </a>
      ))}
    </div>
  </section>
)}
```

**Blog post → car page: Add contextual links manually when writing new blog posts.** As a guideline: every review or comparison post must include at least 1 link to the relevant `/cars/{model}` page within the article body.

---

### H8 — Standardize opening hours across all schema
**Category:** Schema / Local SEO | **Effort:** 15 minutes | **Impact:** Medium

- Homepage AutoDealer `closes` = `"19:00"` — UPDATE to `"19:30"`
- Service AutoRepair `closes` = `"19:30"` — already correct
- Contact ContactPage `closes` = `"19:30"` — already correct

**Fix in `src/pages/index.astro`:**
```js
// Change in hyRatingSchema.openingHoursSpecification:
"closes": "19:30"  // was "19:00"
```

---

### H9 — Create an About Us page
**Category:** Content Quality (E-E-A-T) | **Effort:** 3–4 hours | **Impact:** High

Create `src/pages/about.astro` with:
- H1: "About Prakash Hyundai — Authorized Dealer Since 2008"
- Founding story (2008, Nizamabad)
- Timeline of growth (showroom expansions)
- Dealer certifications and Hyundai Motor India authorization documents (or reference to them)
- Team section (names + roles of 2–3 key staff)
- Awards / recognition (Hyundai dealer awards if any)
- 4.7★ review highlight

Also update `vercel.json`:
```json
{ "source": "/about-us", "destination": "/about", "permanent": true }
```

---

### H10 — Assign unique featured images to all 26 posts sharing generic images
**Category:** Images | **Effort:** 4–6 hours (Canva work) | **Impact:** Medium-High

**Posts needing unique images (priority order):**

Posts currently using `hyundai-car-review-2026.jpg` (create dedicated review images):
- `hyundai-creta-2026-review-nizamabad.md` → `hyundai-creta-review-2026.jpg`
- `hyundai-venue-review-nizamabad-2026.md` → `hyundai-venue-review-2026.jpg`
- `hyundai-i20-2026-review-nizamabad.md` → `hyundai-i20-review-2026.jpg`
- `hyundai-exter-review-nizamabad-2026.md` → `hyundai-exter-review-2026.jpg`
- `hyundai-verna-2026-review-nizamabad.md` → `hyundai-verna-review-2026.jpg`
- `hyundai-alcazar-review-nizamabad-2026.md` → `hyundai-alcazar-review-2026.jpg`
- `hyundai-grand-i10-nios-review-nizamabad.md` → `hyundai-grand-i10-nios-review-2026.jpg`
- `hyundai-i20-n-line-review-nizamabad-2026.md` → `hyundai-i20-n-line-review-2026.jpg`
- `hyundai-creta-n-line-review-2026.md` → `hyundai-creta-n-line-review-2026.jpg`
- `hyundai-creta-electric-2026-nizamabad.md` → `hyundai-creta-electric-2026.jpg`
- `hyundai-ioniq-5-electric-nizamabad-2026.md` → `hyundai-ioniq-5-review-2026.jpg`

Posts currently using `hyundai-cars-nizamabad-guide-2026.jpg` needing unique images:
- Best family car guide → `best-family-car-nizamabad-2026.jpg`
- Best first car guide → `best-first-car-nizamabad-2026.jpg`
- Best SUV guide → `best-suv-under-20-lakh-2026.jpg`
- Car loan guide → `car-loan-guide-2026.jpg`
- Car maintenance cost → `car-maintenance-cost-2026.jpg`
- Test drive guide → `how-to-book-test-drive-2026.jpg`
- Petrol vs diesel vs CNG → `petrol-vs-diesel-vs-cng-2026.jpg`
- Prakash Hyundai trusted dealer → `prakash-hyundai-trusted-dealer-2026.jpg`
- Nizamabad car buying guide Telugu → `nizamabad-car-buying-guide-telugu-2026.jpg`
- Hyundai vs Maruti service → `hyundai-vs-maruti-service-2026.jpg`

---

## MEDIUM Priority (Fix Within 1 Month)

### M1 — Wire `featured_image` into `og:image` on blog posts
**Category:** On-Page SEO / Images | **Effort:** 15 minutes | **Impact:** Medium

In `src/pages/blog/[slug].astro`, the `<Layout>` component currently receives no `image` prop, so `og:image` defaults to the site's generic `og-image.jpg`.

**Fix:**
```astro
<Layout
  title={seo_title || `${title} | Prakash Hyundai`}
  description={seo_description || excerpt}
  canonical={postUrl}
  ogType="article"
  image={featured_image || undefined}  <!-- ADD THIS LINE -->
  noOrgSchema={true}
>
```

---

### M2 — Fix BreadcrumbList item 2 on car pages (hash anchor → real URL)
**Category:** Schema | **Effort:** 5 minutes | **Impact:** Low-Medium

In `src/pages/cars/[slug].astro`:
```js
// Change:
{ "@type": "ListItem", "position": 2, "name": "Cars", "item": "https://www.prakashhyundai.com/#cars" }
// To:
{ "@type": "ListItem", "position": 2, "name": "Cars", "item": "https://www.prakashhyundai.com/" }
```
(Or create a `/cars` listing page and use that URL.)

---

### M3 — Create a centralised business config constant
**Category:** Schema / Maintenance | **Effort:** 1 hour | **Impact:** Medium (prevents data drift)

Create `src/config/business.ts`:
```typescript
export const BUSINESS = {
  name: "Prakash Hyundai",
  url: "https://www.prakashhyundai.com",
  phone: "+91-9052110303",
  whatsapp: "919052110303",
  address: {
    street: "Hyderabad Road, Dichpally",
    city: "Nizamabad",
    region: "Telangana",
    postalCode: "503001",
    country: "IN",
  },
  geo: { lat: 18.6725, lng: 78.0941 },
  hours: { opens: "09:00", closes: "19:30", days: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] },
  rating: { value: "4.7", count: "2915", best: "5", worst: "1" },  // Update monthly
  founded: "2008",
  logo: "https://www.prakashhyundai.com/logo.png",
  ogImage: "https://www.prakashhyundai.com/og-image.jpg",
} as const;
```

Import and use in `SEOHead.astro`, `index.astro`, `llms.txt` update script.

---

### M4 — Update Car schema from deprecated `["Product", "Car"]` to `Vehicle`
**Category:** Schema | **Effort:** 30 minutes | **Impact:** Medium

In `src/pages/cars/[slug].astro`, update the schema:
```js
const carSchema = {
  "@context": "https://schema.org",
  "@type": "Vehicle",
  "@id": `${carPageUrl}#product`,
  "name": `Hyundai ${car.data.name}`,
  "brand": { "@type": "Brand", "name": "Hyundai" },
  "manufacturer": { "@type": "Organization", "name": "Hyundai Motor India" },
  "vehicleModelDate": "2026",
  "bodyType": car.data.category,  // "SUV", "Sedan", etc.
  "image": car.data.image,
  "description": carDescription,
  "url": carPageUrl,
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": numericPrice,
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "AutoDealer",
      "@id": "https://www.prakashhyundai.com/#organization",
      "name": "Prakash Hyundai"
    }
  }
};
```

---

### M5 — Create a standalone FAQ page at `/faq`
**Category:** On-Page SEO / AI Search | **Effort:** 2 hours | **Impact:** Medium

Create `src/pages/faq.astro` aggregating the most important buyer Q&A:
- Which cars are available
- Pricing for top models (Creta, Venue, i20, Exter)
- EMI and finance questions
- Home test drive process
- Service and warranty questions
- Exchange/trade-in questions
- Branch locations and hours

Include `FAQPage` schema. This page becomes a Featured Snippet target and AI citation hub.

---

### M6 — Add breadcrumb HTML navigation on car pages
**Category:** On-Page SEO | **Effort:** 30 minutes | **Impact:** Medium

Add visible breadcrumb to `src/pages/cars/[slug].astro` above the hero section:
```astro
<nav aria-label="Breadcrumb" class="container mx-auto px-6 pt-4 pb-2">
  <ol class="flex items-center gap-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
    <li><a href="/" class="hover:text-[#00AAD2] transition">Home</a></li>
    <li><span>/</span></li>
    <li><a href="/" class="hover:text-[#00AAD2] transition">Cars</a></li>
    <li><span>/</span></li>
    <li class="text-gray-600">Hyundai {car.data.name}</li>
  </ol>
</nav>
```

---

### M7 — Add `dateModified` field to blog content schema
**Category:** Schema | **Effort:** 30 minutes | **Impact:** Low-Medium

In `src/content/config.ts`, add optional field:
```typescript
date_modified: z.coerce.date().optional(),
```

In `src/pages/blog/[slug].astro`:
```js
"dateModified": (post.data.date_modified || post.data.date).toISOString(),
```

---

### M8 — Fix contact form to include user input in WhatsApp message
**Category:** UX / Conversion | **Effort:** 1 hour | **Impact:** Medium

In `src/pages/contact.astro`, replace the static `onclick`:
```html
<button type="button" id="wa-submit" class="w-full bg-[#002C5F] text-white font-bold py-4 rounded-xl hover:bg-[#001f42] transition-colors">
  Send via WhatsApp →
</button>
<script>
  document.getElementById('wa-submit').addEventListener('click', () => {
    const name = document.querySelector('input[placeholder="Your name"]').value || 'Customer';
    const phone = document.querySelector('input[type="tel"]').value || '';
    const message = document.querySelector('textarea').value || '';
    const text = `Hi Prakash Hyundai,%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}%0A[W-CONTACT]`;
    window.open(`https://wa.me/919052110303?text=${text}`, '_blank');
  });
</script>
```

---

### M9 — Add `X-Robots-Tag: noindex` header to `/lp/*` paths in vercel.json
**Category:** Technical SEO | **Effort:** 10 minutes | **Impact:** Low

In `vercel.json`, add a targeted header rule:
```json
{
  "source": "/lp/(.*)",
  "headers": [
    { "key": "X-Robots-Tag", "value": "noindex, nofollow" }
  ]
}
```

---

### M10 — Improve Locations and Contact page H1 tags
**Category:** On-Page SEO | **Effort:** 15 minutes | **Impact:** Medium

In `src/pages/locations.astro`:
```astro
<!-- Change: -->
<h1 class="text-4xl md:text-5xl font-bold mb-4">Our Showroom Locations</h1>
<!-- To: -->
<h1 class="text-4xl md:text-5xl font-bold mb-4">Hyundai Showrooms Near You — Nizamabad, Armoor, Bodhan & More</h1>
```

In `src/pages/contact.astro`:
```astro
<!-- Change: -->
<h1 class="text-5xl font-bold text-[#1C1C1C] mb-6">Contact Us</h1>
<!-- To: -->
<h1 class="text-5xl font-bold text-[#1C1C1C] mb-6">Contact Prakash Hyundai Nizamabad</h1>
```

---

### M11 — Self-host Google Fonts (Inter)
**Category:** Performance | **Effort:** 1 hour | **Impact:** Medium

```bash
npm install @fontsource/inter
```

In `src/layouts/Layout.astro`:
```astro
---
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
---
<!-- Remove the Google Fonts <link> tags from <head> -->
```

---

### M12 — Add WebP images via Astro's Image component
**Category:** Performance / Images | **Effort:** 2–3 hours | **Impact:** Medium

For locally-stored images, replace `<img>` with Astro's `<Image />`:
```astro
---
import { Image } from 'astro:assets';
import heroVenue from '../../public/images/hero-venue.jpg';
---
<Image
  src={heroVenue}
  alt="Hyundai Showroom Nizamabad — Best Price on Creta, Venue, Exter"
  width={1860}
  height={540}
  format="webp"
  quality={85}
  fetchpriority="high"
  class="w-full h-auto object-cover"
/>
```

Note: Astro's `<Image />` component only works with imports or `astro:assets`, not string URL paths from content frontmatter. For dynamic images from content collections, use the `inferSize` option.

---

### M13 — Add max-length validation to `seo_description` in content schema
**Category:** Content Quality | **Effort:** 5 minutes | **Impact:** Low

In `src/content/config.ts`:
```typescript
seo_description: z.string().max(160, "seo_description must be 160 characters or less"),
```

---

### M14 — Add blog post H2 tags for listing page (h3 → h2)
**Category:** On-Page SEO | **Effort:** 5 minutes | **Impact:** Low

In `src/pages/blog/index.astro`, change:
```astro
<h3 class="text-xl font-bold mb-3 ...">{post.data.title}</h3>
```
To:
```astro
<h2 class="text-xl font-bold mb-3 ...">{post.data.title}</h2>
```

---

### M15 — Add all 9 branches to homepage AutoDealer department schema
**Category:** Schema / Local SEO | **Effort:** 15 minutes | **Impact:** Medium

In `src/pages/index.astro`, add the 4 missing branches (Adilabad, Mancheriyal, Nirmal, Bhainsa) to the `hyRatingSchema.department` array.

---

## LOW Priority (Backlog)

### L1 — Fix favicon from JPEG to SVG
**Category:** Technical | **Effort:** 5 minutes

In `src/layouts/Layout.astro`, replace:
```html
<link rel="icon" type="image/jpeg" href="/favicon.jpg" />
```
With:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" /><!-- legacy fallback -->
```

---

### L2 — Add image sitemap entries to sitemap-0.xml
**Category:** Technical SEO | **Effort:** 2–3 hours | **Impact:** Low-Medium

Extend the `sitemap()` integration in `astro.config.mjs` to include `<image:image>` entries for car pages using their product images. This helps car images appear in Google Images search.

---

### L3 — Publish Telugu content for top 5 buying guides
**Category:** Content | **Effort:** 5–10 hours | **Impact:** Medium

Create Telugu versions of:
1. Hyundai Creta price guide (తెలుగు)
2. Best car under ₹15 lakh guide
3. Car loan/finance guide
4. About Prakash Hyundai (dealer trust post)
5. Test drive booking guide

---

### L4 — Add named author pages for blog post bylines
**Category:** E-E-A-T | **Effort:** 2–3 hours | **Impact:** Medium

Create `/author/{name}` pages for 2–3 staff members who will be assigned as blog post authors. Each page should include role, expertise, and links to authored posts.

---

### L5 — Add `X-Robots-Tag` to image-only URLs (low priority)
**Category:** Technical SEO | **Effort:** 15 minutes

Ensure `/og-image.*` and `/logo.*` are not wasting crawl budget by adding `X-Robots-Tag: noindex` for known non-page static assets if needed.

---

### L6 — Update llms.txt with per-competitor differentiators
**Category:** AI Search | **Effort:** 1 hour

Add a "vs. Competitors" section to `public/llms.txt` with specific head-to-head facts:
- Hyundai vs Maruti: service cost comparison
- Hyundai vs Kia: service center density in Nizamabad district
- Hyundai vs Tata: resale value data for Telangana

---

### L7 — Create a `/privacy-policy` page
**Category:** Legal / Trust | **Effort:** 1 hour

Basic privacy policy page for WhatsApp communication data, Google Analytics, and cookie usage. Linked from footer.

---

## Implementation Roadmap

| Week | Tasks |
|------|-------|
| Week 1 (Immediate) | C1, C2, C3, H6, H8, M2, M9 |
| Week 2 | H1, H3, H5, H7 (car → blog links), M1 |
| Week 3 | H2 (expand Creta, Venue, i20, Exter car pages), H4 |
| Week 4 | H2 (remaining car pages), H9, H10 (images) |
| Month 2 | M3, M4, M5, M6, M7, M8, M10, M11, M12, M13, M14, M15 |
| Month 3 | L1–L7 |

---

## Expected Score Improvement

| Phase | Tasks Completed | Projected Score |
|-------|----------------|----------------|
| Current | — | 67/100 |
| After Week 1 | C1–C3, H6, H8, M2 | 71/100 |
| After Week 2–3 | + H1, H2 (partial), H3, H5, H7 | 78/100 |
| After Month 1 | All Critical + High | 82/100 |
| After Month 2 | All Critical + High + Medium | 87/100 |

---

*Action plan generated: 2026-05-04*
