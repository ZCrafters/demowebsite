import products from "../data/products.marveile.json";

const rupiah = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

const lineup = ["pants", "cutbray", "skort", "blazer", "dress", "tops"];
const popular = ["cutbray", "satin", "skort", "blazer", "dress", "knit"];

export default function Home({ searchParams }) {
  const q = (searchParams?.q || "").toLowerCase();
  const heroes = products.filter((p) => p.heroFlag).slice(0, 8);
  const results = q
    ? products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(q)).slice(0, 12)
    : heroes;

  return (
    <>
      <section className="hero" aria-label="Sorotan koleksi">
        <div className="hero-main">
          <img src="https://picsum.photos/seed/marveile-hero/1200/700" alt="Koleksi Marveile" />
          <div className="hero-copy">
            <div className="kicker">ELEVATED EVERYDAY FASHION</div>
            <h1>Look expensive without overspending.</h1>
            <p>1 celana, 3 looks. Potongan highwaist yang bikin kaki terlihat lebih panjang.</p>
            <a className="btn" href="/catalog">Lihat katalog →</a>
          </div>
        </div>
        <div className="hero-side">
          <a className="tile" href="/kategori/cutbray">
            <img src="https://picsum.photos/seed/marveile-side1/600/400" alt="" loading="lazy" />
            <span>Cutbray Edit →</span>
          </a>
          <a className="tile" href="/kategori/dress">
            <img src="https://picsum.photos/seed/marveile-side2/600/400" alt="" loading="lazy" />
            <span>Office → Dinner →</span>
          </a>
        </div>
      </section>

      <div className="section-head"><h2>Shop the lineup</h2><a href="/catalog">Lihat semua →</a></div>
      <nav className="lineup" aria-label="Lineup kategori">
        {lineup.map((c) => (
          <a key={c} href={`/kategori/${c}`}>{c}</a>
        ))}
      </nav>

      <div className="section-head"><h2>{q ? `Hasil untuk "${searchParams.q}"` : "Hero products"}</h2><a href="/catalog">Katalog →</a></div>
      <form className="catalog-search" action="/" method="get" role="search">
        <input id="catalog-search" name="q" type="search" defaultValue={searchParams?.q || ""} placeholder="Cari: cutbray, satin, skort…" aria-label="Cari produk" />
        <div className="pills" aria-label="Popular searches">
          {popular.map((t) => (
            <button key={t} className="pill" type="submit" name="q" value={t}>{t}</button>
          ))}
        </div>
      </form>
      <section className="grid" style={{ marginTop: 14 }} aria-label="Produk">
        {results.map((p) => (
          <article className="card" key={p.slug}>
            <img src={p.images?.[0]} alt={p.name} loading="lazy" />
            <div className="info">
              {p.heroFlag && <span className="tag">HERO</span>}
              <strong>{p.name}</strong>
              <span className="price">{rupiah(p.price)}</span>
              <span className="meta">{p.category} · {p.sizes?.join("/")}</span>
            </div>
          </article>
        ))}
      </section>
      {results.length === 0 && <p>Tidak ada hasil. Coba kata lain.</p>}
    </>
  );
}
