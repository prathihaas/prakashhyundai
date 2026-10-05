import { defineCollection, z } from 'astro:content';

// "YYYY-MM-DD" string; an unquoted YAML date is normalised to the same form.
const isoDay = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD'),
);

// Unified Prakash Group blog schema — do not change field names.
// All new blog posts must include: title, date, category, excerpt, seo_title, seo_description.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                          // English title — H1 and JSON-LD name
    title_te: z.string().optional(),            // Telugu title shown below H1
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),   // last content update — used for dateModified                      // Accepts "YYYY-MM-DD" or YAML Date
    author: z.string().optional(),              // Byline; falls back to site name in template
    category: z.string().default('General'),    // Category pill (Buying Guide, Tips, etc.)
    tags: z.array(z.string()).optional(),       // Keyword tags for internal linking
    featured_image: z.string().optional(),      // Hero image URL
    excerpt: z.string(),                        // 120-160 chars — listing cards + OG description
    seo_title: z.string(),                      // 50-60 chars — <title> tag
    seo_description: z.string(),               // 120-160 chars — meta description
    readTime: z.string().optional(),            // e.g. "8 min read"
    draft: z.boolean().default(false),          // true = excluded from listings and sitemap
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(), // FAQ schema for rich snippets
    reviewed_by: z.string().optional(),         // Human who fact-checked the post
    reviewed_on: isoDay.optional(),             // "YYYY-MM-DD" of that fact-check
    ai_assisted: z.boolean().optional(),        // true = drafted with AI assistance
  }),
});

const carsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    price: z.string(),
    category: z.enum(['SUV', 'Sedan', 'Hatchback', 'Premium']),
    image: z.string(),
    features: z.array(z.string()),
    order: z.number().default(10),
    price_checked: isoDay.optional()  // "YYYY-MM-DD" ex-showroom price last verified
  })
});

export const collections = {
  'cars': carsCollection,
  'blog': blog,
};
