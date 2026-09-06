// Data + helper terpusat. Enrichment deterministik (stabil antar-build).
import raw from "../data/products.marveile.json";

export const rupiah = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v || 0);

const hash = (n, m) => Math.abs((n * 137 + 11) % m);

// Estimasi promo member berperiode — SEMENTARA, ganti dengan data promo real.
const PROMO = {
  "kylie-cutbray-highwaist": { originalPrice: 259000, note: "Harga Anggota Online + Aplikasi", until: "12 Sep 2026" },
  "gion-satin-pants": { originalPrice: 269000, note: "Harga Anggota Online + Aplikasi", until: "12 Sep 2026" },
  "bev-top": { originalPrice: 249000, note: "Harga Anggota Online + Aplikasi", until: "12 Sep 2026" },
  "oru-skort": { originalPrice: 239000, note: "Harga Anggota Online + Aplikasi", until: "12 Sep 2026" },
  "calla-dress": { originalPrice: 299000, note: "Harga Anggota Online + Aplikasi", until: "12 Sep 2026" },
};

export const products = raw.map((p) => {
  const rating = 46 + hash(p.id, 5); // 4.6 - 5.0 (x10)
  const sold = 120 + hash(p.id * 3, 8800);
  return {
    ...p,
    gender: "Wanita",
    sizeRange: (p.sizes || []).length ? `${p.sizes[0]}–${p.sizes[p.sizes.length - 1]}` : "S–XL",
    rating: rating / 10,
    reviews: 38 + hash(p.id * 7, 860),
    sold,
    isNew: p.id % 7 === 0 || p.id >= 1006,
    badge: p.heroFlag ? "Best Seller" : p.id % 7 === 0 ? "New" : null,
    // Promo berperiode (provisional, harga coret = estimasi, validasi sebelum produksi)
    originalPrice: PROMO[p.slug]?.originalPrice || null,
    promoNote: PROMO[p.slug]?.note || null,
    promoUntil: PROMO[p.slug]?.until || null,
  };
});

export const promoProducts = products.filter((p) => p.originalPrice);

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getRelated = (p, n = 8) =>
  products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, n);

export const bestSellers = [...products].sort((a, b) => b.sold - a.sold).slice(0, 10);
export const newArrivals = products.filter((p) => p.isNew).slice(0, 8);

export const allCategories = [...new Set(products.map((p) => p.category))].sort();
export const allColors = [...new Set(products.flatMap((p) => p.colors || []))].sort();
export const allSizes = ["S", "M", "L", "XL"];

export const maxPrice = Math.max(...products.map((p) => p.price));
export const minPrice = Math.min(...products.map((p) => p.price));

// Mega menu: 4 grup fashion wanita ala Marveile.
export const MEGA_MENU = [
  { title: "Dress", desc: "Mini, midi & occasion", links: [{ label: "Semua Dress", cat: "dress" }, { label: "Mini Dress", cat: "dress" }, { label: "Korean Set", cat: "dress" }] },
  { title: "Top", desc: "Blouse, knit & atasan", links: [{ label: "Semua Top", cat: "tops" }, { label: "Blouse", cat: "blouse" }, { label: "Knit / Sweater", cat: "sweater" }, { label: "Atasan", cat: "atasan" }] },
  { title: "Bawahan", desc: "Cutbray, pants & skort", links: [{ label: "Cutbray", cat: "cutbray" }, { label: "Highwaist Pants", cat: "pants" }, { label: "Skort", cat: "skort" }, { label: "Half-Zip", cat: "half-zip" }] },
  { title: "Outer & Set", desc: "Blazer & cardigan", links: [{ label: "Blazer", cat: "blazer" }, { label: "Cardigan", cat: "cardigan" }] },
];
