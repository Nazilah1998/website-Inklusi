import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MousePointerClick, RefreshCcw, Hand, Eye } from 'lucide-react';
import Link from 'next/link';

export default function VirtualTourPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '1rem' }}>
            Tur Virtual 360°
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
            Jelajahi fasilitas pelayanan dan aksesibilitas di Kantor Kementerian Agama Kabupaten Barito Utara secara virtual sebelum Anda berkunjung.
          </p>
        </div>

        <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header Controls */}
          <div style={{ padding: '1rem 2rem', backgroundColor: '#095048', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={tourBtnStyle}><MousePointerClick size={18} /> Ruang Tunggu</button>
              <button style={tourBtnStyle}><MousePointerClick size={18} /> Loket Prioritas</button>
              <button style={tourBtnStyle}><MousePointerClick size={18} /> Toilet Difabel</button>
              <button style={tourBtnStyle}><MousePointerClick size={18} /> Jalur Ramp</button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', color: 'white', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Hand size={16}/> Geser layar untuk melihat</span>
            </div>
          </div>

          {/* Dummy 360 Viewer */}
          <div style={{ width: '100%', height: '600px', backgroundColor: '#e5e7eb', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'radial-gradient(circle, #cbd5e1 0%, #94a3b8 100%)' }}>
            {/* Grid lines to simulate 3D space */}
            <div style={{ position: 'absolute', width: '200%', height: '200%', border: '1px solid rgba(255,255,255,0.2)', backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px', transform: 'perspective(500px) rotateX(60deg)' }}></div>
            
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, color: '#334155' }}>
              <RefreshCcw size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Simulasi Tur Virtual 360°</h2>
              <p style={{ maxWidth: '400px', margin: '0 auto' }}>Di sini akan ditampilkan plugin foto panorama 360 derajat (seperti Google Street View) untuk memperlihatkan kondisi riil fasilitas kantor.</p>
            </div>

            {/* Hotspots */}
            <div style={{ position: 'absolute', top: '40%', left: '30%', backgroundColor: 'rgba(247, 168, 27, 0.9)', color: 'white', padding: '8px 16px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
              <Eye size={16} /> Loket Khusus Lansia
            </div>
            <div style={{ position: 'absolute', top: '60%', right: '25%', backgroundColor: 'rgba(247, 168, 27, 0.9)', color: 'white', padding: '8px 16px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
              <Eye size={16} /> Area Kursi Roda
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/booking" style={{ display: 'inline-block', padding: '12px 32px', backgroundColor: 'var(--secondary-color)', color: 'var(--text-color)', fontWeight: '700', borderRadius: '30px', textDecoration: 'none', transition: 'opacity 0.2s' }}>
            Lanjutkan ke Antrean Prioritas &rarr;
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}

const tourBtnStyle = {
  backgroundColor: 'rgba(255,255,255,0.1)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.2)',
  padding: '8px 16px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};
