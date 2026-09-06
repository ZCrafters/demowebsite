# Marveile.id — Todo List

> Checklist eksekusi. Centang hanya setelah verifikasi perintah di sampingnya.

## Selesai
- [x] Audit workspace (Node 24, tanpa package.json) — `node --version`
- [x] Konsolidasi search ganda → tunggal (hapus `SearchPanel.jsx` + CSS overlay, pills pindah ke Catalog) — grep `SearchPanel` = nol hasil
- [x] Tulis `docs/WORKFLOW.md`, `docs/CONTEXT.md`, `docs/TODO.md`

## Next.js migration (in-place, hapus Vite lama)
- [ ] Backup data: salin `public/data/products.json` → `data/products.marveile.raw.json`
- [ ] Init Next.js: `npx create-next-app@latest . --js --app --no-ts --eslint` (tolak overwrite `docs/`, `data/`)
- [ ] Hapus sisa Vite: `src/`, `scripts/`, `dist/`, `public/data/products.json` lama setelah backup terverifikasi
- [ ] Terapkan token Rosewood di `app/globals.css` + font Outfit/Satoshi
- [ ] Build komponen: Header → Hero → Lineup → EditorialGrid → ProductGrid → SeoIndex → Footer
- [ ] Halaman: `/`, `/catalog`, `/kategori/[slug]`, `/produk/[slug]` (size chart), `/about`, `/contact`, `/cart`
- [ ] Import data MVP all-in + `npm run validate` lolos
- [ ] `npm run build` lolos tanpa error

## Demo GitHub
- [ ] `.gitignore` (node_modules, .next, .env*, *.xlsx)
- [ ] `git init && git add -A && git commit -m "feat: marveile.id Next.js MVP"`
- [ ] `git branch -M main && git remote add origin https://github.com/ZCrafters/marveile.id-demo.git`
- [ ] `git push -u origin main` (verifikasi output + remote -v)
- [ ] Import ke Vercel → deploy preview → tempel URL demo di sini: ____
