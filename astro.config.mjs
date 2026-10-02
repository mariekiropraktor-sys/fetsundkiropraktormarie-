import { defineConfig } from "astro/config";

// Ekte HTTP 301-videresendinger ligger i vercel.json (Vercels egen mekanisme).
export default defineConfig({
  site: "https://fetsundkiropraktormarie.no",
  trailingSlash: "always",
  build: { format: "directory" },
});
