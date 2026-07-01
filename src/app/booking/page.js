'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, Clock, User, CheckCircle, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    layanan: '',
    tanggal: '',
    waktu: '',
    keterangan: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate dummy booking code
    const code = 'VIP-' + Math.floor(1000 + Math.random() * 9000);
    setBookingCode(code);
    setIsSubmitted(true);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '1rem' }}>
            Antrean Prioritas Online
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
            Layanan penjadwalan khusus bagi penyandang disabilitas, lansia, dan ibu hamil agar dapat dilayani tanpa antrean reguler.
          </p>
        </div>

        {isSubmitted ? (
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '3rem', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <CheckCircle size={64} color="#059669" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '1.8rem', color: '#111827', fontWeight: '700', marginBottom: '1rem' }}>Booking Berhasil!</h2>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '2rem' }}>
              Jadwal kunjungan Anda telah tercatat dalam sistem kami.
            </p>
            <div style={{ backgroundColor: '#f3f4f6', padding: '2rem', borderRadius: '12px', display: 'inline-block', marginBottom: '2rem' }}>
              <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>Kode Antrean Anda:</p>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '900', letterSpacing: '2px' }}>{bookingCode}</h3>
            </div>
            <div style={{ textAlign: 'left', backgroundColor: 'var(--card-bg)', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <h4 style={{ fontWeight: '700', marginBottom: '1rem', color: 'var(--text-color)' }}>Detail Kunjungan:</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><User size={18}/> <strong>Nama:</strong> {formData.nama}</li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><Calendar size={18}/> <strong>Tanggal:</strong> {formData.tanggal}</li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><Clock size={18}/> <strong>Waktu:</strong> {formData.waktu}</li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}><MapPin size={18}/> <strong>Lokasi:</strong> PTSP Kemenag Barito Utara</li>
              </ul>
            </div>
            <p style={{ color: '#d97706', fontSize: '0.95rem', fontWeight: '600', marginBottom: '2rem' }}>
              Tunjukkan kode antrean ini kepada petugas resepsionis saat Anda tiba di lokasi.
            </p>
            <Link href="/" style={{ display: 'inline-block', padding: '12px 32px', backgroundColor: 'var(--primary-color)', color: 'white', fontWeight: '700', borderRadius: '30px', textDecoration: 'none' }}>
              Kembali ke Beranda
            </Link>
          </div>
        ) : (
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                  <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Nama Lengkap</label>
                  <input required type="text" name="nama" value={formData.nama} onChange={handleInputChange} style={{ padding: '1rem', borderRadius: '8px', border: '2px solid #d1d5db', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none' }} placeholder="Masukkan nama Anda" />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Kategori Bantuan</label>
                  <select required name="kategori" value={formData.kategori} onChange={handleInputChange} style={{ padding: '1rem', borderRadius: '8px', border: '2px solid #d1d5db', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none' }}>
                    <option value="">-- Pilih --</option>
                    <option value="disabilitas_fisik">Disabilitas Fisik (Kursi Roda)</option>
                    <option value="disabilitas_sensorik">Disabilitas Sensorik (Tunanetra/Tunarungu)</option>
                    <option value="lansia">Lansia</option>
                    <option value="ibu_hamil">Ibu Hamil / Menyusui</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Layanan Tujuan</label>
                  <select required name="layanan" value={formData.layanan} onChange={handleInputChange} style={{ padding: '1rem', borderRadius: '8px', border: '2px solid #d1d5db', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none' }}>
                    <option value="">-- Pilih --</option>
                    <option value="haji">Pendaftaran Haji / Umrah</option>
                    <option value="nikah">Urusan KUA / Pernikahan</option>
                    <option value="pendidikan">Pendidikan Madrasah</option>
                    <option value="umum">Layanan Umum / Konsultasi</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Tanggal Kedatangan</label>
                  <input required type="date" name="tanggal" value={formData.tanggal} onChange={handleInputChange} style={{ padding: '1rem', borderRadius: '8px', border: '2px solid #d1d5db', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Perkiraan Waktu Tiba</label>
                  <input required type="time" name="waktu" value={formData.waktu} onChange={handleInputChange} style={{ padding: '1rem', borderRadius: '8px', border: '2px solid #d1d5db', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
                  <label style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Catatan Tambahan (Opsional)</label>
                  <textarea name="keterangan" value={formData.keterangan} onChange={handleInputChange} rows="3" style={{ padding: '1rem', borderRadius: '8px', border: '2px solid #d1d5db', backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none', resize: 'vertical' }} placeholder="Contoh: Saya butuh kursi roda saat tiba nanti..."></textarea>
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: 'var(--secondary-color)', color: 'var(--text-color)', fontWeight: '800', fontSize: '1.2rem', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }}>
                  Ambil Antrean Prioritas
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
