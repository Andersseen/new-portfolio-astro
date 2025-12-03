// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import { dirname } from "path";

import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    resolve: {
      alias: {
        "@componentes": `${__dirname}/src/components`,
        "@i18n": `${__dirname}/src/i18n`,
        "@layouts": `${__dirname}/src/layouts`,
        "@pages": `${__dirname}/src/pages`,
        "@styles": `${__dirname}/src/styles`,
        "@scripts": `${__dirname}/src/scripts`,
        "@assets": `${__dirname}/src/assets`,
        "@": `${__dirname}/src`,
      },
    },
  },
});
