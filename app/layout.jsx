import "./globals.css";
import { CartProvider } from "../components/cart/CartProvider";
import { WishlistProvider } from "../components/wishlist/Wishlist";
import { CartDrawer } from "../components/cart/CartDrawer";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { NoticeBar } from "../components/ui/Chrome";

export const metadata = {
  title: "Marveile — Elevated Everyday Fashion",
  description: "Basic yet fashionable to boost your confidence. Dress, top, bawahan, jumpsuit. #marveilebabes"
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Cabinet+Grotesk:wght@500;700;800&display=swap"
        />
        <CartProvider>
          <WishlistProvider>
            <a href="#main" className="skip-link">Lewati ke konten</a>
            <div className="top-strip">Demo — harga provisional, konfirmasi di official store.</div>
            <Header />
            <NoticeBar />
            <CartDrawer />
            <main className="wrap" id="main">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
