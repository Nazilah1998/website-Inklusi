import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PlayCircle } from 'lucide-react';

const kamusData = [
  { id: 1, kata: 'Haji', deskripsi: 'Ibadah rukun Islam kelima yang dilakukan di Makkah.' },
  { id: 2, kata: 'Zakat', deskripsi: 'Sejumlah harta tertentu yang diwajibkan Allah diserahkan kepada yang berhak.' },
  { id: 3, kata: 'Nikah', deskripsi: 'Akad yang menghalalkan pergaulan antara laki-laki dan perempuan.' },
  { id: 4, kata: 'Madrasah', deskripsi: 'Sekolah atau perguruan (biasanya yang berdasarkan agama Islam).' },
  { id: 5, kata: 'KUA', deskripsi: 'Kantor Urusan Agama, tempat pencatatan pernikahan dan layanan keagamaan.' },
  { id: 6, kata: 'Halal', deskripsi: 'Sesuatu yang diizinkan atau diperbolehkan oleh syariat Islam.' },
];

export default function KamusIsyaratPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '1rem' }}>
            Kamus Isyarat (BISINDO) Layanan Agama
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Kumpulan video terjemahan bahasa isyarat untuk mempermudah teman Tuli dalam memahami istilah-istilah keagamaan dan layanan di lingkungan Kementerian Agama.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {kamusData.map((item) => (
            <div key={item.id} className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}>
              <div style={{ width: '100%', height: '200px', backgroundColor: '#0b6056', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                {/* Dummy Video Placeholder */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(45deg, #0b6056, #095048)', opacity: 0.8 }}></div>
                <PlayCircle size={64} color="rgba(255,255,255,0.8)" style={{ position: 'relative', zIndex: 1 }} />
                <span style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', zIndex: 1 }}>0:15</span>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: 'var(--card-bg)' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-color)', fontWeight: '700', marginBottom: '0.5rem' }}>{item.kata}</h3>
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
