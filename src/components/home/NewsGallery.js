/* eslint-disable @next/next/no-img-element */
import './NewsGallery.css';
import Image from 'next/image';
import Link from 'next/link';
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

export default async function NewsGallery() {
  const { data: news } = await supabase
    .from('berita')
    .select('*')
    .eq('status', 'Aktif')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <section className="news-section container">
      <h2 className="section-title text-center">Berita & Kegiatan Layanan Inklusi</h2>
      <div className="news-grid">
        {news && news.length > 0 ? (
          news.map((item) => (
            <div key={item.id} className="news-card">
              <div className="news-image-wrapper">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.judul} className="placeholder-image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                ) : (
                  <div className="placeholder-image"></div>
                )}
              </div>
              <div className="news-content">
                <span className="news-date">{formatDate(item.tanggal)}</span>
                <h3 className="news-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.judul}</h3>
                <p className="news-desc" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.konten}</p>
                <Link href={`/berita/${item.slug}`} className="read-more">Baca Selengkapnya &rarr;</Link>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%', color: '#6b7280' }}>Belum ada data berita.</p>
        )}
      </div>
    </section>
  );
}
