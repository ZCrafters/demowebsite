"use client";
import { useRef, useState } from "react";
import { animate } from "animejs";
import { rupiah } from "../../lib/products";
import { useCart } from "../cart/CartProvider";
import { Rating } from "../ui/ProductCard";
import { CheckIcon, ShieldIcon, TruckIcon } from "../ui/Icons";
import { ShareButtons } from "./Share";

const SWATCH = { Black: "#1c1917", White: "#ffffff", Cream: "#f3ead9", Ivory: "#fffff0", Choco: "#5b3a29", Grey: "#9aa0a6", Blue: "#3b6ea5", Maroon: "#7e2a3a", Pink: "#f2b8c6", Sage: "#9caf88", Green: "#3f6212", Midnight: "#1e2a4a", Lilac: "#c8b6e2", Yellow: "#f2d06b", Brown: "#7a4a21", Gray: "#9aa0a6", Khaki: "#b6a77a", Navy: "#22304a", Denim: "#4a6fa5", Pastel: "#f6dfe3" };

export function BuyBox({ p }) {
  const { add, setOpen } = useCart();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(p.colors?.[0] || "");
  const [tried, setTried] = useState(false);
  const [added, setAdded] = useState(false);
  const btnRef = useRef(null);
  const needSize = !size && tried;

  const buy = () => {
    if (!size) {
      setTried(true);
      document.getElementById("size-group")?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    add(p.slug, size, color, 1);
    setAdded(true);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && btnRef.current) {
      animate(btnRef.current, { scale: [1, 0.94, 1], duration: 320, ease: "out(2)" });
    }
    setOpen(true);
  };

  return (
    <div>
      {p.badge && <span className="badge" style={{ position: "static" }}>{p.badge}</span>}
      <h1>{p.name}</h1>
      <p className="meta">{p.gender}, {p.sizeRange}</p>
      {p.originalPrice ? (
        <p style={{ margin: "6px 0" }}>
          <s className="price-was">{rupiah(p.originalPrice)}</s>{" "}
          <span className="price price-promo" style={{ fontSize: 24 }}>{rupiah(p.price)}</span>
          <br /><span className="promo-note">{p.promoNote} hingga {p.promoUntil}</span>
        </p>
      ) : (
        <p className="price" style={{ fontSize: 24 }}>{rupiah(p.price)}</p>
      )}
      <Rating value={p.rating} reviews={p.reviews} />
      {p.provisional && <p className="meta">Harga provisional — konfirmasi di official store.</p>}

      <p className="opt-label" id="size-group">
        <span>Pilih size</span>
        {needSize && <span className="opt-hint" role="alert">Wajib pilih size dulu</span>}
      </p>
      <div className="size-grid" role="group" aria-label="Pilihan size" aria-describedby={needSize ? "size-err" : undefined}>
        {(p.sizes || []).map((s) => (
          <button key={s} className="size-btn" aria-pressed={size === s} onClick={() => setSize(s)}>
            {s} {size === s && <CheckIcon size={16} />}
          </button>
        ))}
      </div>
      {needSize && <p id="size-err" className="opt-hint">Pilih salah satu size untuk lanjut.</p>}

      <p className="opt-label"><span>Warna{color ? `: ${color}` : ""}</span></p>
      <div className="swatches" role="group" aria-label="Pilihan warna">
        {(p.colors || []).map((c) => (
          <button key={c} className="swatch" aria-pressed={color === c} aria-label={c} title={c}
            style={{ "--sw": SWATCH[c.split(" ")[0]] || "#999" }} onClick={() => setColor(c)}>
            {color === c && <CheckIcon size={18} />}
          </button>
        ))}
      </div>

      <div className="buy-sticky">
        <button ref={btnRef} className="btn" onClick={buy} disabled={needSize && false} aria-disabled={!size}>
          Tambah ke Keranjang
        </button>
      </div>
      {added && size && <p className="meta" role="status">Ditambahkan: {p.name} · {size} · {color}.</p>}

      <p className="meta" style={{ display: "flex", gap: 16, marginTop: 14 }}>
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><TruckIcon size={18} /> Kirim 1–3 hari</span>
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><ShieldIcon size={18} /> Retur 7 hari</span>
      </p>

      <ShareButtons slug={p.slug} name={p.name} />

      <details className="acc" open>
        <summary>Detail Produk</summary>
        <div className="acc-body">
          {p.name}, koleksi rajut/fashion wanita Marveile. Material {p.material || "-"}.
          <table className="size-table" style={{ marginTop: 10 }} aria-label="Size chart">
            <thead><tr><th>Size</th><th>Pinggang</th><th>Paha</th><th>Panjang</th></tr></thead>
            <tbody>
              {[["S", 66, 58, 94], ["M", 70, 60, 95], ["L", 74, 62, 96], ["XL", 78, 64, 97]].map(([s, w, t, l]) => (
                <tr key={s}><td>{s}</td><td>{w}</td><td>{t}</td><td>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <details className="acc">
        <summary>Bahan &amp; Perawatan</summary>
        <div className="acc-body">Cuci dengan air dingin, jemur teduh, setrika suhu rendah. Toleransi jahitan 1–3 cm.</div>
      </details>
      <details className="acc">
        <summary>Info Pengiriman</summary>
        <div className="acc-body">Dikirim dari Jakarta Barat 1–3 hari kerja. Gratis ongkir marketplace pada promo tertentu.</div>
      </details>
    </div>
  );
}
