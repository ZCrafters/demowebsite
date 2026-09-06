import "./globals.css";

export const metadata = {
  title: "Marveile — Elevated Everyday Fashion",
  description: "Basic yet fashionable to boost your confidence. Pants, cutbray, skort, blazer, dress, knit. Demo catalog, no real checkout yet.",
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="top-strip">Demo catalog — prices provisional, confirmed at official stores.</div>
        <header className="site-header">
          <nav className="nav" aria-label="Navigasi utama">
            <a className="wordmark" href="/">marveile<span>.</span></a>
            <div className="nav-links">
              <a href="/catalog">Katalog</a>
              <a href="/kategori/cutbray">Cutbray</a>
              <a href="/kategori/pants">Pants</a>
              <a href="/kategori/dress">Dress</a>
              <a href="/about">About</a>
            </div>
          </nav>
        </header>
        <main className="wrap">{children}</main>
        <footer className="site-footer">
          <div className="foot">
            <span>© 2026 Marveile demo.</span>
            <span>Shopee · Tokopedia · Blibli · IG/TikTok @marveile.id</span>
            <span>#marveilebabes</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
