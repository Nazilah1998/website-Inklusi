import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function FormulirPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#0b6056', fontWeight: '800', marginBottom: '1rem' }}>Formulir Identifikasi Kelompok Rentan</h1>
          <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>Silakan isi formulir di bawah ini untuk pendataan layanan prioritas.</p>
        </div>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', color: '#374151' }}>Nama Lengkap</label>
              <input type="text" placeholder="Masukkan nama lengkap" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', color: '#374151' }}>NIK (Nomor Induk Kependudukan)</label>
              <input type="text" placeholder="Masukkan 16 digit NIK" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', color: '#374151' }}>Kategori Kelompok Rentan</label>
              <select style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', width: '100%', background: 'white' }}>
                <option value="">Pilih Kategori...</option>
                <option value="disabilitas_fisik">Disabilitas Fisik</option>
                <option value="disabilitas_sensorik">Disabilitas Sensorik (Tunanetra/Tunarungu)</option>
                <option value="disabilitas_intelektual">Disabilitas Intelektual</option>
                <option value="lansia">Lansia (Di atas 60 tahun)</option>
                <option value="ibu_hamil">Ibu Hamil / Menyusui</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', color: '#374151' }}>Jenis Layanan yang Dibutuhkan</label>
              <textarea placeholder="Jelaskan kebutuhan layanan Anda (misal: Pendaftaran Haji, Nikah, dll)" rows="4" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', width: '100%', resize: 'vertical' }}></textarea>
            </div>
            <button type="button" style={{ background: '#0b6056', color: 'white', padding: '1rem', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
              Kirim Formulir
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
