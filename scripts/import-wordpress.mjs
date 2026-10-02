// Engangsskript: henter de publiserte blogginnleggene fra WordPress-eksporten
// og lagrer dem som Markdown-filer i src/content/blogg/.
//
// Kjør med: node scripts/import-wordpress.mjs <sti-til-eksport.xml>
//
// Adressene (slug) beholdes uendret, så gamle lenker og Google-plasseringer
// fortsetter å virke etter flyttingen.

import fs from "node:fs";
import path from "node:path";
import TurndownService from "turndown";

const xmlPath = process.argv[2];
if (!xmlPath) {
  console.error("Bruk: node scripts/import-wordpress.mjs <eksport.xml>");
  process.exit(1);
}
const xml = fs.readFileSync(xmlPath, "utf8");
const outDir = path.resolve("src/content/blogg");
fs.mkdirSync(outDir, { recursive: true });

// --- Enkel XML-lesing (eksporten er flat nok til regex) ---
const cdata = (s) => (s ?? "").replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
const tag = (item, name) => {
  const m = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? cdata(m[1].trim()) : "";
};
const items = xml.split("<item>").slice(1).map((s) => s.split("</item>")[0]);

// Vedlegg (bilder) slås opp på ID for å finne fremhevet bilde
const attachments = {};
for (const it of items) {
  if (tag(it, "wp:post_type") === "attachment") {
    attachments[tag(it, "wp:post_id")] = tag(it, "wp:attachment_url");
  }
}
const meta = (it, key) => {
  const re = new RegExp(
    `<wp:meta_key><!\\[CDATA\\[${key}\\]\\]></wp:meta_key>\\s*<wp:meta_value><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></wp:meta_value>`,
  );
  const m = it.match(re);
  return m ? m[1] : "";
};

// Tema brukes til filtrering på bloggsiden
const tema = {
  "vestibulaer-migrene-nar-migrene-gir-svimmelhet": "svimmelhet",
  "svimmel-eller-usto-vanlige-arsaker-undersokelser-og-behandling": "svimmelhet",
  "hvorfor-blir-jeg-svimmel": "svimmelhet",
  "krystallsyken-hos-de-eldre-vanligere-enn-mange-tror": "svimmelhet",
  "nakkesvimmelhet-hva-er-det": "svimmelhet",
  "krystallsyke-og-svimmelhet-5-ovelser-som-hjelper": "svimmelhet",
  "stresshodepine-svimmelhet-og-kjevesmerter": "nakke-og-hode",
  "nar-nakken-laser-seg-guide-til-akutte-nakkesmerter": "nakke-og-hode",
  "vare-vanligste-triggerpunkter": "nakke-og-hode",
  "kjevesmerter-for-under-og-etter-et-kiropraktorbesok": "nakke-og-hode",
};
const temaFor = (slug) => tema[slug] ?? "rygg-og-ledd";

// --- Rydding av WordPress-HTML ---
const youtubeId = (url) => {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return m ? m[1] : null;
};
const youtubeEmbed = (id) =>
  `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="Video fra YouTube" loading="lazy" allowfullscreen></iframe></div>`;

