import './Statistics.css';

export default function Statistics() {
  return (
    <section className="statistics-section">
      <div className="container stats-grid">
        <div className="stat-card">
          <h3 className="stat-number">1,250+</h3>
          <p className="stat-label">Layanan Aksesibel</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-number">340</h3>
          <p className="stat-label">KUA Ramah Disabilitas</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-number">5,400+</h3>
          <p className="stat-label">Masyarakat Terlayani</p>
        </div>
      </div>
    </section>
  );
}
