'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PlayCircle, Eye, Volume2 } from 'lucide-react';

export default function PanduanIbadahPage() {
  const [adEnabled, setAdEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '1rem' }}>
            Video Panduan Ibadah (Audio Description)
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            Layanan video panduan ibadah (seperti manasik haji) yang dilengkapi dengan Deskripsi Audio khusus bagi sahabat tuna netra.
          </p>
        </div>

        <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          
          {/* Header Video */}
          <div style={{ padding: '1.5rem 2rem', backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-color)', margin: 0 }}>Tata Cara Manasik Haji (Bagian 1)</h2>
            <button 
              onClick={() => setAdEnabled(!adEnabled)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: '700', transition: 'all 0.2s',
                backgroundColor: adEnabled ? 'var(--secondary-color)' : '#f3f4f6',
                color: adEnabled ? '#000' : '#4b5563',
                border: adEnabled ? '2px solid var(--primary-color)' : '1px solid #d1d5db'
              }}
            >
              {adEnabled ? <Volume2 size={20} /> : <Eye size={20} />}
              {adEnabled ? 'Deskripsi Audio: HIDUP' : 'Deskripsi Audio: MATI'}
            </button>
          </div>

          {/* Dummy Video Player */}
          <div style={{ width: '100%', height: '500px', backgroundColor: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!playing ? (
              <button 
                onClick={() => setPlaying(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <PlayCircle size={100} color="white" />
              </button>
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <p style={{ fontSize: '1.5rem', opacity: 0.5 }}>[ Video Sedang Berjalan... ]</p>
                
                {/* Audio Description Caption */}
                {adEnabled && (
                  <div style={{ 
                    position: 'absolute', bottom: '10%', backgroundColor: 'rgba(0,0,0,0.8)', padding: '1rem 2rem', 
                    borderRadius: '8px', color: 'var(--secondary-color)', fontSize: '1.2rem', textAlign: 'center',
                    maxWidth: '80%', borderLeft: '4px solid var(--secondary-color)'
                  }}>
                    <i>[Suara Narator AD]: &quot;Di layar tampak rombongan jemaah haji sedang berjalan mengelilingi Ka&apos;bah (Tawaf). Sebagian besar mengenakan pakaian ihram putih bersih.&quot;</i>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ padding: '2rem', backgroundColor: 'var(--card-bg)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-color)', marginBottom: '1rem' }}>Tentang Fitur Ini</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
              Fitur Deskripsi Audio (AD) dirancang untuk menceritakan elemen visual penting dalam video yang tidak dapat dilihat oleh pengguna tuna netra. Ketika dihidupkan, narator akan membacakan teks deskriptif di jeda dialog video utama, sehingga setiap jemaah memiliki pemahaman yang setara mengenai tata cara ibadah.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
