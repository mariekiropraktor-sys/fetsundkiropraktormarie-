import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Ekte HTTP 301-videresendinger ligger i vercel.json (Vercels egen mekanisme).
export default defineConfig({
  site: "https://fetsundkiropraktormarie.no",
  trailingSlash: "always",
  build: { format: "directory" },
  // Lager sitemap-index.xml automatisk (404-siden tas ikke med)
  integrations: [sitemap({ filter: (side) => !side.includes("/404") })],
});
