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
    // utkast: true = siden bygges (så Marie kan lese den), men vises ikke i lister,
    // sitemap eller hos Google før den settes til false
    utkast: z.boolean().default(false),
  }),
});

// Faste fagsider om svimmelhet: src/content/svimmelhet/<adresse>.md → /svimmelhet/<adresse>/
// Feltene er valgt slik at de kan flyttes 1:1 til et Sanity-skjema («svimmelhetsside»).
const svimmelhet = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/svimmelhet" }),
  schema: z.object({
    tittel: z.string(), // overskriften på siden
    seoTittel: z.string(), // tittelen Google viser
    beskrivelse: z.string(), // teksten Google viser under tittelen
    ingress: z.string(), // første avsnitt øverst på siden
    kortTekst: z.string(), // kort tekst på kortet på svimmelhetssiden
    rekkefolge: z.number().default(10),
    bilde: z.string().optional(),
    bildeTekst: z.string().optional(),
    kjennetegn: z.array(z.string()).default([]), // «Kjenner du deg igjen?»-listen
    faq: z.array(z.object({ sporsmal: z.string(), svar: z.string() })).default([]),
    kilder: z.array(z.object({ tekst: z.string(), lenke: z.string().optional() })).default([]),
    oppdatert: z.coerce.date(),
  }),
});

export const collections = { blogg, svimmelhet };
