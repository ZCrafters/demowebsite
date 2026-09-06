"use client";
import { useState } from "react";

const PAY = ["VISA", "Mastercard", "GoPay", "OVO", "DANA", "Transfer Bank"];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Masukkan alamat email yang valid.");
      return;
    }
    setErr("");
    setDone(true);
  };
  return (
    <footer className="site-footer">
      <div className="foot-grid">
        <div>
          <h3>Bantuan</h3>
          <a href="/about">Cara belanja</a>
          <a href="/about">Info pengiriman</a>
          <a href="/about">Retur &amp; penukaran</a>
          <a href="/about">Hubungi kami</a>
        </div>
        <div>
          <h3>Tentang Marveile</h3>
          <a href="/about">Brand kami</a>
          <a href="/catalog">Katalog</a>
          <a href="/catalog?sort=new">New arrivals</a>
        </div>
        <div>
          <h3>Sosial Media</h3>
          <a href="https://www.instagram.com/marveile.id/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@marveile.id" target="_blank" rel="noreferrer">TikTok</a>
          <a href="https://www.facebook.com/Marveile.id/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://shopee.co.id/marveile.official" target="_blank" rel="noreferrer">Shopee</a>
          <a href="https://www.tokopedia.com/marveile" target="_blank" rel="noreferrer">Tokopedia</a>
        </div>
        <div>
          <h3>Dapatkan info &amp; promo</h3>
          {done ? (
            <p style={{ fontSize: 14 }} role="status">Terima kasih! Email kamu terdaftar.</p>
          ) : (
            <form className="news-form" onSubmit={submit} noValidate>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat email" aria-label="Alamat email" aria-invalid={err ? "true" : undefined} />
              <button className="btn" type="submit">Daftar</button>
            </form>
          )}
          {err && <p className="field" style={{ marginTop: 8 }}><span className="err">{err}</span></p>}
          <div className="pay-grid" aria-label="Metode pembayaran">
            {PAY.map((p) => <span key={p} className="pay-chip">{p}</span>)}
            <span className="pay-chip">QRIS</span>
          </div>
        </div>
      </div>
      <div className="foot-bottom">© 2026 Marveile.id demo · Jakarta Barat · #marveilebabes</div>
    </footer>
  );
}
