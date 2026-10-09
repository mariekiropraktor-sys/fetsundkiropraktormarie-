import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blogginnleggene ligger som Markdown i src/content/blogg/.
// Filnavnet er adressen: hvorfor-blir-jeg-svimmel.md → /hvorfor-blir-jeg-svimmel/
const blogg = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blogg" }),
  schema: z.object({
    title: z.string(),
    seoTittel: z.string().optional(), // kortere tittel for Google (maks ca. 60 tegn), ellers brukes title
    description: z.string().default(""),
    date: z.coerce.date(),
    tema: z.enum(["svimmelhet", "nakke-og-hode", "rygg-og-ledd"]),
    image: z.string().optional(),
    bildeTekst: z.string().optional(), // liten tekst under toppbildet, f.eks. «Illustrasjonen er laget med KI.»
    kortFortalt: z.array(z.string()).default([]), // 3–4 punkter øverst i innlegget
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
    kortFortalt: z.array(z.string()).default([]), // 3–4 punkter øverst på siden
    kjennetegn: z.array(z.string()).default([]), // «Kjenner du deg igjen?»-listen
    faq: z.array(z.object({ sporsmal: z.string(), svar: z.string() })).default([]),
    kilder: z.array(z.object({ tekst: z.string(), lenke: z.string().optional() })).default([]),
    oppdatert: z.coerce.date(),
  }),
});

// Sider om behandlingsmetoder som ikke finnes på klinikksiden:
// src/content/behandlingsmetode/<adresse>.md → /behandlingsmetode/<adresse>/
const behandlingsmetode = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/behandlingsmetode" }),
  schema: z.object({
    tittel: z.string(), // overskriften på siden
    seoTittel: z.string(), // tittelen Google viser
    beskrivelse: z.string(), // teksten Google viser under tittelen
    ingress: z.string(), // første avsnitt øverst på siden
    kortTekst: z.string(), // kort tekst på kortene under «Andre metoder»
    rekkefolge: z.number().default(10),
    kortFortalt: z.array(z.string()).default([]), // 3–4 punkter øverst på siden
    brukesVed: z.array(z.string()).default([]), // «Brukes ofte ved»-listen i toppen
    faq: z.array(z.object({ sporsmal: z.string(), svar: z.string() })).default([]),
    kilder: z.array(z.object({ tekst: z.string(), lenke: z.string().optional() })).default([]),
    oppdatert: z.coerce.date(),
  }),
});

// Interessefeltene etter svimmelhet: hodepine og kjeve. Én fil per side:
// src/content/fagomrade/hodepine.md → /hodepine/, kjevesmerter.md → /kjevesmerter/
// (sidene ligger i src/pages/<adresse>/index.astro og bruker komponenten Fagomrade.astro)
const fagomrade = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/fagomrade" }),
  schema: z.object({
    tittel: z.string(),
    seoTittel: z.string(),
    beskrivelse: z.string(),
    ingress: z.string(),
    bilde: z.string().optional(),
    bildeTekst: z.string().optional(),
    kortFortalt: z.array(z.string()).default([]),
    kjennetegn: z.array(z.string()).default([]), // «Kjenner du deg igjen?»-listen
    typerTittel: z.string(), // overskrift over kortene, f.eks. «Typer hodepine»
    typer: z.array(z.object({ navn: z.string(), tekst: z.string(), lenke: z.string().optional() })).default([]),
    innlegg: z.array(z.string()).default([]), // blogginnlegg som vises nederst (filnavn uten .md)
    faq: z.array(z.object({ sporsmal: z.string(), svar: z.string() })).default([]),
    kilder: z.array(z.object({ tekst: z.string(), lenke: z.string().optional() })).default([]),
    oppdatert: z.coerce.date(),
  }),
});

export const collections = { blogg, svimmelhet, behandlingsmetode, fagomrade };
