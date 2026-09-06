import { allCategories, allColors, allSizes, maxPrice, minPrice, rupiah } from "../../lib/products";

// Field filter murni-props: dipakai sidebar server & bottom-sheet client.
export function FilterFields({ current }) {
  const { cat = "", size = "", color = "", max = "", q = "", sort = "featured" } = current;
  return (
    <>
      <fieldset>
        <legend>Tipe produk</legend>
        {allCategories.map((c) => (
          <label className="check" key={c}>
            <input type="radio" name="cat" value={c} defaultChecked={cat === c} /> {c}
          </label>
        ))}
        <label className="check"><input type="radio" name="cat" value="" defaultChecked={!cat} /> Semua</label>
      </fieldset>
      <fieldset>
        <legend>Size</legend>
        {allSizes.map((s) => (
          <label className="check" key={s}>
            <input type="checkbox" name="size" value={s} defaultChecked={size.split(",").includes(s)} /> {s}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Warna</legend>
        {allColors.slice(0, 10).map((c) => (
          <label className="check" key={c}>
            <input type="checkbox" name="color" value={c} defaultChecked={color.split(",").includes(c)} /> {c}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Harga maksimal</legend>
        <input type="range" className="price-range" name="max" min={minPrice} max={maxPrice} step={10000}
          defaultValue={max || maxPrice} aria-label="Harga maksimal" />
        <span style={{ fontSize: 13, color: "var(--color-muted)" }}>
          s.d. {rupiah(Number(max) || maxPrice)}
        </span>
      </fieldset>
      {q && <input type="hidden" name="q" value={q} />}
      <input type="hidden" name="sort" value={sort} />
    </>
  );
}

export function FilterSidebar({ current }) {
  return (
    <aside className="filter-box desktop-only" aria-label="Filter produk">
      <h3>Filter</h3>
      <form action="/catalog" method="get">
        <FilterFields current={current} />
        <button className="btn filter-apply" type="submit" style={{ marginTop: 12 }}>Terapkan</button>
      </form>
    </aside>
  );
}

export function SortDropdown({ current, base = "/catalog" }) {
  const s = new URLSearchParams();
  ["q", "cat", "size", "color", "max"].forEach((k) => current[k] && s.set(k, current[k]));
  const href = (sort) => `${base}?${[...s.entries()].filter(([k]) => k !== "sort").map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")}${s.size ? "&" : "?"}sort=${sort}`.replace("?&", "?");
  const label = { featured: "Pilihan", sold: "Terlaris", "price-asc": "Termurah", new: "Terbaru" }[current.sort || "featured"];
  return (
    <details className="sort-dd">
      <summary aria-label="Urutkan produk">Urut: {label} ▾</summary>
      <div className="sort-menu" role="menu">
        <a href={href("featured")}>Pilihan</a>
        <a href={href("sold")}>Terlaris</a>
        <a href={href("price-asc")}>Termurah</a>
        <a href={href("new")}>Terbaru</a>
      </div>
    </details>
  );
}
