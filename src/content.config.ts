import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blogginnleggene ligger som Markdown i src/content/blogg/.
// Filnavnet er adressen: hvorfor-blir-jeg-svimmel.md → /hvorfor-blir-jeg-svimmel/
const blogg = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blogg" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    date: z.coerce.date(),
    tema: z.enum(["svimmelhet", "nakke-og-hode", "rygg-og-ledd"]),
    image: z.string().optional(),
    forfatter: z.string().default("Marie Hermansen"),
  }),
});

export const collections = { blogg };
