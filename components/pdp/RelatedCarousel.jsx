import Image from "next/image";
import { rupiah } from "../../lib/products";

export function RelatedCarousel({ items, category }) {
  if (!items.length) return null;
  return (
    <section aria-label="Produk serupa" style={{ marginTop: 32 }}>
      <div className="section-head"><h2>Produk Serupa</h2><a href={`/catalog?cat=${category}`}>Lihat semua →</a></div>
      <div className="h-scroll">
        {items.map((r) => (
          <a className="card" key={r.slug} href={`/produk/${r.slug}`}>
            <span className="card-img">
              <Image src={r.images?.[0]} alt={r.name} fill sizes="240px" loading="lazy" />
            </span>
            <span className="info">
              <strong className="card-name">{r.name}</strong>
              <span className="price">{rupiah(r.price)}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
