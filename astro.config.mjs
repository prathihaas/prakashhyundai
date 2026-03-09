import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://www.prakashhyundai.com",
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => Boolean(page),
      serialize: (item) => item,
    }),
    react(),
  ],
});
