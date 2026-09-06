import products from "../../data/products.marveile.json";

const rupiah = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

const CATS = ["pants", "cutbray", "skort", "blazer", "dress", "tops", "blouse", "cardigan", "sweater", "atasan", "half-zip"];
const SIZES = ["S", "M", "L", "XL"];
const PER_PAGE = 24;

export default function Catalog({ searchParams }) {
  const q = (searchParams?.q || "").toLowerCase();
  const cat = searchParams?.cat || "";
  const size = searchParams?.size || "";
  const max = parseInt(searchParams?.max || "", 10) || 0;
  const sort = searchParams?.sort || "featured";
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);

  let list = products.filter(
    (p) =>
      (!q || `${p.name} ${p.category}`.toLowerCase().includes(q)) &&
      (!cat || p.category === cat) &&
      (!size || (p.sizes || []).includes(size)) &&
      (!max || p.price <= max)
  );
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "hero") list = [...list].sort((a, b) => Number(b.heroFlag || false) - Number(a.heroFlag || false));

  const shown = list.slice(0, page * PER_PAGE);
  const qs = (over = {}) => {
    const s = new URLSearchParams({ ...(q ? { q } : {}), ...(cat ? { cat } : {}), ...(size ? { size } : {}), ...(max ? { max: String(max) } : {}), sort });
    Object.entries(over).forEach(([k, v]) => (v ? s.set(k, v) : s.delete(k)));
    const str = s.toString();
    return `/catalog${str ? `?${str}` : ""}`;
  };

  return (
    <>
      <h1>Katalog ({list.length})</h1>
      <form className="catalog-search" action="/catalog" method="get" role="search">
        {cat && <input type="hidden" name="cat" value={cat} />}
        {size && <input type="hidden" name="size" value={size} />}
        {max ? <input type="hidden" name="max" value={max} /> : null}
        <input type="hidden" name="sort" value={sort} />
        <input id="catalog-search" name="q" type="search" defaultValue={searchParams?.q || ""}
          placeholder="Cari: cutbray, satin, skort…" aria-label="Cari produk" />
      </form>
      <div className="pills" aria-label="Filter kategori">
        <a className="pill" href={qs({ cat: "", page: "" })} aria-current={!cat || undefined}>Semua</a>
        {CATS.map((c) => (
          <a key={c} className="pill" href={qs({ cat: c, page: "" })} aria-current={cat === c || undefined}>{c}</a>
        ))}
      </div>
      <div className="pills" aria-label="Filter ukuran">
        {SIZES.map((s) => (
          <a key={s} className="pill" href={qs({ size: size === s ? "" : s, page: "" })} aria-current={size === s || undefined}>{s}</a>
        ))}
      </div>
      <div className="pills" aria-label="Urutkan">
        {[["featured", "Pilihan"], ["hero", "Hero"], ["price-asc", "Termurah"], ["price-desc", "Termahal"]].map(([v, l]) => (
          <a key={v} className="pill" href={qs({ sort: v, page: "" })} aria-current={sort === v || undefined}>{l}</a>
        ))}
      </div>
      <section className="grid" style={{ marginTop: 14 }} aria-label="Produk">
        {shown.map((p) => (
          <a className="card" key={p.slug} href={`/produk/${p.slug}`}>
            <img src={p.images?.[0]} alt={p.name} loading="lazy" />
            <div className="info">
              {p.heroFlag && <span className="tag">HERO</span>}
              <strong>{p.name}</strong>
              <span className="price">{rupiah(p.price)}</span>
              <span className="meta">{p.category} · {(p.sizes || []).join("/")}</span>
            </div>
          </a>
        ))}
      </section>
      {shown.length === 0 && <p>Tidak ada hasil. <a href="/catalog">Reset →</a></p>}
      {shown.length < list.length && <p style={{ marginTop: 16 }}><a className="btn" href={qs({ page: String(page + 1) })}>Muat lagi ({list.length - shown.length} sisa) →</a></p>}
    </>
  );
}
