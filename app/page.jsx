import { products, bestSellers, newArrivals } from "../lib/products";
import { Hero, CategoryGrid, BestSellerCarousel, NewArrivals } from "../components/home/HomeSections";
import { PromoPeriod } from "../components/home/PromoPeriod";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <BestSellerCarousel items={bestSellers} />
      <PromoPeriod />
      <NewArrivals items={newArrivals} />
      <p className="meta" style={{ marginTop: 24 }}>
        Marveile.id — fashion wanita Jakarta Barat. {products.length} produk katalog demo.
      </p>
    </>
  );
}
