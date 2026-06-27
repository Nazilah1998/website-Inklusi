import './ProcessTimeline.css';

const steps = [
  { id: 1, title: "Layanan Penerjemah Bahasa Isyarat", desc: "Tersedia penerjemah bahasa isyarat pada acara-acara resmi dan layanan konsultasi." },
  { id: 2, title: "Fasilitas Huruf Braille", desc: "Penyediaan Al-Qur'an dan dokumen penting kementerian dalam huruf Braille." },
  { id: 3, title: "Aksesibilitas Fisik", desc: "Penyediaan kursi roda, guiding block, dan bidang miring di seluruh satuan kerja." },
  { id: 4, title: "Layanan Prioritas", desc: "Antrean dan loket khusus bagi penyandang disabilitas, lansia, dan ibu hamil." }
];

export default function ProcessTimeline() {
  return (
    <section className="timeline-section">
      <div className="container">
        <h2 className="section-title text-center" style={{ color: 'white' }}>Standar Pelayanan Inklusi</h2>
        <div className="timeline-grid">
          {steps.map((step, index) => (
            <div key={step.id} className="timeline-card">
              <div className="timeline-number">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
