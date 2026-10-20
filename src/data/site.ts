// Fakta som brukes mange steder på siden. Endres her, så oppdateres alt.

const pasientsky =
  "https://psno-patient-platform-fe.svc.pasientsky.no/embedded/planner/booking?serviceProviderId=54907264-049e-11eb-8fc8-26c6f94d64b7";
const kalender = "8b02aa62-04b5-11eb-98d4-56c227606b2b"; // Maries kalender

export const site = {
  navn: "Kiropraktor Marie Hermansen",
  klinikk: "Fetsund Kiropraktorsenter",
  adresse: "Garderbakken 1, 1900 Fetsund",
  telefon: "463 32 766",
  telefonLenke: "tel:+4746332766",
  // Timebestilling rett i Maries egen kalender i Pasientsky (ikke klinikkens felles oversikt)
  booking: `${pasientsky}&timeslotType=4d6f6546-0875-11eb-8cb2-367c89629524&calendarId=${kalender}`, // førstegangsundersøkelse
  bookingSvimmelhet: `${pasientsky}&timeslotType=d2162c00-a508-11f0-9831-e62cb3f7a407&calendarId=${kalender}`, // førstegangsundersøkelse svimmelhet
  bookingOppfolging: `${pasientsky}&timeslotType=6accef46-04b5-11eb-9a4f-ee3259d83450&calendarId=${kalender}`, // oppfølgende behandling
  bookingKalender: `${pasientsky}&calendarId=${kalender}`, // alle timetyper i Maries kalender
  apningstider: [
    { dager: "Mandag, onsdag, fredag", tid: "08.00–15.00" },
    { dager: "Tirsdag, torsdag", tid: "10.00–17.00" },
  ],
  apningstiderKort: "Man, ons, fre 08–15 · Tir, tor 10–17",
  parkering: "Gratis parkering rett ved klinikken, kort vei fra bussen.",
  // Stedsnavn pasientene kommer fra. Brukes på forsiden, kontaktsiden og i strukturerte data (lokal SEO).
  naeromrader: ["Fetsund", "Sørumsand", "Lillestrøm", "Blaker", "Rælingen", "Nes"],
  google: {
    vurdering: "4,9",
    antall: 10,
    lenke: "https://www.google.com/maps/place/?q=place_id:ChIJAY8EPNG-2mYR_n2JnITzxAE",
  },
  legelisten: {
    vurdering: "5,0",
    antall: 14,
    lenke: "https://www.legelisten.no/behandlere/17726-marie-hermansen/kiropraktor",
  },
  facebook: "https://www.facebook.com/www.kiropraktor.marie.no/",
  instagram: "https://www.instagram.com/fetsundkiropraktorsenter/",
  klinikkside: "https://fetsundkiropraktor.no/",
  krystallsykehjelpen: "https://www.krystallsykehjelpen.no/",
};

