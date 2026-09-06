import products from "../../../data/products.marveile.json";

export default function Category({ params }) {
  const list = products.filter((p) => p.category === params.slug);
  return (
    <>
      <h1 style={{ textTransform: "capitalize" }}>{params.slug} ({list.length})</h1>
      {list.length === 0 ? (
        <p>Belum ada SKU kategori ini di MVP. <a href="/catalog">Kembali ke katalog →</a></p>
      ) : (
        <section className="grid">
          {list.map((p) => (
            <article className="card" key={p.slug}>
              <img src={p.images?.[0]} alt={p.name} loading="lazy" />
              <div className="info"><strong>{p.name}</strong><span className="meta">{p.category}</span></div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
