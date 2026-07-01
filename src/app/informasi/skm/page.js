'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Smile, Frown, Meh, Send } from 'lucide-react';

export default function SKMPage() {
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating) {
      setSubmitted(true);
      speakText("Terima kasih atas penilaian Anda. Laporan berhasil dikirim.");
    }
  };

  const handleRating = (val, message) => {
    setRating(val);
    speakText(message);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel previous utterance
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '1rem' }}>
            Survei Kepuasan Masyarakat (SKM)
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            Bantu kami meningkatkan kualitas layanan publik Kemenag Barito Utara dengan memberikan penilaian Anda.
          </p>
        </div>

        {submitted ? (
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <Smile size={80} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2rem', color: 'var(--text-color)', fontWeight: '700', marginBottom: '1rem' }}>Terima Kasih!</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>
              Penilaian Anda sangat berarti bagi komitmen kami dalam melayani masyarakat.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel" style={{ borderRadius: '16px', padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '1.5rem', textAlign: 'center', color: 'var(--text-color)', marginBottom: '2.5rem', fontWeight: '600' }}>
              Bagaimana pendapat Anda tentang pelayanan kami hari ini?
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
              {/* Puas */}
              <button 
                type="button" 
                onClick={() => handleRating('puas', 'Anda memilih: Sangat Puas')}
                style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', 
                  padding: '2rem 1rem', borderRadius: '16px', border: rating === 'puas' ? '4px solid #10b981' : '2px solid transparent',
                  backgroundColor: rating === 'puas' ? '#ecfdf5' : 'rgba(0,0,0,0.03)',
                  cursor: 'pointer', transition: 'all 0.2s', width: '130px'
                }}
              >
                <Smile size={64} color={rating === 'puas' ? '#10b981' : '#9ca3af'} />
                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: rating === 'puas' ? '#10b981' : '#6b7280' }}>Sangat Puas</span>
              </button>

              {/* Cukup */}
              <button 
                type="button" 
                onClick={() => handleRating('cukup', 'Anda memilih: Biasa Saja')}
                style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', 
                  padding: '2rem 1rem', borderRadius: '16px', border: rating === 'cukup' ? '4px solid #f59e0b' : '2px solid transparent',
                  backgroundColor: rating === 'cukup' ? '#fffbeb' : 'rgba(0,0,0,0.03)',
                  cursor: 'pointer', transition: 'all 0.2s', width: '130px'
                }}
              >
                <Meh size={64} color={rating === 'cukup' ? '#f59e0b' : '#9ca3af'} />
                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: rating === 'cukup' ? '#f59e0b' : '#6b7280' }}>Biasa Saja</span>
              </button>

              {/* Kecewa */}
              <button 
                type="button" 
                onClick={() => handleRating('kecewa', 'Anda memilih: Kurang Puas')}
                style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', 
                  padding: '2rem 1rem', borderRadius: '16px', border: rating === 'kecewa' ? '4px solid #ef4444' : '2px solid transparent',
                  backgroundColor: rating === 'kecewa' ? '#fef2f2' : 'rgba(0,0,0,0.03)',
                  cursor: 'pointer', transition: 'all 0.2s', width: '130px'
                }}
              >
                <Frown size={64} color={rating === 'kecewa' ? '#ef4444' : '#9ca3af'} />
                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: rating === 'kecewa' ? '#ef4444' : '#6b7280' }}>Kurang Puas</span>
              </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.75rem' }}>Saran & Masukan (Opsional)</label>
              <textarea 
                rows="4" 
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #d1d5db', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', fontSize: '1rem', resize: 'vertical', outline: 'none' }}
                placeholder="Tuliskan saran Anda di sini..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={!rating}
              style={{ 
                width: '100%', padding: '16px', borderRadius: '12px', border: 'none', 
                backgroundColor: rating ? 'var(--primary-color)' : '#d1d5db',
                color: 'white', fontWeight: '700', fontSize: '1.2rem', 
                cursor: rating ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
              }}
            >
              <Send size={20} /> Kirim Penilaian
            </button>
          </form>
        )}
      </div>
      <Footer />
    </main>
  );
}
