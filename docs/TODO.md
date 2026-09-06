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

## Demo GitHub
- [x] `.gitignore` (node_modules, .next, .env*, *.xlsx)
- [x] `git init && git add -A && git commit -m "feat: marveile.id Next.js MVP"`
- [x] `git branch -M main && git remote add origin https://github.com/ZCrafters/marveile.id-demo.git`
- [x] `git push -u origin main` (main → main, 21 files)
- [ ] Import ke Vercel → deploy preview → tempel URL demo di sini: ____
