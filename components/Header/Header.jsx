import { MEGA_MENU } from "../../lib/products";
import { ChevronDownIcon } from "../ui/Icons";
import { ExpandableSearch } from "./ExpandableSearch";
import { CartBadge } from "./CartBadge";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="site-header">
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
          <a className="nav-link" href="/catalog?sort=hero">Best Seller</a>
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
