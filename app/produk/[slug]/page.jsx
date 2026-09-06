import { notFound } from "next/navigation";
import products from "../../../data/products.marveile.json";

const rupiah = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = products.find((x) => x.slug === params.slug);
  return { title: p ? `${p.name} — Marveile` : "Produk tidak ditemukan — Marveile", robots: { index: false } };
}

const SIZE_CHART = [
  ["S", "66", "58", "94"],
  ["M", "70", "60", "95"],
  ["L", "74", "62", "96"],
  ["XL", "78", "64", "97"]
];

export default function ProductDetail({ params }) {
  const p = products.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  return (
    <>
      <p style={{ fontSize: 12, color: "var(--muted)" }}>
        <a href="/catalog">Katalog</a> / <a href={`/kategori/${p.category}`}>{p.category}</a> / <strong>{p.name}</strong>
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="pdp">
        <div>
          {(p.images?.length ? p.images : []).slice(0, 3).map((src, i) => (
            <img key={i} src={src} alt={`${p.name} ${i + 1}`} loading={i ? "lazy" : "eager"}
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 14, marginBottom: 12, background: "#eee" }} />
          ))}
        </div>
        <div>
          {p.heroFlag && <span className="tag">HERO PRODUCT</span>}
          <h1 style={{ margin: "6px 0" }}>{p.name}</h1>
          <p className="price" style={{ fontSize: 22 }}>{rupiah(p.price)}</p>
          {p.provisional && <p className="meta">Harga provisional — konfirmasi di official store.</p>}
          <p className="meta">Material: {p.material || "-"} · Warna: {(p.colors || []).join(", ") || "-"}</p>
          <h2 style={{ fontSize: 15 }}>Size chart (cm) — toleransi 1–3 cm</h2>
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <thead><tr><th>Size</th><th>Pinggang</th><th>Paha</th><th>Panjang</th></tr></thead>
            <tbody>
              {SIZE_CHART.map(([s, w, t, l]) => (
                <tr key={s} style={{ borderTop: "1px solid var(--border)", fontWeight: (p.sizes || []).includes(s) ? 700 : 400 }}>
                  <td>{s}{!(p.sizes || []).includes(s) ? " (—)" : ""}</td><td>{w}</td><td>{t}</td><td>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <a className="btn" href="https://shopee.co.id/marveile.official" target="_blank" rel="noreferrer">Beli di Shopee →</a>
            <a className="btn" href="https://www.tokopedia.com/marveile" target="_blank" rel="noreferrer"
              style={{ background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--border)" }}>Tokopedia →</a>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <>
          <div className="section-head"><h2>Related: {p.category}</h2></div>
          <section className="grid">
            {related.map((r) => (
              <a className="card" key={r.slug} href={`/produk/${r.slug}`}>
                <img src={r.images?.[0]} alt={r.name} loading="lazy" />
                <div className="info"><strong>{r.name}</strong><span className="price">{rupiah(r.price)}</span></div>
              </a>
            ))}
          </section>
        </>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product", name: p.name,
        sku: p.slug, brand: { "@type": "Brand", name: "Marveile" },
        offers: { "@type": "Offer", priceCurrency: "IDR", price: p.price, availability: "https://schema.org/InStock" }
      }) }} />
    </>
  );
}
