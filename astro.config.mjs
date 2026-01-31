import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [
    tailwind({
        applyBaseStyles: true,
    }), 
    react()
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "te", "hi"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});