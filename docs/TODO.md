# Marveile.id — Todo List

> Checklist eksekusi. Centang hanya setelah verifikasi perintah di sampingnya.

## Selesai
- [x] Audit workspace (Node 24, tanpa package.json) — `node --version`
- [x] Konsolidasi search ganda → tunggal (hapus `SearchPanel.jsx` + CSS overlay, pills pindah ke Catalog) — grep `SearchPanel` = nol hasil
- [x] Tulis `docs/WORKFLOW.md`, `docs/CONTEXT.md`, `docs/TODO.md`

## Next.js migration (in-place, hapus Vite lama)
- [x] Backup data: salin `public/data/products.json` → `data/products.marveile.raw.json`
- [x] Init Next.js: App Router JSX + `npm install` + `npm run build` lolos
- [x] Hapus sisa Vite: `src/`, `dist/`, `public/data/` lama, scripts lama (sisa `validate-marveile.js`)
- [x] Terapkan token Rosewood di `app/globals.css` + font Outfit/Satoshi
- [x] Build komponen: Header → Hero → Lineup → ProductGrid → Footer (EditorialGrid menyusul)
- [x] Halaman: `/`, `/catalog`, `/kategori/[slug]` (+ about/contact/cart menyusul)
- [x] Import data MVP all-in (44 SKU: 8 hero + 36 legacy) + `node scripts/validate-marveile.js` lolos
- [x] `npm run build` lolos tanpa error

## Excel audit (multisheet)
- [x] `data/marveile-katalog-audit.xlsx`: Ringkasan 8 baris, Produk 44, Dedup 44, Preloved_Terpisah 24 (second, bukan harga resmi)

## PDP + filter (tutup gap vs Uniqlo)
- [x] `app/produk/[slug]/page.jsx`: gallery, size chart, CTA marketplace, related, JSON-LD, 44 static paths
- [x] Filter katalog `?cat=&size=&max=&sort=&page=` (GET form, tanpa JS) + kartu link ke PDP
- [x] `npm run build` lolos 49 halaman

## Gap Uniqlo screenshots (card/header/promo/data)
- [x] Card: swatch + hati wishlist + gender/size-range + harga coret/promo + catatan periode
- [x] Header transparan over hero + notice bar stok + mega menu bergambar + breadcrumb
- [x] Section promo berperiode (banner + tab + grid) + harga promo di PDP
- [x] Wishlist localStorage (provider + heart di card)
- [x] Build 61 halaman + smoke 200 (/, katalog filter, PDP promo, checkout)
- [ ] Follow-up: ganti 36 legacy Nigoo → SKU Marveile real + foto asli + harga promo real
- [ ] Import ke Vercel → deploy preview → tempel URL demo di sini: ____
