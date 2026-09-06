import Image from "next/image";
import { Breadcrumb } from "../../components/ui/Chrome";
import { products } from "../../lib/products";
import { ProductCard } from "../../components/ui/ProductCard";

export const metadata = { title: "Lookbook — Marveile" };

const EDITS = [
  { id: "office", title: "Office → Dinner", desc: "Satu celana, dua suasana. Cutbray satin + blouse satin + blazer." },
  { id: "brunch", title: "Brunch Sunday", desc: "Tweed blazer + knit top + cutbray. Effortless elevated." },
  { id: "korean", title: "Korean Casual", desc: "Knit top + highwaist pants + cardigan. Hangat tapi rapi." },
  { id: "date", title: "Date Night", desc: "Dress satin + blazer. Feminin, polished, tanpa over." },
];

export default function LookbookPage() {
  const hero = products.filter((p) => p.heroFlag).slice(0, 4);
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Lookbook" }]} />
      <h1 style={{ margin: "4px 0 0" }}>Lookbook</h1>
      <p className="meta" style={{ maxWidth: "65ch" }}>
        Bukan sekadar katalog. Lookbook Marveile menjual look — paduan, suasana, kesempatan.
        Pilih suasana, lalu ambil produknya.
      </p>
      <div className="look-grid" style={{ marginTop: 18 }}>
        {EDITS.map((e, i) => (
          <a className="look-card" key={e.id} href={`/catalog?cat=${["cutbray", "blazer", "sweater", "dress"][i] || ""}`}>
            <span className="look-photo">
              <Image src={`https://picsum.photos/seed/marveile-${e.id}/900/1200`} alt={e.title} fill sizes="(max-width: 768px) 50vw, 25vw" />
            </span>
            <span className="look-meta">
              <strong>{e.title}</strong>
              <span>{e.desc}</span>
            </span>
          </a>
        ))}
      </div>
      <div className="section-head"><h2>Hero pieces</h2><a href="/catalog">Lihat semua →</a></div>
      <section className="grid">
        {hero.map((p) => <ProductCard key={p.slug} p={p} />)}
      </section>
    </>
  );
}
