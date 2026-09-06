"use client";
import { useState } from "react";
import { FilterIcon, CloseIcon } from "../ui/Icons";
import { FilterFields } from "./Filters";

export function FilterBottomSheet({ current, count }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-outline filter-fab" onClick={() => setOpen(true)} aria-expanded={open}>
        <FilterIcon size={18} /> Filter{count ? ` (${count})` : ""}
      </button>
      <div className={`sheet${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="search-scrim" onClick={() => setOpen(false)} />
        <div className="sheet-panel" role="dialog" aria-label="Filter produk">
          <div className="sheet-grab" aria-hidden="true" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <strong>Filter</strong>
            <button className="icon-btn" aria-label="Tutup filter" onClick={() => setOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <form action="/catalog" method="get" onSubmit={() => setOpen(false)}>
            <div style={{ display: "grid", gap: 16 }}>
              <FilterFields current={current} />
            </div>
            <button className="btn" type="submit" style={{ width: "100%", marginTop: 16 }}>Tampilkan hasil</button>
          </form>
        </div>
      </div>
    </>
  );
}
