'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function BeritaContent({ kontenAsli }) {
  const [isEasyMode, setIsEasyMode] = useState(false);

  // Fungsi simulasi untuk merangkum teks kompleks menjadi bahasa sederhana
  const generateEasyText = (text) => {
    return `RINGKASAN SEDERHANA:\n\n1. Ada informasi penting terkait layanan dari Kementerian Agama.\n2. Layanan ini dibuat agar semua orang (termasuk lansia dan difabel) lebih mudah mengurus keperluan.\n3. Jika butuh bantuan, Anda bisa langsung menghubungi petugas atau menggunakan fitur bantuan di web ini.\n\n(Catatan: Ini adalah contoh fitur penyederhanaan teks otomatis untuk membantu pembaca memahami poin utama dari berita birokrasi yang panjang).`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setIsEasyMode(!isEasyMode)}
          title="Mode Bahasa Sederhana (Easy-to-Read)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: isEasyMode ? 'var(--secondary-color)' : '#f3f4f6',
            color: isEasyMode ? 'var(--text-color)' : '#4b5563',
            border: isEasyMode ? '2px solid var(--primary-color)' : '1px solid #d1d5db',
            borderRadius: '20px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: isEasyMode ? '0 4px 10px rgba(247, 168, 27, 0.3)' : 'none'
          }}
        >
          <BookOpen size={18} />
          {isEasyMode ? 'Mode Biasa' : 'Mode Bahasa Sederhana'}
        </button>
      </div>

      <div style={{ 
        color: '#4b5563', 
        fontSize: isEasyMode ? '1.25rem' : '1.1rem', 
        lineHeight: '1.8', 
        whiteSpace: 'pre-wrap',
        backgroundColor: isEasyMode ? '#fffbeb' : 'transparent',
        padding: isEasyMode ? '1.5rem' : '0',
        borderRadius: '12px',
        border: isEasyMode ? '2px dashed #f59e0b' : 'none',
        transition: 'all 0.3s'
      }}>
        {isEasyMode ? (
          <div style={{ fontWeight: '500', color: '#111827' }}>
            {generateEasyText(kontenAsli)}
          </div>
        ) : (
          kontenAsli
        )}
      </div>
    </div>
  );
}
