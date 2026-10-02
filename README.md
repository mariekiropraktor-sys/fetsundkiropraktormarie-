# fetsundkiropraktormarie.no

Nettsiden til kiropraktor Marie Hermansen, Fetsund Kiropraktorsenter.

Bygget med [Astro](https://astro.build) og publisert på Vercel. Hver gang noe
pushes til `main`, bygges og publiseres siden automatisk.

## Kjøre lokalt

```bash
npm install
npm run dev
```

Åpne http://localhost:4321.

## Endre vanlige ting

- **Telefon, åpningstider, priser, menyen:** `src/data/site.ts`
- **Blogginnlegg:** `src/content/blogg/` (én Markdown-fil per innlegg)
- **Videresendinger fra gamle adresser:** `vercel.json`
