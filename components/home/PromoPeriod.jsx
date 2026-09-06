import { promoProducts } from "../../lib/products";
import { ProductCard } from "../ui/ProductCard";

// Section promo berperiode ala referensi: banner + tab + grid promo + tanggal periode.
export function PromoPeriod() {
  if (!promoProducts.length) return null;
  return (
    <section aria-label="Promo" id="promo" style={{ marginTop: 36 }}>
      <a className="promo-frame" href="/catalog?sort=price-asc" aria-label="Harga eksklusif anggota, lihat katalog">
        <span className="promo-frame-title">HARGA EKSKLUSIF ANGGOTA</span>
        <span className="promo-frame-date">Periode s.d. 12 Sep 2026</span>
        <span className="promo-frame-note">Belanja via web + aplikasi, harga spesial otomatis di keranjang.</span>
      </a>
      <div className="pills" role="navigation" aria-label="Tab promo">
        <a className="pill" href="#promo" aria-current="page">Harga Eksklusif</a>
        <a className="pill" href="/catalog?sort=sold">Terlaris</a>
        <a className="pill" href="/catalog?sort=new">Must-Have This Season</a>
        <a className="pill" href="/catalog?sort=price-asc">Sale</a>
      </div>
      <div className="section-head">
        <div>
          <h2>Harga Eksklusif</h2>
          <p className="meta" style={{ margin: "2px 0 0" }}>Periode s.d. 12 September 2026</p>
        </div>
        <a href="/catalog">Lihat semua →</a>
      </div>
      <div className="grid">
        {promoProducts.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
    </section>
  );
}
