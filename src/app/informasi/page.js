import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { Info, Bell } from 'lucide-react';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export default async function InformasiPage() {
  const { data: pengumuman } = await supabase
    .from('pengumuman')
    .select('*')
    .eq('status', 'Aktif')
    .order('created_at', { ascending: false });

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#0b6056', fontWeight: '800', marginBottom: '1rem' }}>Informasi & Pengumuman</h1>
          <p style={{ color: '#4b5563', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Pusat informasi terbaru terkait program dan jadwal kegiatan Layanan Inklusi.</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {pengumuman && pengumuman.length > 0 ? (
            pengumuman.map((item) => (
              <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#fef3c7', color: '#d97706', padding: '1rem', borderRadius: '50%' }}>
                  <Bell size={24} />
                </div>
                <div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>Diumumkan pada: {formatDate(item.tanggal)}</span>
                  <h3 style={{ fontSize: '1.25rem', color: '#111827', fontWeight: '700', marginBottom: '0.75rem' }}>{item.judul}</h3>
                  <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6' }}>{item.konten}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280', background: 'white', borderRadius: '12px', border: '1px dashed #d1d5db' }}>
              <Info size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>Belum ada informasi pengumuman terbaru.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
