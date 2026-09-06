"use client";
import { useState } from "react";
import { CloseIcon } from "../ui/Icons";

// Notice bar stok/pre-order ala referensi. Tutup = sesi ini saja.
export function NoticeBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="notice-bar" role="status">
      <p>Stok batch ini terbatas — pre-order batch berikutnya dibuka Senin pukul 08.00 WIB.</p>
      <button className="icon-btn" aria-label="Tutup pengumuman" onClick={() => setOpen(false)}>
        <CloseIcon size={18} />
      </button>
    </div>
  );
}

export function Breadcrumb({ trail }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <span key={t.label}>
          {i > 0 && <span aria-hidden="true"> / </span>}
          {t.href && i < trail.length - 1 ? <a href={t.href}>{t.label}</a> : <strong>{t.label}</strong>}
        </span>
      ))}
    </nav>
  );
}
