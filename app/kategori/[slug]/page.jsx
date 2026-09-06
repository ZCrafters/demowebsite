import { products } from "../../../lib/products";
import { ProductCard } from "../../../components/ui/ProductCard";

export function generateStaticParams() {
  return [...new Set(products.map((p) => p.category))].map((slug) => ({ slug }));
}

export default function Category({ params }) {
  const list = products.filter((p) => p.category === params.slug);
  return (
    <>
      <p style={{ fontSize: 12, color: "var(--color-muted)" }}>Home / <strong style={{ textTransform: "capitalize" }}>{params.slug}</strong></p>
      <h1 style={{ margin: "4px 0 0", textTransform: "capitalize" }}>{params.slug} ({list.length})</h1>
      {list.length === 0 ? (
        <p>Belum ada SKU kategori ini di MVP. <a href="/catalog">Kembali ke katalog →</a></p>
      ) : (
        <section className="grid" style={{ marginTop: 14 }}>
          {list.map((p) => <ProductCard key={p.slug} p={p} />)}
        </section>
      )}
    </>
  );
}
