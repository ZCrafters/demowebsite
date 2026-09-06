import Image from "next/image";
import { rupiah } from "../../lib/products";
import { StarIcon } from "./Icons";

export function Rating({ value, reviews, size = 14 }) {
  const full = Math.round(value);
  return (
    <span className="rating" aria-label={`Rating ${value.toFixed(1)} dari 5, ${reviews} ulasan`}>
      <span className="stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} size={size} filled={i <= full} />)}
      </span>
      <span className="rating-num">{value.toFixed(1)}</span>
      {reviews != null && <span className="rating-count">({reviews})</span>}
    </span>
  );
}

export function ProductCard({ p }) {
  return (
    <a className="card" href={`/produk/${p.slug}`}>
      <span className="card-img">
        {p.badge && <span className="badge">{p.badge}</span>}
        <Image src={p.images?.[0]} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
      </span>
      <span className="info">
        <strong className="card-name">{p.name}</strong>
        <Rating value={p.rating} reviews={p.reviews} />
        <span className="price">{rupiah(p.price)}</span>
      </span>
    </a>
  );
}

export function SkeletonCard() {
  return (
    <div className="card skeleton" aria-hidden="true">
      <span className="card-img shimmer" />
      <span className="info">
        <span className="sk-line shimmer" style={{ width: "80%" }} />
        <span className="sk-line shimmer" style={{ width: "50%" }} />
        <span className="sk-line shimmer" style={{ width: "60%" }} />
      </span>
    </div>
  );
}
