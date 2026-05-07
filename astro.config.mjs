import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// Static lastmod dates per content category — prevents crawl budget waste from dynamic new Date()
const LASTMOD = {
  home:      "2026-05-01",
  blog:      "2026-05-01",
  blogPost:  "2026-04-15",
  car:       "2026-04-01",
  locations: "2026-03-01",
  contact:   "2026-01-01",
  service:   "2026-03-01",
  default:   "2026-03-01",
};

export default defineConfig({
  site: "https://www.prakashhyundai.com",
  trailingSlash: "never",
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/lp/'),
      serialize: (item) => {
        const url = item.url;

        if (url === 'https://www.prakashhyundai.com/' || url === 'https://www.prakashhyundai.com') {
          return { ...item, priority: 1.0, changefreq: 'daily', lastmod: LASTMOD.home };
        }
        if (url.endsWith('/blog') || url.endsWith('/blog/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly', lastmod: LASTMOD.blog };
        }
        if (url.includes('/blog/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly', lastmod: LASTMOD.blogPost };
        }
        if (url.includes('/cars/') || url.includes('/products/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly', lastmod: LASTMOD.car };
        }
        if (url.includes('/service')) {
          return { ...item, priority: 0.7, changefreq: 'monthly', lastmod: LASTMOD.service };
        }
        if (url.includes('/locations') || url.includes('/branches')) {
          return { ...item, priority: 0.7, changefreq: 'monthly', lastmod: LASTMOD.locations };
        }
        if (url.includes('/contact')) {
          return { ...item, priority: 0.6, changefreq: 'yearly', lastmod: LASTMOD.contact };
        }
        return { ...item, priority: 0.6, changefreq: 'monthly', lastmod: LASTMOD.default };
      },
    }),
    react(),
  ],
});