// Klinikksiden eier de generelle plagene og metodene (se kartleggingen).
const k = "https://fetsundkiropraktor.no";
export const plager: { navn: string; tekst: string; lenke: string; interesse?: boolean }[] = [
  // interesse: true = Maries interessefelt (nest etter svimmelhet), vises først med eget merke
  { navn: "Kjeve", tekst: "Smerter og klikking", lenke: "/kjevesmerter/", interesse: true },
  { navn: "Hodepine", tekst: "Spenning og stress", lenke: "/hodepine/", interesse: true },
  { navn: "Nakke", tekst: "Låst, stiv eller vond", lenke: `${k}/behandlingsomrade/akutte-kroniske-nakkeplager/` },
  { navn: "Korsrygg", tekst: "Akutt og langvarig", lenke: `${k}/behandlingsomrade/vondt-i-ryggen/` },
  { navn: "Skulder", tekst: "Smerter og nedsatt bevegelse", lenke: `${k}/skuldersmerter-for-under-og-etter-ett-kiropraktorbesok/` },
  { navn: "Hofte og kne", tekst: "Også senebetennelser", lenke: "/vondt-i-hofte-kne-ankel-og-fot/" }, // egen artikkel på denne siden
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

// Lenke til egen side: metoder som finnes på klinikksiden lenker dit, resten til
// /behandlingsmetode/ her. Uten lenke vises de som vanlige merkelapper.
export const andreMetoder: { navn: string; lenke?: string }[] = [
  { navn: "Triggerpunktbehandling", lenke: `${k}/behandlingsmetode/triggerpunktsmassasje/` },
  { navn: "Mobilisering", lenke: `${k}/behandlingsmetode/mobiliseringsbehandling/` },
  { navn: "Bindevevsmassasje", lenke: `${k}/behandlingsmetode/bindevevsmassasje/` },
  { navn: "Traksjon", lenke: "/behandlingsmetode/traksjon/" },
  { navn: "Kinesiotape", lenke: "/behandlingsmetode/kinesiotape/" },
  { navn: "Aktiv release-tøying", lenke: "/behandlingsmetode/aktiv-release-toying/" },
  { navn: "Reposisjonering ved krystallsyke", lenke: "/krystallsyke/" },
  { navn: "Vestibulær rehabilitering", lenke: "/svimmelhet/" },
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
      { navn: "Førstegangskonsultasjon", bestill: "forstegang", pris: "910 kr", tekst: "For deg som er ny pasient og aldri har vært hos oss før." },
      { navn: "Oppfølgende behandling", bestill: "oppfolging", pris: "580 kr", tekst: "Har du vært hos oss de siste 12 månedene med lignende plager. 20 minutter." },
      { navn: "Dobbelttime", bestill: "ring", pris: "810 kr", tekst: "For tidligere pasienter som trenger ekstra tid. Avtales med kiropraktoren." },
    ],
  },
  {
    gruppe: "Svimmelhet",
    intro: "Svimmelhet har egne priser, fordi undersøkelsen og behandlingen tar mer tid og inkluderer VNG-briller.",
    timer: [
      { navn: "Svimmelhetsundersøkelse", bestill: "svimmelhet", pris: "1 100 kr", tekst: "Grundig undersøkelse ved svimmelhet, ustøhet eller balanseplager, med VNG-briller og en plan for videre behandling." },
      { navn: "Oppfølgende behandling – svimmelhet", bestill: "kalender", pris: "625 kr", tekst: "Oppfølging etter svimmelhetsundersøkelse. 20 minutter." },
      { navn: "Dobbelttime – svimmelhet", bestill: "ring", pris: "855 kr", tekst: "Når svimmelheten trenger ekstra tid. Avtales med kiropraktoren." },
    ],
  },
];

export const tilleggspris = { tekst: "Nålebehandling og kinesiotape", pris: "45 kr" };

export const navigasjon = [
  { navn: "Svimmelhet", lenke: "/svimmelhet/" },
  { navn: "Hodepine", lenke: "/hodepine/" },
  { navn: "Kjeve", lenke: "/kjevesmerter/" },
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

// Ekte anmeldelser fra Google (klinikkprofilen) der Marie nevnes ved navn. Alle 5 av 5.
// Bruk pasientens egne ord. «…» markerer at deler av teksten er utelatt.
export const anmeldelser = [
  {
    tekst: "Fantastisk søt, imøtekommende, omsorgsfull og dyktig kiropraktor Marie fikset krystallsyken … Varme anbefalinger fra meg!",
    navn: "Linda E.",
    ar: 2026,
  },
  {
    tekst: "Er godt fornøyd med den behandlingen jeg har fått hos Marie. Svimmelhet, nakke og skuldre, isjias.",
    navn: "Håvard L.",
    ar: 2026,
  },
  {
    tekst: "Marie Hermansen har vært min redning ved flere anledninger, hvor jeg nesten ikke har vært i stand til at gå. … M.H. er MEGET kompetent i tillegg alltid smilende og forstående.",
    navn: "Hans T.",
    ar: 2025,
  },
  {
    tekst: "Faglig dyktig og hyggelig. Verdt å pendle til Fetsund for time hos Marie.",
    navn: "Berit R.",
    ar: 2021,
  },
  {
    tekst: "Fikk fikset en akutt låsning i nakken og klarte å få time kjapt. … Marie er veldig dyktig og serviceminded. Nakken og ryggen ble veldig mye bedre!",
    navn: "Linn E.",
    ar: 2021,
  },
  {
    tekst: "Kjempe hyggelig og dyktig til jobben sin. Forklarte alt som hun gjorde og hvorfor.",
    navn: "Alexander H.",
    ar: 2021,
  },
];
