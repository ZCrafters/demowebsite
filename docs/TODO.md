# Marveile.id — Todo List

> Checklist eksekusi. Centang hanya setelah verifikasi perintah di sampingnya.

## Selesai
- [x] Audit workspace (Node 24, tanpa package.json) — `node --version`
- [x] Konsolidasi search ganda → tunggal (hapus `SearchPanel.jsx` + CSS overlay, pills pindah ke Catalog) — grep `SearchPanel` = nol hasil
- [x] Tulis `docs/WORKFLOW.md`, `docs/CONTEXT.md`, `docs/TODO.md`

## Next.js migration (in-place, hapus Vite lama)
- [x] Backup data → diarsipkan di `docs/archive/` (raw + docs era lama)
- [x] Init Next.js: App Router JSX + `npm install` + `npm run build` lolos
- [x] Hapus sisa Vite: `src/`, `dist/`, `public/data/` lama, scripts lama (sisa `validate-marveile.js`)
- [x] Terapkan token Rosewood di `app/globals.css` + font Outfit/Satoshi
- [x] Build komponen: Header → Hero → Lineup → ProductGrid → Footer (EditorialGrid menyusul)
- [x] Halaman: `/`, `/catalog`, `/kategori/[slug]` (+ about/contact/cart menyusul)
- [x] Import data MVP all-in (44 SKU: 8 hero + 36 legacy) + `node scripts/validate-marveile.js` lolos
- [x] `npm run build` lolos tanpa error

## Excel audit (multisheet)
- [x] `data/marveile-katalog-audit.xlsx`: Ringkasan 8 baris, Produk 44, Dedup 44, Preloved_Terpisah 24 (second, bukan harga resmi)

## PDP + filter (tutup gap vs referensi)
- [x] `app/produk/[slug]/page.jsx`: gallery, size chart, CTA marketplace, related, JSON-LD, 44 static paths
- [x] Filter katalog `?cat=&size=&max=&sort=&page=` (GET form, tanpa JS) + kartu link ke PDP
- [x] `npm run build` lolos 49 halaman

## Layer 1: token, SEO, search, PLP, halaman baru
- [x] Token Rosewood final + font Outfit/Cabinet Grotesk via Google Fonts
- [x] `app/sitemap.js` (65 entry) + `public/robots.txt`; noindex dihapus dari root
- [x] Search: recent (localStorage) + live suggestions (top-6)
- [x] PLP: sort alfabet (A–Z / Z–A) + view toggle grid/list
- [x] Halaman baru: `/wishlist` (WishlistClient), `/faq` (7 Q&A), `/lookbook` (4 edit)
- [x] Cart: free shipping progress bar (target Rp500K) + on-blur validasi checkout
- [x] Footer link ke FAQ/Lookbook/Wishlist
- [x] Build 65 halaman + smoke 200 (9 route)
- [ ] Import ke Vercel → deploy preview → tempel URL demo di sini: ____
