import './QuickLinks.css';
import { FileEdit, Siren, Mail } from 'lucide-react';

export default function QuickLinks() {
  return (
    <section className="quick-links-section container">
      <div className="quick-links-grid">
        <a href="#" className="link-card sp4n">
          <div className="icon"><FileEdit size={32} /></div>
          <div className="text-content">
            <h3>SP4N LAPOR</h3>
            <p>Sistem Pengelolaan Pengaduan Pelayanan Publik Nasional</p>
          </div>
        </a>
        <a href="#" className="link-card wbs">
          <div className="icon"><Siren size={32} /></div>
          <div className="text-content">
            <h3>Whistleblowing System</h3>
            <p>Laporkan indikasi tindak pidana korupsi</p>
          </div>
        </a>
        <a href="#" className="link-card dumas">
          <div className="icon"><Mail size={32} /></div>
          <div className="text-content">
            <h3>Dumas Online</h3>
            <p>Layanan Pengaduan Masyarakat Kementerian Agama</p>
          </div>
        </a>
      </div>
    </section>
  );
}
