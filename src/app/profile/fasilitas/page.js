import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BadgeCheck } from 'lucide-react';

const fasilitasData = [
  { id: 1, nama: 'Ramp Kursi Roda', deskripsi: 'Jalur landai di pintu masuk utama untuk memudahkan pergerakan pengguna kursi roda.' },
  { id: 2, nama: 'Toilet Difabel', deskripsi: 'Toilet dengan ukuran lebih luas, dilengkapi handrail (pegangan rambat), dan wastafel yang rendah.' },
  { id: 3, nama: 'Loket Prioritas PTSP', deskripsi: 'Loket khusus tanpa antrean reguler bagi disabilitas, lansia, dan ibu hamil.' },
  { id: 4, nama: 'Ruang Laktasi', deskripsi: 'Ruangan khusus yang nyaman dan tertutup bagi ibu menyusui.' },
  { id: 5, nama: 'Guiding Block', deskripsi: 'Jalur pemandu taktil berwarna kuning di lantai untuk mengarahkan pengunjung tunanetra.' },
  { id: 6, nama: 'Kursi Roda & Alat Bantu', deskripsi: 'Penyediaan kursi roda dan kruk gratis yang bisa dipinjam selama berada di area kantor.' }
];

export default function FasilitasPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '1rem' }}>
            Fasilitas Ramah Disabilitas
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Komitmen kami tidak hanya sekadar pada pelayanan administrasi, melainkan juga dibuktikan melalui penyediaan sarana prasarana fisik yang aksesibel.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {fasilitasData.map((item) => (
            <div key={item.id} className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1.5rem', transition: 'transform 0.3s ease' }}>
              <div style={{ backgroundColor: 'rgba(247, 168, 27, 0.2)', padding: '1rem', borderRadius: '12px', marginRight: '1.5rem' }}>
                <BadgeCheck size={40} color="var(--secondary-color)" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-color)', fontWeight: '700', marginBottom: '0.5rem' }}>{item.nama}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.5' }}>{item.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
