# Marveile.id — Context

Dokumen konteks tunggal untuk semua worker. Baca ini sebelum ubah kode.

## 1. Brand
- **Marveile**: affordable contemporary women's fashion, Korean-inspired, feminine. Tagline: "basic yet fashionable to boost your confidence" + "look expensive without overspending". Hashtag `#marveilebabes`, TikTok `@StyleWithMarveile`.
- Target: women 18–30, mahasiswa/first-jobber/urban, beli "look" (office/date/campus/brunch), bukan sekadar baju.
- Lawan dari kode lama (Nigoo knitwear 36 SKU, tone espresso/camel, copy English generik).

## 2. Kanal resmi (tujuan link, bukan sumber scrape)
- Shopee `marveile.official` (132 produk, hero: Gion/Roux/Gigi/Kylie/Bev/Oui), Tokopedia `marveile` (4.9/5923 ulasan/18rb terjual), Blibli `MAE-70699` (lemah, corridor saja), Instagram `@marveile.id` (Maison Collection, occasion edit), TikTok `@marveile.id` (live harian 06.00–21.00), Facebook `Marveile.id`, Preloved (second 40–165K, social proof saja).

## 3. IA referensi (dari `uniqlo-men-scaffold.html`)
- Header sticky (logo + Wanita/Pria/Anak/Bayi → ganti ke kategori Marveile) → Hero 1+2 → Lineup 6 (Pants/Cutbray/Skort/Blazer/Dress/Knit) → EditorialGrid 8 → ProductGrid → SeoIndex 3 kolom → Footer 7 channel.
- Max-width 1240px, grid 4→2 mobile, `min-h-[100dvh]` (dilarang `h-screen`), transform/opacity saja untuk animasi.

## 4. Arsitektur Next.js (migrasi dari Vite)
- App Router JSX: `app/layout.jsx`, `page.jsx`, `catalog/`, `kategori/[slug]/`, `produk/[slug]/`, `about/`, `contact/`, `cart/`.
- Komponen: Header, Hero, Lineup, EditorialGrid, ProductCard/Grid, SeoIndex, Footer. Satu search di Catalog (`#catalog-search`); `SearchPanel` overlay sudah dihapus.
- Data: `data/products.marveile.json`. Cart: localStorage hanya `{id, qty}`. Checkout: simulasi + lempar ke marketplace.

## 5. Batasan
- Tetap `noindex` sampai harga/foto resmi valid. Harga preloved tidak boleh jadi harga resmi. Stok/varian real-time belum ada.
