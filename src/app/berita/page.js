/* eslint-disable @next/next/no-img-element */
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export default async function BeritaPage() {
  const { data: news } = await supabase
    .from('berita')
    .select('*')
    .eq('status', 'Aktif')
    .order('created_at', { ascending: false });

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#0b6056', fontWeight: '800', marginBottom: '1rem' }}>Berita Terkini</h1>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Ikuti perkembangan informasi dan kegiatan terbaru dari Layanan Inklusi Kementerian Agama Kabupaten Barito Utara.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {news && news.length > 0 ? (
            news.map((item) => (
              <div key={item.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '220px', background: '#e5e7eb', position: 'relative' }}>
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.judul} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  ) : null}
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.875rem', color: '#d97706', fontWeight: '600', marginBottom: '0.5rem' }}>{formatDate(item.tanggal)}</span>
                  <h3 style={{ fontSize: '1.25rem', color: '#111827', fontWeight: '700', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.judul}</h3>
                  <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>{item.konten}</p>
                  <Link href={`/berita/${item.slug}`} style={{ color: '#0b6056', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    Baca Selengkapnya <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
              <p>Belum ada data berita.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
