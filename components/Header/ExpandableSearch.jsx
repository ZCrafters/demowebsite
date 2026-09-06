"use client";
import { useEffect, useRef, useState } from "react";
import { SearchIcon, CloseIcon } from "../ui/Icons";

const POPULAR = ["cutbray", "satin", "skort", "blazer", "dress", "knit"];

// Search overlay header — elemen terpisah dari search inline katalog.
export function ExpandableSearch() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <>
      <button className="icon-btn" aria-label="Cari produk" aria-expanded={open} onClick={() => setOpen(true)}>
        <SearchIcon />
      </button>
      <div className={`search-overlay${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="search-scrim" onClick={() => setOpen(false)} />
        <div className="search-panel" role="dialog" aria-label="Pencarian produk">
          <div className="search-panel-inner">
            <form className="search-form" action="/catalog" method="get" role="search">
              <input ref={inputRef} name="q" type="search" placeholder="Cari: cutbray, satin, skort…" aria-label="Cari produk" autoComplete="off" tabIndex={open ? 0 : -1} />
              <button className="icon-btn" type="button" aria-label="Tutup pencarian" onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </form>
            <div className="pills" aria-label="Pencarian populer">
              {POPULAR.map((t) => (
                <a key={t} className="pill" href={`/catalog?q=${t}`}>{t}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
