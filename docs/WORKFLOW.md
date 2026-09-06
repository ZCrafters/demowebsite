# Marveile.id — Workflow

> Sumber tunggal alur kerja migrasi Vite (Nigoo) → Next.js (Marveile) + demo GitHub.
> Referensi IA: `uniqlo-men-scaffold.html` (terinspirasi struktur, bukan salinan).

## 1. Prinsip
1. Satu fungsi = satu elemen. Contoh: search hanya di Catalog (`#catalog-search`), TopNav hanya fokus ke sana. Dilarang duplikat overlay + inline.
2. Sell the look, not the clothes. Homepage = styling/occasion dulu, grid produk kemudian.
3. Data sebelum visual. Katalog harus valid sebelum poles CSS.
4. Verifikasi tiap step: `npm run build` + cek mobile 375px sebelum commit.

## 2. Alur fase
### Fase 0 — Freeze & audit
- Amankan `public/data/products.json` (36 SKU) + mirror Shopee 132 + Tokopedia 10 sebagai `data/products.marveile.raw.json`.
- Catat anomali: tanpa `package.json`, `dist/` basi, gambar hotlink Shopee.

### Fase 1 — Brand token
- Terapkan Rosewood: canvas `#FAF7F2`, ink `#1C1917`, muted `#78716C`, border `#E7E0D6`, aksen `#9A5A64` / hover `#7E4851`.
- Font: Outfit/Satoshi, `tabular-nums` untuk harga, sentence case.

### Fase 2 — Data MVP
- Dedup by slug → `data/products.marveile.json` (schema: id, slug, name, price, category, sizes[], material, colors[], images[], heroFlag, source).
- Hero flag: Kylie, Gigi, Gion, Diora, Oru, Bev, Rue, Calla.
- `npm run validate` wajib lolos (harga > 0, slug unik, image https/picsum).

### Fase 3 — Build section-per-section (App Router)
1. `app/layout.jsx` (Header/Footer/SEO) 2. `Hero.jsx` (1 besar + 2 tile) 3. `Lineup.jsx` (6 kategori Marveile) 4. `EditorialGrid.jsx` (8 blok) 5. `ProductGrid.jsx` 6. `produk/[slug]` (size chart S–XL) 7. `catalog` (filter/sort/?q=) 8. `cart` (localStorage) 9. `about/contact` 10. SEO/sitemap/robots (tetap noindex sampai data resmi).

### Fase 4 — QA demo
- Search tunggal, cart persist, empty state, 404, tidak ada error console.
- `npm run build` lolos, push `main`, deploy Vercel preview.

## 3. Larangan
- Dilarang scrape agresif / copy foto-copy Uniqlo. Scaffold hanya referensi IA.
- Dilarang tambah search/filter ganda tanpa hapus yang lama.
- Dilarang push `.env`, `node_modules`, `.next`, `*.xlsx` besar.
