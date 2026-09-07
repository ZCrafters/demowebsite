// One-off import: marveile/marveile.official/*.json (Shopee scrape) -> data/products.marveile.json
// Keeps existing curated hero entries (ids 1001-1008) untouched; replaces the old
// "marveile-legacy" filler (ids 1-36) with 50 real products from the official store scrape.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, "..", "marveile", "marveile.official");
const OUT_FILE = path.join(__dirname, "..", "data", "products.marveile.json");
const TAKE = 50;

const colorRe = /warna|colou?r/i;
const sizeRe = /size|ukuran/i;

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const cleanName = (raw) => {
  let n = raw.replace(/^\s*\[\s*marveile\s*\]\s*/i, "").trim();
  n = n.split(" / ")[0].trim();
  return n.replace(/\s+/g, " ");
};

const guessCategory = (name, categories) => {
  const cats = (categories || []).join(" > ");
  const n = name.toLowerCase();
  if (n.includes("cutbray")) return "cutbray";
  if (n.includes("jumpsuit")) return "jumpsuit";
  if (cats.includes("Dress")) return "dress";
  if (cats.includes("Set")) return "set";
  if (cats.includes("Blazer")) return "blazer";
  if (cats.includes("Celana Jeans")) return "jeans";
  if (cats.includes("Sweater & Cardigan")) {
    if (n.includes("cardigan")) return "cardigan";
    if (n.includes("half zip") || n.includes("half-zip") || n.includes("zipper")) return "half-zip";
    return "sweater";
  }
  if (cats.includes("Rok Celana")) return "skort";
  if (cats.includes("Celana Panjang")) return "pants";
  if (cats.includes("Celana Pendek")) return "shorts";
  if (cats.includes("Rok")) return "skirt";
  if (cats.includes("Kemeja & Blouse")) return "blouse";
  if (cats.includes("Rompi")) return "outer";
  return "tops";
};

const guessMaterial = (description) => {
  const m = /material\s*:\s*([^\n]+)/i.exec(description || "");
  return m ? m[1].trim() : "";
};

const titleCase = (s) => s.toLowerCase().replace(/\b\w/g, (ch) => ch.toUpperCase());

const guessColors = (colorTier) => {
  if (!colorTier) return [];
  const seen = new Set();
  const out = [];
  for (const opt of colorTier.options || []) {
    let c = String(opt).split(" - ")[0];
    c = c.replace(/\(.*?\)/g, " ");
    c = c.replace(/\b(top only|pants only|1\s*set|set)\b/gi, " ");
    c = titleCase(c.replace(/\s+/g, " ").trim());
    const key = c.toLowerCase();
    if (c && !seen.has(key)) {
      seen.add(key);
      out.push(c);
    }
  }
  return out;
};

const guessSizes = (tierVariations) => {
  const t = (tierVariations || []).find((t) => sizeRe.test(t.name));
  const opts = (t?.options || []).map((o) => String(o).trim()).filter(Boolean);
  return opts.length ? opts : ["S", "M", "L", "XL"];
};

const files = fs
  .readdirSync(SRC_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort((a, b) => Number(a.replace(".json", "")) - Number(b.replace(".json", "")));

const existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf-8"));
// curated hero placeholders (picsum photos, heroFlag true) - left untouched, hero asset direction TBD
const heroEntries = existing.filter((p) => p.source === "shopee-observed" || p.source === "tokopedia-observed");
const existingSlugs = new Set(heroEntries.map((p) => p.slug));

const picked = [];
for (const f of files) {
  if (picked.length >= TAKE) break;
  const d = JSON.parse(fs.readFileSync(path.join(SRC_DIR, f), "utf-8"));
  if (!d.name || !(d.price > 0)) continue;
  const colorTier = (d.tier_variations || []).find((t) => colorRe.test(t.name) && (t.images || []).some(Boolean));
  if (!colorTier) continue;

  const name = cleanName(d.name);
  let slug = slugify(name);
  let n = 2;
  while (existingSlugs.has(slug)) slug = `${slugify(name)}-${n++}`;
  existingSlugs.add(slug);

  picked.push({
    id: 2000 + picked.length + 1,
    slug,
    name,
    price: d.price,
    category: guessCategory(name, d.categories),
    sizes: guessSizes(d.tier_variations),
    material: guessMaterial(d.description),
    colors: guessColors(colorTier),
    images: (colorTier.images || []).filter(Boolean),
    heroFlag: false,
    source: "marveile-official",
    provisional: true,
  });
}

if (picked.length < TAKE) {
  throw new Error(`only found ${picked.length}/${TAKE} usable products`);
}

const final = [...heroEntries, ...picked];
fs.writeFileSync(OUT_FILE, JSON.stringify(final, null, 2) + "\n", "utf-8");
console.log(`wrote ${final.length} products (${heroEntries.length} hero + ${picked.length} marveile-official)`);
