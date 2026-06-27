import './Documents.css';
import { FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default async function Documents() {
  const { data: docs } = await supabase
    .from('dokumen')
    .select('*')
    .eq('status', 'Aktif')
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <section className="documents-section container">
      <h2 className="section-title text-center">Dokumen & Panduan</h2>
      <div className="docs-grid">
        {docs && docs.length > 0 ? (
          docs.map(doc => (
            <div key={doc.id} className="doc-card">
              <div className="doc-icon"><FileText size={32} /></div>
              <div className="doc-info">
                <h3>{doc.judul}</h3>
                <span className="doc-type">{doc.jenis}</span>
              </div>
              <a href={doc.url_file} target="_blank" rel="noreferrer" className="btn-download" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Unduh</a>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%', color: '#6b7280' }}>Belum ada dokumen.</p>
        )}
      </div>
    </section>
  );
}
