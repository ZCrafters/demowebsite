import fs from "node:fs";
const p = JSON.parse(fs.readFileSync(new URL("../data/products.marveile.json", import.meta.url), "utf-8"));
const slugs = new Set();
for (const it of p) {
  if (!it.slug || slugs.has(it.slug)) throw new Error("slug duplikat: " + it.slug);
  slugs.add(it.slug);
  if (!(it.price > 0)) throw new Error("harga invalid: " + it.slug);
  if (!/^https:\/\//.test(it.images?.[0] || "")) throw new Error("image invalid: " + it.slug);
}
console.log(`OK ${p.length} produk, ${p.filter((x) => x.heroFlag).length} hero.`);
