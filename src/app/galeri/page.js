/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export default async function GaleriPage() {
  const { data: galeri } = await supabase
    .from('galeri')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#0b6056', fontWeight: '800', marginBottom: '1rem' }}>Galeri & Video</h1>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Dokumentasi visual kegiatan Layanan Inklusi Kementerian Agama Kabupaten Barito Utara.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {galeri && galeri.length > 0 ? (
            galeri.map((item) => (
              <div key={item.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <div style={{ width: '100%', height: '220px', background: '#e5e7eb', position: 'relative' }}>
                  {item.url_file ? (
                    <img src={item.url_file} alt={item.judul} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  ) : null}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#d97706', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>{formatDate(item.tanggal)}</span>
                  <h3 style={{ fontSize: '1.1rem', color: '#111827', fontWeight: '700' }}>{item.judul}</h3>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
              <p>Belum ada data galeri.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
