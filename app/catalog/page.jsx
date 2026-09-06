import products from "../../data/products.marveile.json";

const rupiah = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

export default function Catalog({ searchParams }) {
  const q = (searchParams?.q || "").toLowerCase();
  const sort = searchParams?.sort || "featured";
  let list = products.filter((p) => !q || `${p.name} ${p.category}`.toLowerCase().includes(q));
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <>
      <h1>Katalog ({list.length})</h1>
      <form className="catalog-search" action="/catalog" method="get" role="search">
        <input id="catalog-search" name="q" type="search" defaultValue={searchParams?.q || ""} placeholder="Cari produk…" aria-label="Cari produk" />
      </form>
      <section className="grid" style={{ marginTop: 14 }}>
        {list.slice(0, 24).map((p) => (
          <article className="card" key={p.slug}>
            <img src={p.images?.[0]} alt={p.name} loading="lazy" />
            <div className="info">
              <strong>{p.name}</strong>
              <span className="price">{rupiah(p.price)}</span>
              <span className="meta">{p.category}</span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
