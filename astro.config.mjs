import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://www.prakashhyundai.com",
  integrations: [
    tailwind(),
        sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => {
        const url = item.url;
        const now = new Date().toISOString();

        // Homepage — crawl daily, maximum priority
        if (url === 'https://www.prakashhyundai.com/' || url === 'https://www.prakashhyundai.com') {
          return { ...item, priority: 1.0, changefreq: 'daily', lastmod: now };
        }
        // Blog listing page — crawl weekly (new posts land here)
        if (url.endsWith('/blog') || url.endsWith('/blog/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly', lastmod: now };
        }
        // Individual blog posts — high value, crawl weekly
        if (url.includes('/blog/')) {
          return { ...item, priority: 0.8, changefreq: 'weekly', lastmod: now };
        }
        // Product / car / service pages — important but stable
        if (url.includes('/products/') || url.includes('/cars/') || url.includes('/services/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly', lastmod: now };
        }
        // Locations / branches — useful for local SEO
        if (url.includes('/locations') || url.includes('/branches')) {
          return { ...item, priority: 0.7, changefreq: 'monthly', lastmod: now };
        }
        // Contact page — static, low change frequency
        if (url.includes('/contact')) {
          return { ...item, priority: 0.6, changefreq: 'yearly', lastmod: now };
        }
        // All other pages — moderate priority
        return { ...item, priority: 0.6, changefreq: 'monthly', lastmod: now };
      },
    }),
    react(),
  ],
});
