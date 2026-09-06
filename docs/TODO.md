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

## E-commerce full spec (Header/Home/PLP/PDP/Cart/Checkout/Footer)
- [x] Token placeholder `--color-*`, breakpoint 375/768/1024/1440, tap 44px
- [x] Header: sticky 68px + mega menu + search overlay terpisah + badge + mobile nav
- [x] Home: hero 16:9 + grid kategori 3:4 + best seller carousel + new arrivals + promo
- [x] PLP: sidebar + bottom-sheet + sort + grid 4/2/2 + badge + skeleton
- [x] PDP: galeri zoom + size grid + swatch + sticky CTA + accordion + related
- [x] Cart drawer + Checkout 3 step + QRIS simulasi (timer + sukses)
- [x] Footer: bantuan/tentang/sosial/newsletter + ikon bayar + QRIS
- [x] Build 61 halaman + smoke test 200 (/, /catalog, PDP, /checkout)
- [ ] Import ke Vercel → deploy preview → tempel URL demo di sini: ____
