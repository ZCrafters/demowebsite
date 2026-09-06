"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MEGA_MENU } from "../../lib/products";
import { ChevronDownIcon } from "../ui/Icons";
import { ExpandableSearch } from "./ExpandableSearch";
import { CartBadge } from "./CartBadge";
import { MobileNav } from "./MobileNav";

const THUMBS = {
  Dress: "mv-mega-dress",
  Top: "mv-mega-top",
  Bawahan: "mv-mega-bottom",
  "Outer & Set": "mv-mega-outer",
};

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  return (
    <header className={`site-header${overlay ? " overlay" : ""}`}>
      <nav className="nav" aria-label="Navigasi utama">
        <MobileNav />
        <a href="/" className="wordmark" aria-label="Marveile, beranda">marveile<span>.</span></a>
        <div className="nav-center">
          <div className="has-mega">
            <button className="nav-link" aria-haspopup="true">
              Kategori <ChevronDownIcon size={16} />
            </button>
            <div className="mega" role="menu" aria-label="Mega menu kategori">
              {MEGA_MENU.map((g) => (
                <div key={g.title}>
                  <span className="mega-thumb" aria-hidden="true">
                    <Image src={`https://picsum.photos/seed/${THUMBS[g.title] || "mv-mega"}/360/240`} alt="" width={180} height={120} loading="lazy" />
                  </span>
                  <h3>{g.title}</h3>
                  <p>{g.desc}</p>
                  {g.links.map((l) => (
                    <a key={l.label} href={`/catalog?cat=${l.cat}`}>{l.label}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <a className="nav-link" href="/catalog">Semua Produk</a>
          <a className="nav-link" href="/catalog?sort=sold">Best Seller</a>
          <a className="nav-link" href="/about">Tentang</a>
        </div>
        <div className="nav-right">
          <ExpandableSearch />
          <a className="icon-btn" href="/about" aria-label="Akun">
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"><path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0" /></svg>
          </a>
          <CartBadge />
        </div>
      </nav>
    </header>
  );
}
