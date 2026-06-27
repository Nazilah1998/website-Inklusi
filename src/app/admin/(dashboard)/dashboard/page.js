import { supabase } from '@/lib/supabase';

export const revalidate = 0; // force dynamic render

export default async function AdminDashboard() {
  const [
    { count: countBerita },
    { count: countPengumuman },
    { count: countAgenda },
    { count: countDokumen }
  ] = await Promise.all([
    supabase.from('berita').select('*', { count: 'exact', head: true }),
    supabase.from('pengumuman').select('*', { count: 'exact', head: true }).eq('status', 'Aktif'),
    supabase.from('agenda').select('*', { count: 'exact', head: true }).eq('status', 'Mendatang'),
    supabase.from('dokumen').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {[
          { label: 'Total Berita', count: countBerita || 0 },
          { label: 'Pengumuman Aktif', count: countPengumuman || 0 },
          { label: 'Agenda Mendatang', count: countAgenda || 0 },
          { label: 'Dokumen', count: countDokumen || 0 },
        ].map((stat, idx) => (
          <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem', marginTop: 0 }}>{stat.label}</h3>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', margin: 0 }}>{stat.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
