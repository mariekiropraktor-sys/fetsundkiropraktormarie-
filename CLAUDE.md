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
  behandlingsmetoder (unntak: hodepine og kjeve har egne sider her). Kortene for «Muskel- og leddplager» og «Slik behandler
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
├── content/svimmelhet/ # fagsider: nakkesvimmelhet, vestibulær migrene, PPPD → /svimmelhet/<navn>/
├── content/fagomrade/  # hodepine.md → /hodepine/, kjevesmerter.md → /kjevesmerter/ (mal: components/Fagomrade.astro)
├── content/behandlingsmetode/ # traksjon, kinesiotape, aktiv release-tøying → /behandlingsmetode/<navn>/
├── components/         # Header (med hamburgermeny), Footer, TrustStrip, BookingCTA, PostCard
├── layouts/Layout.astro
├── pages/              # én mappe per side; [slug].astro = blogginnlegg på rot-nivå
└── styles/global.css   # farger, knapper, kort, artikkeltekst
src/components/Kart.astro  # Google-kart som lastes først ved klikk (personvern)
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

## Behandlingsmetoder (besluttet 9. okt. 2026)
- Metoder med egen side på klinikksiden lenker dit. Traksjon, kinesiotape og aktiv release-tøying har egne sider her: src/content/behandlingsmetode/ → /behandlingsmetode/<navn>/.
- Merkelappene under «Jeg bruker også» på forsiden styres fra `andreMetoder` i src/data/site.ts.

## Hodepine og kjeve (besluttet 9. okt. 2026)
- Maries interessefelt nest etter svimmelhet. Egne fagsider /hodepine/ og /kjevesmerter/ her, ikke lenker til klinikksiden.
- Forsidekortene Kjeve og Hodepine lenker hit (merket «Interessefelt»). Gamle /behandlingsomrade/hodepine/ og /behandlingsomrade/kjevesmerter/ videresendes hit.

## Gjenstår
- Sanity-oppsett (prosjekt-ID fra Marie). Fagsidene i content/svimmelhet/ skal bli Sanity-typen «svimmelhetsside» (samme feltnavn).
- Alle innlegg er skrevet om (4. okt. 2026). Risikotabellen i «Krystallsyke hos eldre» er faktasjekket og skrevet om (5. okt. 2026).
- Kurs på Om Marie-siden er lagt inn (4. okt. 2026). Mangler eksakt år for Neuroseminars og Klinikk for Alle (står «ca. 2018–2019").

## Personvern (besluttet 4. okt. 2026)
- Ingen Google Fonts-lenker: skriftene kommer fra @fontsource-variable (Fraunces, Outfit).
- Google Maps kun via `Kart.astro` (lastes ved klikk). YouTube kun via youtube-nocookie.com.
- Bloggbilder ligger i `public/bilder/blogg/`. Ikke lenk til bilder på andre nettsider.

## Svimmelhetssider (besluttet 4. okt. 2026)
- Innleggene om nakkesvimmelhet og vestibulær migrene er flyttet til /svimmelhet/nakkesvimmelhet/ og /svimmelhet/vestibulaer-migrene/ med 301 fra gamle adresser.
- «Svimmel eller ustø?» blir værende som blogginnlegg (oversikt).

## Blogg vs. klinikksiden (besluttet 4. okt. 2026)
- Seks innlegg om vanlige plager var ordrette kopier av fetsundkiropraktor.no. De er fjernet herfra og videresendes (301) til samme adresse på klinikksiden.
- «Hvorfor blir jeg svimmel?» og «Stresshodepine, svimmelhet og kjevesmerter» er skrevet om (jeg-form) så de ikke er like klinikksidens versjoner.
- Nye innlegg her skal handle om svimmelhet, hodepine og kjeve (Maries interessefelt), vinklet mot svimmelhet der det passer; generelle plager hører hjemme på klinikksiden.
- Utkast: sett `utkast: true` i blogginnlegget. Siden bygges med noindex og et «Utkast»-merke, men vises ikke i lister eller sitemap. Fjern linjen for å publisere.
- Planlagte innlegg: svimmel når du reiser deg/våkner, svimmelhet etter hjernerystelse/nakkesleng, svimmel i overgangsalderen, migrene vs. spenningshodepine (med svimmelhetsvinkling), hva skjer på en svimmelhetsundersøkelse.

## Tekst i bilder (besluttet 4. okt. 2026)
- Ikke bruk bilder med tekst i innlegg. Bruk HTML-boksene fra global.css i Markdown:
  `<div class="boks">` (turkis, med ryggrad), `boks--advarsel` (oransje), `boks--kilder` (hvit),
  `<ul class="sjekk">` (haker), `<p class="boks__tittel">`, og `<table class="sammenligning">`.
- Fast fargekode (maks 2–3 bokser per innlegg): turkis `boks` = sjekkliste/kjenner du deg igjen,
  oransje `boks--advarsel` = når kontakte lege, hvit med turkis kant `boks--rad` = gjør selv/øvelser,
  hvit `boks--kilder` = kilder, `boks--bestill` = liten bestillingsboks (lenker til /bestill/).
- «Kort fortalt»: frontmatter-feltet `kortFortalt` (3–4 punkter) vises øverst automatisk.
- Uthevet sitat: `> tekst` i Markdown. /bestill/ videresender til site.booking.
