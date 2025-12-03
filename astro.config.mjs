// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "ua"],
    routing: {
      prefixDefaultLocale: true,
    },
    fallback: {
      es: "en",
      ua: "en",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
