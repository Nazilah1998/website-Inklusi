import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, Download } from 'lucide-react';

const regulasiData = [
  { id: 1, tahun: '2016', judul: 'Undang-Undang Nomor 8 Tahun 2016 tentang Penyandang Disabilitas', kategori: 'Undang-Undang' },
  { id: 2, tahun: '2020', judul: 'Peraturan Pemerintah Nomor 39 Tahun 2020 tentang Akomodasi yang Layak untuk Penyandang Disabilitas dalam Proses Peradilan', kategori: 'Peraturan Pemerintah' },
  { id: 3, tahun: '2021', judul: 'Instruksi Menteri Agama Nomor 1 Tahun 2021 tentang Peningkatan Kualitas Pelayanan Publik', kategori: 'Instruksi Menteri' },
  { id: 4, tahun: '2022', judul: 'SK Kepala Kantor Kemenag Barito Utara tentang Pembentukan Tim Layanan Inklusi', kategori: 'SK Kepala Kantor' }
];

export default function RegulasiPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '1rem' }}>
            Regulasi & Dasar Hukum
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            Kumpulan dokumen peraturan perundang-undangan dan pedoman kebijakan yang menjadi landasan pelaksanaan layanan inklusi.
          </p>
        </div>
        
        <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>No</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Tahun</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Judul Dokumen</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Kategori</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', textAlign: 'center' }}>Unduh</th>
                </tr>
              </thead>
              <tbody>
                {regulasiData.map((item, index) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-color)' }}>{index + 1}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-color)', fontWeight: '600' }}>{item.tahun}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-color)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <FileText size={18} color="var(--primary-color)" style={{ flexShrink: 0 }} />
                        <span>{item.judul}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }}>
                        {item.kategori}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center' }}>
                      <button style={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s', display: 'inline-flex', justifyContent: 'center' }}>
                        <Download size={18} color="#4b5563" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
