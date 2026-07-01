import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Bell, Calendar } from 'lucide-react';

const pengumumanData = [
  { id: 1, tanggal: '12 Oktober 2023', judul: 'Jadwal Pemeliharaan Sistem Web Inklusi', isi: 'Diberitahukan kepada seluruh pengguna bahwa akan ada pemeliharaan sistem pada hari Sabtu pukul 00:00 - 04:00 WIB. Beberapa fitur mungkin tidak dapat diakses.' },
  { id: 2, tanggal: '05 September 2023', judul: 'Pembukaan Kuota Haji Tambahan Khusus Lansia', isi: 'Kementerian Agama mengalokasikan kuota prioritas khusus bagi jemaah lansia berusia di atas 80 tahun. Silakan cek syarat dan ketentuan di PTSP.' },
  { id: 3, tanggal: '20 Agustus 2023', judul: 'Pelatihan Bahasa Isyarat bagi Pegawai PTSP', isi: 'Dalam rangka meningkatkan layanan inklusif, seluruh pegawai PTSP diwajibkan mengikuti pelatihan dasar bahasa isyarat (BISINDO) tahap 1.' }
];

export default function PengumumanPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '1rem' }}>
            Pengumuman
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            Informasi penting, jadwal operasional, dan pemberitahuan terbaru terkait layanan di Kemenag Barito Utara.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {pengumumanData.map((item) => (
            <div key={item.id} className="glass-panel" style={{ borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(11, 96, 86, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)', flexShrink: 0 }}>
                <Bell size={28} />
              </div>
              <div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#d97706', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  <Calendar size={14} /> {item.tanggal}
                </span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-color)', fontWeight: '700', marginBottom: '0.75rem' }}>{item.judul}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: '1.6' }}>{item.isi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
