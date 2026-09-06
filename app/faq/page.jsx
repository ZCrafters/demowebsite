import { Breadcrumb } from "../../components/ui/Chrome";

export const metadata = { title: "FAQ — Marveile" };

const FAQS = [
  { q: "Berapa lama pengiriman?", a: "Pesanan diproses 1–2 hari kerja dari Jakarta Barat. Jabodetabek 1–3 hari, luar pulau 3–7 hari tergantung ekspedisi." },
  { q: "Apakah bisa retur?", a: "Retur 7 hari setelah barang diterima untuk kondisi belum dipakai dengan tag lengkap. Hubungi kami via Instagram @marveile.id untuk proses." },
  { q: "Size chart bagaimana?", a: "Setiap PDP memuat tabel ukuran S–XL dengan lingkar pinggang, paha, dan panjang. Toleransi jahitan 1–3 cm." },
  { q: "Apakah bahan bisa dilihat detailnya?", a: "Ya. Setiap PDP memuat material (wool blend, satin, semi wool, dll) dan panduan perawatan." },
  { q: "Bagaimana cara order?", a: "Pilih size & warna di halaman produk, tambah ke keranjang, lalu lanjut ke checkout. Pembayaran QRIS simulasi di demo." },
  { q: "Apakah harga final?", a: "Harga di katalog demo bersifat provisional sampai dikonfirmasi. Untuk order final, hubungi official store Shopee / Tokopedia." },
  { q: "Di mana lokasi toko offline?", a: "Saat ini Marveile hadir secara online melalui marketplace dan kanal sosial. Pembukaan toko offline akan diumumkan." },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <h1 style={{ margin: "4px 0 0" }}>Pertanyaan Sering Ditanya</h1>
      <div className="section-head"><h2>Seputar belanja &amp; produk</h2></div>
      {FAQS.map((f) => (
        <details className="acc" key={f.q}>
          <summary>{f.q}</summary>
          <div className="acc-body">{f.a}</div>
        </details>
      ))}
    </>
  );
}
