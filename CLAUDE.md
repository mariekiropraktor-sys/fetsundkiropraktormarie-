# fetsundkiropraktormarie.no — prosjektkontekst

## Om prosjektet
Nettsiden til kiropraktor Marie Hermansen, eier og gründer av Fetsund
Kiropraktorsenter. Flyttet fra WordPress/Bricks til Astro på Vercel høsten 2026.
Marie er nybegynner innen webutvikling: forklar endringer enkelt, på norsk, og
gjerne som en kort liste over hva som er endret.

Språk: all UI-tekst og kodekommentarer på **norsk (bokmål)**.

## Rollefordeling mellom Maries tre nettsider (besluttet 2. okt. 2026)
- **fetsundkiropraktormarie.no (denne)**: Marie som kiropraktor, svimmelhet som
  spesialfelt (samleside, nakkesvimmelhet, vestibulær migrene, PPPD), kort side
  om krystallsyke hos Marie, Om Marie, Priser, Kontakt, blogg.
- **Krystallsykehjelpen**: eier krystallsyke i dybden (øvelser, video). Denne
  siden lenker dit, ikke omvendt.
- **fetsundkiropraktor.no (klinikksiden)**: generelle plager og
  behandlingsmetoder. Kortene for «Muskel- og leddplager» og «Slik behandler
  jeg» lenker dit. Ikke kopier klinikksidens tekster hit (dobbelt innhold).

## Tech stack
- **Astro 5**, statisk build, ingen SSR-adapter
- **Vercel**, automatisk deploy ved push til `main`
- Booking via ekstern **Pasientsky**-lenke (se `src/data/site.ts`)
- Blogginnlegg som Markdown i `src/content/blogg/` (importert fra WordPress med
  `scripts/import-wordpress.mjs`). Planlagt: flytte innholdet til **Sanity**.

## Struktur
```
src/
├── data/site.ts        # telefon, adresse, åpningstider, priser, navigasjon m.m.
├── content/blogg/      # blogginnlegg (filnavn = adresse)
├── components/         # Header (med hamburgermeny), Footer, TrustStrip, BookingCTA, PostCard
├── layouts/Layout.astro
├── pages/              # én mappe per side; [slug].astro = blogginnlegg på rot-nivå
└── styles/global.css   # farger, knapper, kort, artikkeltekst
vercel.json             # 301-videresendinger fra gamle WordPress-adresser
```

## Design
Fra designlerretet «Valgt retning» (kombinasjon av forslag A og B).
- Farger: `--ink` #101923, `--bg` #eef2f7, `--teal` #0b6e81 (knapper/lenker),
  `--teal-bright` #18bad3 (logoens turkis, kun på mørk bakgrunn)
- Fonter: Fraunces (overskrifter), Outfit (brødtekst)
- Bilder i `public/bilder/`

## Viktige arbeidsvaner
- Fakta (telefon, åpningstider, priser) endres kun i `src/data/site.ts`.
- Blogginnlegg ligger på rot-nivå (`/hvorfor-blir-jeg-svimmel/`) for å beholde
  gamle adresser. Ikke flytt dem under /blogg/.
- Gamle adresser som fjernes skal få en 301 i `vercel.json`.
- Kjør `npm run build` før push.

## Gjenstår
- Bildene i blogginnleggene hentes fortsatt fra den gamle WordPress-siden
  (fetsundkiropraktormarie.no/wp-content/…). De må lastes ned og legges i
  prosjektet før domenet flyttes og WordPress-hostingen avsluttes.
- Sanity-oppsett (prosjekt-ID fra Marie).
- Kurs på Om Marie-siden er lagt inn (4. okt. 2026). Mangler eksakt år for Neuroseminars og Klinikk for Alle (står «ca. 2018–2019").
- Tilleggsprisen for nål/tape/VNG (stod «45 kr» på gammel side – bekreft).
