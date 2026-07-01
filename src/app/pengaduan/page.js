'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldAlert, Send, FileWarning, Upload } from 'lucide-react';

export default function PengaduanPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#ef4444', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <ShieldAlert size={40} /> Layanan Pengaduan (Whistleblowing)
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            Sampaikan laporan Anda jika menemukan adanya pelanggaran, diskriminasi, atau fasilitas yang tidak sesuai standar inklusi. Laporan Anda dijamin kerahasiaannya.
          </p>
        </div>

        {submitted ? (
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <FileWarning size={80} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2rem', color: 'var(--text-color)', fontWeight: '700', marginBottom: '1rem' }}>Laporan Diterima!</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
              Terima kasih, laporan Anda telah masuk ke sistem kami dan akan segera ditindaklanjuti secara rahasia oleh tim internal Kemenag.
            </p>
            <button onClick={() => setSubmitted(false)} style={{ padding: '12px 32px', backgroundColor: 'var(--primary-color)', color: 'white', fontWeight: '700', borderRadius: '30px', border: 'none', cursor: 'pointer' }}>
              Kirim Laporan Baru
            </button>
          </div>
        ) : (
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', borderRadius: '8px', color: '#b91c1c', marginBottom: '1rem', fontSize: '0.95rem' }}>
                <strong>Perhatian:</strong> Anda dapat melaporkan secara Anonim (Tanpa Nama). Identitas Anda tidak akan dilacak.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Nama Anda (Boleh Dikosongkan)</label>
                <input type="text" placeholder="Anonim" style={inputStyle} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Pilih Kategori Aduan <span style={{ color: 'red' }}>*</span></label>
                <select required style={inputStyle}>
                  <option value="">-- Pilih Kategori --</option>
                  <option value="diskriminasi">Sikap Pegawai / Diskriminasi</option>
                  <option value="fasilitas">Fasilitas Rusak / Tidak Standar</option>
                  <option value="pungli">Pungutan Liar (Pungli)</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Detail Kejadian <span style={{ color: 'red' }}>*</span></label>
                <textarea required rows="5" placeholder="Jelaskan secara detail kejadian yang Anda alami..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Unggah Bukti Foto/Video (Opsional)</label>
                <div style={{ border: '2px dashed #d1d5db', borderRadius: '12px', padding: '2rem', textAlign: 'center', backgroundColor: 'var(--card-bg)' }}>
                  <Upload size={32} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
                  <p style={{ color: 'var(--text-light)', margin: 0 }}>Klik atau Seret file ke sini</p>
                </div>
              </div>

              <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: '#ef4444', color: 'white', fontWeight: '800', fontSize: '1.2rem', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '1rem' }}>
                <Send size={20} /> Kirim Laporan Rahasia
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

const inputStyle = { padding: '1rem', borderRadius: '8px', border: '2px solid #d1d5db', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none' };
