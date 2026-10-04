// Fakta som brukes mange steder på siden. Endres her, så oppdateres alt.

export const site = {
  navn: "Kiropraktor Marie Hermansen",
  klinikk: "Fetsund Kiropraktorsenter",
  adresse: "Garderbakken 1, 1900 Fetsund",
  telefon: "463 32 766",
  telefonLenke: "tel:+4746332766",
  booking:
    "https://psno-patient-platform-fe.svc.pasientsky.no/embedded/planner/booking?serviceProviderId=54907264-049e-11eb-8fc8-26c6f94d64b7",
  apningstider: [
    { dager: "Mandag, onsdag, fredag", tid: "08.00–15.00" },
    { dager: "Tirsdag, torsdag", tid: "10.00–17.00" },
  ],
  apningstiderKort: "Man, ons, fre 08–15 · Tir, tor 10–17",
  google: {
    vurdering: "4,9",
    antall: 9,
    lenke: "https://www.google.com/maps/place/?q=place_id:ChIJAY8EPNG-2mYR_n2JnITzxAE",
  },
  facebook: "https://www.facebook.com/www.kiropraktor.marie.no/",
  instagram: "https://www.instagram.com/fetsundkiropraktorsenter/",
  klinikkside: "https://fetsundkiropraktor.no/",
  krystallsykehjelpen: "https://www.krystallsykehjelpen.no/",
};

// Klinikksiden eier de generelle plagene og metodene (se kartleggingen).
const k = "https://fetsundkiropraktor.no";
export const plager = [
  { navn: "Nakke", tekst: "Låst, stiv eller vond", lenke: `${k}/behandlingsomrade/akutte-kroniske-nakkeplager/` },
  { navn: "Hodepine", tekst: "Spenning og stress", lenke: `${k}/behandlingsomrade/hodepine/` },
  { navn: "Kjeve", tekst: "Smerter og klikking", lenke: `${k}/behandlingsomrade/kjevesmerter/` },
  { navn: "Korsrygg", tekst: "Akutt og langvarig", lenke: `${k}/behandlingsomrade/vondt-i-ryggen/` },
  { navn: "Skulder", tekst: "Smerter og nedsatt bevegelse", lenke: `${k}/behandlingsomrade/muskelsmerter/` },
  { navn: "Hofte og kne", tekst: "Også senebetennelser", lenke: `${k}/behandlingsomrade/kne-og-ankel-fotsmerter/` },
];

export const metoder = [
  {
    navn: "Kiropraktisk manipulasjon",
    tekst: "Klassisk leddbehandling som frigjør låste ledd i rygg og nakke.",
    lenke: `${k}/behandlingsmetode/kiropraktisk-manipulasjonsbehandling/`,
  },
  {
    navn: "Nålebehandling",
    tekst: "Tørrnåling av muskelknuter når massasje ikke er nok.",
    lenke: `${k}/behandlingsmetode/nalebehandling/`,
  },
  {
    navn: "Funksjonell muskeltesting",
    tekst: "Finner muskler som ikke samarbeider, og hvorfor smerten oppstår.",
    lenke: `${k}/behandlingsmetode/funksjonell-muskeltesting/`,
  },
  {
    navn: "Øvelser og veiledning",
    tekst: "Tilpassede øvelser og råd du kan følge opp hjemme.",
    lenke: `${k}/behandlingsmetode/ovelsesveiledning/`,
  },
];

export const andreMetoder = [
  "Triggerpunktbehandling",
  "Mobilisering",
  "Bindevevsmassasje",
  "Traksjon",
  "Kinesiotape",
  "Aktiv release-tøying",
  "Reposisjonering ved krystallsyke",
  "Vestibulær rehabilitering",
];

export const svimmelhetstyper = [
  { navn: "Krystallsyke", tekst: "Snurr når du snur deg i senga eller ser opp", lenke: "/krystallsyke/" },
  { navn: "Nakkesvimmelhet", tekst: "Gynging sammen med stiv og vond nakke", lenke: "/svimmelhet/nakkesvimmelhet/" },
  { navn: "Vestibulær migrene", tekst: "Anfall av svimmelhet, med eller uten hodepine", lenke: "/svimmelhet/vestibulaer-migrene/" },
  { navn: "PPPD", tekst: "Vedvarende gynging som blir verre i butikker og travle steder", lenke: "/svimmelhet/pppd/" },
];

// Priser i to grupper: vanlige muskel- og leddplager, og svimmelhet (egne priser)
export const priser = [
  {
    gruppe: "Muskel- og leddplager",
    intro: "Nakke, rygg, hodepine, kjeve, skulder, hofte og andre muskel- og leddplager.",
    timer: [
      { navn: "Førstegangskonsultasjon", pris: "910 kr", tekst: "For deg som er ny pasient og aldri har vært hos oss før." },
      { navn: "Oppfølgende behandling", pris: "580 kr", tekst: "Har du vært hos oss de siste 12 månedene med lignende plager. 20 minutter." },
      { navn: "Dobbelttime", pris: "810 kr", tekst: "For tidligere pasienter som trenger ekstra tid. Avtales med kiropraktoren." },
    ],
  },
  {
    gruppe: "Svimmelhet",
    intro: "Svimmelhet har egne priser, fordi undersøkelsen og behandlingen tar mer tid og inkluderer VNG-briller.",
    timer: [
      { navn: "Svimmelhetsundersøkelse", pris: "1 100 kr", tekst: "Grundig undersøkelse ved svimmelhet, ustøhet eller balanseplager, med VNG-briller og en plan for videre behandling." },
      { navn: "Oppfølgende behandling – svimmelhet", pris: "625 kr", tekst: "Oppfølging etter svimmelhetsundersøkelse. 20 minutter." },
      { navn: "Dobbelttime – svimmelhet", pris: "855 kr", tekst: "Når svimmelheten trenger ekstra tid. Avtales med kiropraktoren." },
    ],
  },
];

export const tilleggspris = { tekst: "Nålebehandling og kinesiotape", pris: "45 kr" };

export const navigasjon = [
  { navn: "Svimmelhet", lenke: "/svimmelhet/" },
  { navn: "Andre plager", lenke: "/#plager" },
  { navn: "Behandling", lenke: "/#behandling" },
  { navn: "Om Marie", lenke: "/om-marie-hermansen/" },
  { navn: "Priser", lenke: "/priser/" },
  { navn: "Blogg", lenke: "/blogg/" },
  { navn: "Kontakt", lenke: "/kontakt-oss/" },
];

export const temaNavn: Record<string, string> = {
  svimmelhet: "Svimmelhet",
  "nakke-og-hode": "Nakke og hode",
  "rygg-og-ledd": "Rygg og ledd",
};
