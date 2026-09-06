import "./globals.css";
import { CartProvider } from "../components/cart/CartProvider";
import { CartDrawer } from "../components/cart/CartDrawer";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const metadata = {
  title: "Marveile — Elevated Everyday Fashion",
  description: "Basic yet fashionable to boost your confidence. Dress, top, bawahan, jumpsuit. #marveilebabes",
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <CartProvider>
          <a href="#main" className="skip-link">
            Lewati ke konten
          </a>
          <div className="top-strip">Demo — harga provisional, konfirmasi di official store.</div>
          <Header />
          <CartDrawer />
          <main className="wrap" id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
