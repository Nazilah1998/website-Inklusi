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

export default async function DetailBeritaPage({ params }) {
  const { slug } = await params;
  
  const { data: berita } = await supabase
    .from('berita')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!berita) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h1>Berita Tidak Ditemukan</h1>
          <Link href="/berita" style={{ color: '#0b6056', marginTop: '1rem' }}>&larr; Kembali ke Daftar Berita</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <Link href="/berita" style={{ color: '#0b6056', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontWeight: '500' }}>
          &larr; Kembali ke Daftar Berita
        </Link>
        
        <article style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: '2.5rem' }}>
          <span style={{ fontSize: '0.95rem', color: '#d97706', fontWeight: '600', marginBottom: '1rem', display: 'block' }}>{formatDate(berita.tanggal)}</span>
          <h1 style={{ fontSize: '2.5rem', color: '#111827', fontWeight: '800', marginBottom: '2rem', lineHeight: '1.2' }}>{berita.judul}</h1>
          
          {berita.thumbnail && (
            <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem' }}>
              <img src={berita.thumbnail} alt={berita.judul} style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '450px', objectFit: 'cover' }} />
            </div>
          )}
          
          <div style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {berita.konten}
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
