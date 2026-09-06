import Image from "next/image";
import { ProductCard } from "../ui/ProductCard";
import { Reveal } from "../motion/Reveal";

export function Hero() {
  return (
    <section className="hero-banner hero-under" aria-label="Koleksi unggulan">
      <Image src="https://picsum.photos/seed/marveile-hero/1600/900" alt="Model memakai koleksi Marveile" fill priority
        sizes="(max-width: 768px) 100vw, 1400px" />
      <Reveal className="hero-copy" staggerChildren>
        <p className="kicker">ELEVATED EVERYDAY FASHION</p>
        <h1>Look expensive without overspending.</h1>
        <p>1 celana, 3 looks — potongan highwaist favorit #marveilebabes.</p>
        <a className="btn" href="/catalog">Belanja Sekarang →</a>
      </Reveal>
    </section>
  );
}

const CATS = [
  { slug: "dress", label: "Dress", seed: "mv-dress" },
  { slug: "tops", label: "Top", seed: "mv-top" },
  { slug: "cutbray", label: "Cutbray", seed: "mv-cutbray" },
  { slug: "pants", label: "Celana", seed: "mv-pants" },
  { slug: "skort", label: "Rok / Skort", seed: "mv-skort" },
];

export function CategoryGrid() {
  return (
    <section aria-label="Kategori">
      <div className="section-head"><h2>Belanja per Kategori</h2><a href="/catalog">Lihat semua →</a></div>
      <Reveal className="cat-grid" staggerChildren>
        {CATS.map((c) => (
          <a key={c.slug} className="cat-card" href={`/catalog?cat=${c.slug}`}>
            <Image src={`https://picsum.photos/seed/${c.seed}/600/800`} alt={c.label} fill sizes="(max-width: 768px) 50vw, 20vw" loading="lazy" />
            <span className="cat-label">{c.label}</span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}

export function BestSellerCarousel({ items }) {
  return (
    <section aria-label="Best seller">
      <div className="section-head"><h2>Best Seller</h2><a href="/catalog?sort=sold">Lihat semua →</a></div>
      <Reveal className="h-scroll" staggerChildren>
        {items.map((p) => <ProductCard key={p.slug} p={p} />)}
      </Reveal>
    </section>
  );
}

export function NewArrivals({ items }) {
  return (
    <section aria-label="New arrivals">
      <div className="section-head"><h2>New Arrivals</h2><a href="/catalog?sort=new">Lihat semua →</a></div>
      <Reveal className="grid" staggerChildren>
        {items.map((p) => <ProductCard key={p.slug} p={p} />)}
      </Reveal>
    </section>
  );
}
