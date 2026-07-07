import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
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
});
