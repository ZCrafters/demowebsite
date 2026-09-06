"use client";
import { useRef, useState } from "react";
import Image from "next/image";

export function Gallery({ images, name }) {
  const [active, setActive] = useState(0);
  const mainRef = useRef(null);
  const list = images?.length ? images.slice(0, 5) : [];
  if (!list.length) return <div className="zoom-wrap" aria-label={`Foto ${name} segera hadir`} />;

  const zoom = (e) => {
    const el = mainRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.querySelector("img").style.transformOrigin =
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  };
  const reset = () => {
    mainRef.current?.querySelector("img")?.style.removeProperty("transform-origin");
  };

  return (
    <div className="gallery">
      <div className="thumbs" role="tablist" aria-label="Thumbnail produk">
        {list.map((src, i) => (
          <button key={i} className="thumb" role="tab" aria-selected={i === active}
            aria-current={i === active} aria-label={`Lihat foto ${i + 1}`} onClick={() => setActive(i)}>
            <Image src={src} alt="" width={76} height={100} loading="lazy" />
          </button>
        ))}
      </div>
      <div className="zoom-wrap" ref={mainRef} onMouseMove={zoom} onMouseLeave={reset}>
        <Image key={list[active]} src={list[active]} alt={name} fill
          sizes="(max-width: 768px) 100vw, 50vw" priority={active === 0} />
      </div>
    </div>
  );
}
