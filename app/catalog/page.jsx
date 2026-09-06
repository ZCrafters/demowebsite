import { products, rupiah } from "../../lib/products";
import { ProductCard } from "../../components/ui/ProductCard";
import { Breadcrumb } from "../../components/ui/Chrome";
import { FilterSidebar, SortDropdown } from "../../components/plp/Filters";
import { FilterBottomSheet } from "../../components/plp/FilterBottomSheet";
import { Reveal } from "../../components/motion/Reveal";

const PER_PAGE = 24;

export default function Catalog({ searchParams }) {
  const q = (searchParams?.q || "").toLowerCase();
  const cat = searchParams?.cat || "";
  const sizes = (searchParams?.size || "").split(",").filter(Boolean);
  const colors = (searchParams?.color || "").split(",").filter(Boolean);
  const max = parseInt(searchParams?.max || "", 10) || 0;
  const sort = searchParams?.sort || "featured";
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);

  let list = products.filter(
    (p) =>
      (!q || `${p.name} ${p.category}`.toLowerCase().includes(q)) &&
      (!cat || p.category === cat) &&
      (!sizes.length || sizes.some((s) => (p.sizes || []).includes(s))) &&
      (!colors.length || colors.some((c) => (p.colors || []).includes(c))) &&
      (!max || p.price <= max)
  );
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "sold") list = [...list].sort((a, b) => b.sold - a.sold);
  if (sort === "new") list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);

  const activeFilters = (cat ? 1 : 0) + sizes.length + colors.length + (max ? 1 : 0);
  const shown = list.slice(0, page * PER_PAGE);
  const pageQs = (p) => {
    const s = new URLSearchParams(searchParams);
    p > 1 ? s.set("page", String(p)) : s.delete("page");
    const str = s.toString();
    return `/catalog${str ? `?${str}` : ""}`;
  };
  const current = { q: searchParams?.q || "", cat, size: sizes.join(","), color: colors.join(","), max: searchParams?.max || "", sort };

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: cat ? `Katalog / ${cat}` : "Katalog" }]} />
      <h1 style={{ margin: "4px 0 0" }}>Katalog{cat ? ` — ${cat}` : ""}</h1>
      <div className="plp" style={{ marginTop: 12 }}>
        <FilterSidebar current={current} />
        <div>
          <form className="catalog-search" action="/catalog" method="get" role="search">
            {cat && <input type="hidden" name="cat" value={cat} />}
            {sizes.map((s) => <input key={s} type="hidden" name="size" value={s} />)}
            <input type="hidden" name="sort" value={sort} />
            <input id="catalog-search" name="q" type="search" defaultValue={searchParams?.q || ""}
              placeholder="Cari: cutbray, satin, skort…" aria-label="Cari produk" />
          </form>
          <div className="plp-bar">
            <FilterBottomSheet current={current} count={activeFilters} />
            <span className="count" role="status">{list.length} produk</span>
            <span style={{ marginLeft: "auto" }}><SortDropdown current={current} /></span>
          </div>
          {max ? <p className="meta">Harga maks: {rupiah(max)} · <a href="/catalog">reset</a></p> : null}
          {shown.length ? (
            <Reveal className="grid" staggerChildren aria-label="Produk">
              {shown.map((p) => <ProductCard key={p.slug} p={p} />)}
            </Reveal>
          ) : (
            <div className="empty-cart">
              <strong>Tidak ada hasil.</strong>
              <p className="meta">Coba kata kunci atau filter lain.</p>
              <a className="btn" href="/catalog">Reset filter</a>
            </div>
          )}
          {shown.length < list.length && (
            <p style={{ marginTop: 16 }}><a className="btn btn-outline" href={pageQs(page + 1)}>Muat lagi ({list.length - shown.length} sisa) →</a></p>
          )}
        </div>
      </div>
    </>
  );
}
