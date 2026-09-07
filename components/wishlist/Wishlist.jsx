"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const Ctx = createContext(null);
const KEY = "marveile-wishlist-v1";

export function WishlistProvider({ children }) {
  const [slugs, setSlugs] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(raw)) setSlugs(raw.filter((s) => typeof s === "string"));
    } catch { /* abaikan */ }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return; // jangan timpa localStorage sebelum load awal selesai
    try {
      localStorage.setItem(KEY, JSON.stringify(slugs));
    } catch { /* mode memori */ }
  }, [slugs, hydrated]);

  const has = (slug) => slugs.includes(slug);
  const toggle = (slug) =>
    setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  const value = useMemo(() => ({ slugs: slugs, has: has, toggle: toggle }), [slugs]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useWishlist = () => useContext(Ctx);

export function WishlistHeart({ slug, name, size = 20 }) {
  const { has, toggle } = useWishlist();
  const on = has(slug);
  return (
    <button
      className={`wish-heart${on ? " on" : ""}`}
      aria-label={on ? `Hapus ${name} dari wishlist` : `Simpan ${name} ke wishlist`}
      aria-pressed={on}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(slug); }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill={on ? "currentColor" : "none"}
        stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path d="M12 20.5S4 15.5 4 9.8A4.3 4.3 0 0 1 8.3 5.5c1.6 0 2.9.9 3.7 2.2a4.6 4.6 0 0 1 3.7-2.2A4.3 4.3 0 0 1 20 9.8c0 5.7-8 10.7-8 10.7z" />
      </svg>
    </button>
  );
}
