"use client";
import { useState } from "react";
import { MEGA_MENU } from "../../lib/products";
import { MenuIcon, CloseIcon, SearchIcon } from "../ui/Icons";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="icon-btn hamburger" aria-label="Buka menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <MenuIcon />
      </button>
      <div className={`mobile-nav${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="search-scrim" onClick={() => setOpen(false)} />
        <div className="mobile-panel" role="dialog" aria-label="Menu navigasi">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>marveile.</strong>
            <button className="icon-btn" aria-label="Tutup menu" onClick={() => setOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <a href="/catalog" onClick={() => setOpen(false)}>Semua Produk</a>
          {MEGA_MENU.flatMap((g) => g.links).filter((l, i, a) => a.findIndex((x) => x.cat === l.cat) === i).map((l) => (
            <a key={l.cat} href={`/catalog?cat=${l.cat}`} onClick={() => setOpen(false)} style={{ textTransform: "capitalize" }}>{l.cat}</a>
          ))}
          <a href="/catalog" onClick={() => setOpen(false)} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <SearchIcon size={18} /> Cari produk
          </a>
          <a href="/about" onClick={() => setOpen(false)}>Tentang Marveile</a>
        </div>
      </div>
    </>
  );
}