function fixLinks(html) {
  return html
    .replace(/https?:\/\/(?:www\.)?fetsundkiropraktormarie\.no(\/[^"]*)?/g, (_, p) => p || "/")
    .replace(/https?:\/\/kiropraktormariehermansen\.totalweb\.dev(\/[^"]*)?/g, (_, p) => p || "/")
    .replace(/https?:\/\/(?:www\.)?kiropraktormarie\.no\/?/g, "/")
    .replace(/fetsundkiropaktor\.no/g, "fetsundkiropraktor.no")
    .replace(/http:\/\/www\.fetsundkiropraktor\.no/g, "https://fetsundkiropraktor.no")
    .replace(/[?&]utm_source=chatgpt\.com/g, "")
    // Private ChatGPT-lenker og lokale filstier fjernes, teksten beholdes
    .replace(/<a [^>]*href="(?:https:\/\/chatgpt\.com[^"]*|\/Users\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/g, "$1")
    // Bilder beholdes fra WordPress foreløpig
    .replace(/src="\/wp-content/g, 'src="https://fetsundkiropraktormarie.no/wp-content')
    // Lenker til gamle adresser pekes rett til der innholdet bor nå
    .replace(/href="\/behandlingsomrade\/krystallsyken\/?"/g, 'href="/krystallsyke/"')
    .replace(/href="\/behandlingsomrade\/svimmelhet\/?"/g, 'href="/svimmelhet/"')
    .replace(/href="\/kjevebehandling-[^"]*"/g, 'href="https://fetsundkiropraktor.no/behandlingsomrade/kjevesmerter/"')
    // «Kiropraktor Marie Hermansen» lenket til forsiden – nå til Om Marie
    .replace(/<a ([^>]*)href="\/"([^>]*)>(\s*(?:kiropraktor\s+)?Marie Hermansen\s*)<\/a>/gi, '<a $1href="/om-marie-hermansen/"$2>$3</a>')
    .replace(/href="\/(behandlingsmetoder?|behandlingsomrader?)(\/[^"]*)?"/g, (_, a, b) => `href="https://fetsundkiropraktor.no/${a}${b ?? "/"}"`);
}

// WordPress lagrer «klassisk» innhold uten <p>-tagger (wpautop)
function autop(html) {
  const block = /^<(h[1-6]|ul|ol|li|table|blockquote|div|figure|iframe|hr|pre)/i;
  return html
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter((c) => c && c !== "&nbsp;")
    .map((c) => (block.test(c) ? c : `<p>${c.replace(/\n/g, "<br>")}</p>`))
    .join("\n\n");
}

function clean(raw) {
  let html = raw.replace(/\r/g, "");
  html = html.replace(/\[embed\]\s*(\S+?)\s*\[\/embed\]/g, (_, url) => {
    const id = youtubeId(url);
    return id ? `\n\n${youtubeEmbed(id)}\n\n` : url;
  });
  // YouTube-lenker alene på en linje blir innebygd video
  html = html.replace(/^\s*(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/\S+)\s*$/gm, (line, url) => {
    const id = youtubeId(url);
    return id ? `\n\n${youtubeEmbed(id)}\n\n` : line;
  });
  html = html.replace(/<h[1-6][^>]*>\s*(?:&nbsp;)?\s*<\/h[1-6]>/g, ""); // tomme overskrifter
  html = html.replace(/<(\/?)h1([^>]*)>/g, "<$1h2$2>"); // sidens h1 er tittelen
  html = html.replace(
    /\[caption[^\]]*\]\s*((?:<a [^>]*>)?<img[^>]*>(?:<\/a>)?)\s*([\s\S]*?)\[\/caption\]/g,
    (_, img, text) => `<figure>${img}${text.trim() ? `<figcaption>${text.trim()}</figcaption>` : ""}</figure>`,
  );
  html = fixLinks(html);
  html = html.replace(/(<\/(?:h[1-6]|ul|ol|table|blockquote|figure)>)\n/g, "$1\n\n");
  html = html.replace(/\n(<(?:h[1-6]|ul|ol|table|blockquote|figure)[\s>])/g, "\n\n$1");
  return autop(html);
}

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", emDelimiter: "*" });
td.keep(["iframe", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td"]);
td.addRule("video", {
  filter: (node) => node.nodeName === "DIV" && node.getAttribute("class") === "video",
  replacement: (_, node) => `\n\n${node.outerHTML}\n\n`,
});

const yaml = (s) => JSON.stringify(s ?? "");
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

let count = 0;
for (const it of items) {
  if (tag(it, "wp:post_type") !== "post" || tag(it, "wp:status") !== "publish") continue;
  const slug = tag(it, "wp:post_name");
  const title = decode(tag(it, "title"));
  const date = tag(it, "wp:post_date").slice(0, 10);
  const description = decode(meta(it, "_aioseo_description") || tag(it, "excerpt:encoded")).replace(/\s+/g, " ").trim();
  const image = attachments[meta(it, "_thumbnail_id")] ?? "";
  // Fremhevet bilde vises øverst på siden – fjern første kopi av det i teksten
  let html = clean(tag(it, "content:encoded"));
  if (image) {
    const stem = path.basename(image).replace(/(-\d+x\d+)?(\.[a-z]+)+$/i, "");
    const dup = new RegExp(`<img[^>]*src="[^"]*${stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:-\\d+x\\d+)?(?:\\.[a-z]+)+"[^>]*>`, "i");
    html = html.replace(dup, "");
  }
  const body = td
    .turndown(html)
    .replace(/^[ \t\u00a0*_]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n");

  const front = [
    "---",
    `title: ${yaml(title)}`,
    `description: ${yaml(description)}`,
    `date: ${date}`,
    `tema: ${temaFor(slug)}`,
    image ? `image: ${yaml(image)}` : null,
    `forfatter: "Marie Hermansen"`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  fs.writeFileSync(path.join(outDir, `${slug}.md`), `${front}\n\n${body.trim()}\n`);
  count++;
}
console.log(`Ferdig: ${count} innlegg lagret i ${outDir}`);
