'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, CheckCircle, Clock, FileText, Printer, FileSearch } from 'lucide-react';

export default function TrackingPage() {
  const [resi, setResi] = useState('');
  const [status, setStatus] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!resi.trim()) return;
    
    // Simulate API Call for tracking
    setStatus({
      resi: resi,
      layanan: 'Rekomendasi Paspor Haji',
      pemohon: 'Bapak Ahmad',
      steps: [
        { title: 'Berkas Diterima', time: '12 Okt, 08:00', done: true },
        { title: 'Verifikasi Persyaratan', time: '12 Okt, 10:30', done: true },
        { title: 'Tanda Tangan Pejabat', time: '13 Okt, 09:00', done: true },
        { title: 'Dokumen Selesai (Siap Diambil)', time: 'Menunggu', done: false },
      ]
    });
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <FileSearch size={40} /> Pelacakan Berkas
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}>
            Pantau sejauh mana dokumen Anda diproses secara real-time.
          </p>
        </div>

        <div className="glass-panel" style={{ borderRadius: '16px', padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <input 
              type="text" 
              value={resi}
              onChange={(e) => setResi(e.target.value)}
              placeholder="Masukkan Nomor Resi Anda (Contoh: B-12345)"
              style={{ flex: 1, padding: '1.25rem', fontSize: '1.2rem', borderRadius: '12px', border: '2px solid #d1d5db', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', outline: 'none' }}
              required
            />
            <button type="submit" style={{ padding: '0 2rem', backgroundColor: 'var(--primary-color)', color: 'white', fontWeight: '700', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
              <Search size={20} /> Lacak
            </button>
          </form>

          {status && (
            <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2.5rem', color: '#1f2937' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '2px dashed #d1d5db', paddingBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Hasil Pencarian: {status.resi}</h2>
                  <p style={{ fontSize: '1.1rem', color: '#4b5563' }}><FileText size={18} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Layanan: <strong>{status.layanan}</strong></p>
                  <p style={{ fontSize: '1.1rem', color: '#4b5563' }}>Pemohon: {status.pemohon}</p>
                </div>
                <button style={{ backgroundColor: 'var(--secondary-color)', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Printer size={18} /> Cetak Bukti
                </button>
              </div>

              {/* Timeline */}
              <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                {/* Vertical Line */}
                <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px' }}></div>
                
                {status.steps.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative', marginBottom: idx === status.steps.length - 1 ? '0' : '2rem' }}>
                    <div style={{ position: 'absolute', left: '-2rem', top: '2px', backgroundColor: step.done ? '#10b981' : '#d1d5db', borderRadius: '50%', padding: '4px', color: 'white' }}>
                      {step.done ? <CheckCircle size={20} /> : <Clock size={20} />}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: step.done ? '#1f2937' : '#9ca3af', margin: '0 0 0.25rem 0' }}>{step.title}</h3>
                      <p style={{ color: '#6b7280', margin: 0 }}>{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '3rem', backgroundColor: '#ecfdf5', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <p style={{ color: '#047857', fontWeight: '600', margin: 0 }}>Fitur Ekstra: Dokumen ini juga akan dikirimkan notifikasinya secara otomatis ke nomor WhatsApp Anda saat selesai.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
