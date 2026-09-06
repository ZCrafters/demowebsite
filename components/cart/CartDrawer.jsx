"use client";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { rupiah } from "../../lib/products";
import { CloseIcon, TrashIcon } from "../ui/Icons";

export function CartDrawer() {
  const { items, subtotal, setQty, remove, open, setOpen } = useCart();
  return (
    <div className={`drawer${open ? " open" : ""}`} aria-hidden={!open}>
      <div className="search-scrim" onClick={() => setOpen(false)} />
      <aside className="drawer-panel" role="dialog" aria-label="Keranjang belanja">
        <div className="drawer-head">
          <h2>Keranjang ({items.reduce((n, i) => n + i.qty, 0)})</h2>
          <button className="icon-btn" aria-label="Tutup keranjang" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-art" aria-hidden="true">
              <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M4 5h2l2.4 11h10.4l2-8H7.2" /></svg>
            </span>
            <strong>Keranjang masih kosong.</strong>
            <p style={{ color: "var(--color-muted)", fontSize: 14 }}>Temukan look favoritmu di katalog Marveile.</p>
            <a className="btn" href="/catalog" onClick={() => setOpen(false)}>Mulai Belanja →</a>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((i) => (
                <article className="cart-line" key={`${i.slug}-${i.size}-${i.color}`}>
                  <Image src={i.images?.[0]} alt={i.name} width={72} height={96} loading="lazy" />
                  <div>
                    <p className="nm" style={{ margin: 0 }}>{i.name}</p>
                    <p className="vr" style={{ margin: "2px 0 0" }}>{i.size} · {i.color}</p>
                    <div className="stepper" role="group" aria-label={`Jumlah ${i.name}`}>
                      <button aria-label="Kurangi" onClick={() => setQty(i.slug, i.size, i.color, i.qty - 1)}>−</button>
                      <span aria-live="polite">{i.qty}</span>
                      <button aria-label="Tambah" onClick={() => setQty(i.slug, i.size, i.color, i.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", display: "grid", gap: 8, justifyItems: "end" }}>
                    <strong style={{ fontSize: 14 }}>{rupiah(i.price * i.qty)}</strong>
                    <button className="icon-btn" aria-label={`Hapus ${i.name}`} onClick={() => remove(i.slug, i.size, i.color)}>
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="subtotal"><span>Subtotal</span><span>{rupiah(subtotal)}</span></div>
              <a className="btn" href="/checkout" onClick={() => setOpen(false)}>Checkout →</a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
