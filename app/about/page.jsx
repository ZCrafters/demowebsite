export const metadata = { title: "Tentang Marveile", robots: { index: false } };

export default function About() {
  return (
    <>
      <p className="kicker" style={{ marginTop: 20 }}>TENTANG KAMI</p>
      <h1>Basic yet fashionable to boost your confidence.</h1>
      <p style={{ maxWidth: "65ch" }}>
        Marveile.id adalah fashion wanita dari Jakarta Barat — Korean-casual / office-chic
        dengan harga affordable mid-range (Rp179.000–Rp299.000). Kuat di bawahan:
        cutbray, highwaist pants, skort, plus dress, top, dan jumpsuit.
      </p>
      <h2>Cara belanja</h2>
      <p style={{ maxWidth: "65ch" }}>Pilih size &amp; warna di halaman produk → tambah ke keranjang → checkout 3 langkah (simulasi QRIS) — atau checkout via Shopee / Tokopedia official store.</p>
      <h2>Retur &amp; penukaran</h2>
      <p style={{ maxWidth: "65ch" }}>Retur 7 hari untuk produk belum dipakai dengan tag. Hubungi kami via Instagram @marveile.id.</p>
      <p><a className="btn" href="/catalog">Mulai Belanja →</a></p>
    </>
  );
}
