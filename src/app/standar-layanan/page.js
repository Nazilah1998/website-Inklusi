import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { FileText } from 'lucide-react';

export default async function StandarLayananPage() {
  const { data: dokumen } = await supabase
    .from('dokumen')
    .select('*')
    .eq('status', 'Aktif')
    .order('created_at', { ascending: false });

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#0b6056', fontWeight: '800', marginBottom: '1rem' }}>Standar Pelayanan & Dokumen</h1>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Unduh pedoman, Standar Operasional Prosedur (SOP), dan panduan Layanan Inklusi kami.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {dokumen && dokumen.length > 0 ? (
            dokumen.map((doc) => (
              <div key={doc.id} style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: '#ecfdf5', color: '#059669', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <FileText size={32} />
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#111827', fontWeight: '700', marginBottom: '0.5rem' }}>{doc.judul}</h3>
                <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600', padding: '0.25rem 0.75rem', background: '#f3f4f6', borderRadius: '99px', marginBottom: '1.5rem' }}>Format: {doc.jenis}</span>
                <a href={doc.url_file} target="_blank" rel="noreferrer" style={{ marginTop: 'auto', background: '#0b6056', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', width: '100%', transition: 'background 0.2s' }}>
                  Unduh Dokumen
                </a>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#6b7280', background: 'white', borderRadius: '16px', border: '1px dashed #d1d5db' }}>
              <p>Belum ada dokumen standar layanan.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
