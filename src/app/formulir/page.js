'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { UploadCloud, CheckCircle, ArrowRight, ArrowLeft, Phone, Mic, MicOff } from 'lucide-react';

export default function FormulirPage() {
  const [step, setStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // In a real app, handle file processing here
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background-color)' }}>
      <Navbar />
      <div style={{ flex: 1, padding: '120px 2rem 4rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="section-title" style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Formulir Pendataan Kelompok Rentan</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Mohon isi data di bawah ini untuk mempermudah kami dalam memberikan pelayanan prioritas kepada Anda.</p>
        </div>

        {/* Bantuan CS */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <a 
            href="https://wa.me/6285117491212?text=Halo%20Admin%20PTSP,%20saya%20butuh%20bantuan%20untuk%20mengisi%20formulir%20inklusi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#e6f6ee',
              color: 'var(--primary-color)',
              padding: '12px 24px',
              borderRadius: '30px',
              fontWeight: '600',
              textDecoration: 'none',
              border: '1px solid var(--primary-color)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}
          >
            <Phone size={20} /> Butuh Bantuan Mengisi? Hubungi Admin
          </a>
        </div>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', backgroundColor: '#e5e7eb', zIndex: 1, transform: 'translateY(-50%)' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: 0, width: step === 1 ? '0%' : step === 2 ? '50%' : '100%', height: '4px', backgroundColor: 'var(--primary-color)', zIndex: 1, transform: 'translateY(-50%)', transition: 'width 0.3s ease' }}></div>
          
          <StepIndicator currentStep={step} stepNum={1} label="Data Diri" />
          <StepIndicator currentStep={step} stepNum={2} label="Kebutuhan Khusus" />
          <StepIndicator currentStep={step} stepNum={3} label="Dokumen" />
        </div>

        <div className="glass-panel" style={{ borderRadius: '16px', padding: '3rem', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', position: 'relative' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Step 1 */}
            {step === 1 && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-color)' }}>Langkah 1: Informasi Pribadi</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="input-group">
                    <label style={labelStyle}>Nama Lengkap</label>
                    <VoiceInput placeholder="Ketik atau sebutkan nama lengkap Anda" />
                  </div>
                  <div className="input-group">
                    <label style={labelStyle}>Nomor Induk Kependudukan (NIK)</label>
                    <VoiceInput type="text" placeholder="Contoh: 620102xxxxxxxxxx" />
                  </div>
                  <div className="input-group">
                    <label style={labelStyle}>Nomor Telepon / WhatsApp (Bila ada)</label>
                    <VoiceInput type="tel" placeholder="Contoh: 08123456789" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-color)' }}>Langkah 2: Kategori & Kebutuhan Layanan</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="input-group">
                    <label style={labelStyle}>Kategori Kebutuhan Khusus (Pilih salah satu)</label>
                    <select style={inputStyle}>
                      <option value="">-- Pilih Kategori --</option>
                      <option value="disabilitas_fisik">Disabilitas Fisik (Pengguna Kursi Roda, Kruk, dll)</option>
                      <option value="disabilitas_sensorik">Disabilitas Sensorik (Tunanetra / Tunarungu)</option>
                      <option value="lansia">Lansia (Lanjut Usia)</option>
                      <option value="ibu_hamil">Ibu Hamil / Menyusui</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label style={labelStyle}>Layanan yang Ingin Diakses</label>
                    <select style={inputStyle}>
                      <option value="">-- Pilih Layanan --</option>
                      <option value="haji">Pendaftaran Haji / Umrah</option>
                      <option value="nikah">Layanan KUA / Pernikahan</option>
                      <option value="madrasah">Layanan Pendidikan Madrasah</option>
                      <option value="agama">Konsultasi Keagamaan</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label style={labelStyle}>Jelaskan Kebutuhan Spesifik Anda (Opsional)</label>
                    <VoiceTextarea 
                      placeholder="Contoh: Saya membutuhkan pendamping karena menggunakan kursi roda... (Bisa gunakan suara)" 
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-color)' }}>Langkah 3: Unggah Dokumen Pendukung (Opsional)</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>Silakan unggah foto KTP atau dokumen pendukung medis jika diperlukan. Anda bisa melewati langkah ini.</p>
                
                <div 
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  style={{
                    border: `2px dashed ${dragActive ? 'var(--primary-color)' : '#d1d5db'}`,
                    backgroundColor: dragActive ? 'rgba(11, 96, 86, 0.05)' : 'transparent',
                    borderRadius: '12px',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <UploadCloud size={48} color={dragActive ? 'var(--primary-color)' : '#9ca3af'} style={{ margin: '0 auto 1rem' }} />
                  <p style={{ fontWeight: '600', color: 'var(--text-color)', marginBottom: '0.5rem' }}>Tarik dan lepas file di sini, atau klik untuk memilih file</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Format yang didukung: JPG, PNG, PDF (Maks. 5MB)</p>
                  <input type="file" style={{ display: 'none' }} id="file-upload" />
                  <label htmlFor="file-upload" style={{ display: 'inline-block', marginTop: '1rem', padding: '8px 16px', backgroundColor: '#e5e7eb', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Pilih File</label>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              {step > 1 ? (
                <button type="button" onClick={prevStep} style={{...btnStyle, backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db'}}>
                  <ArrowLeft size={20} /> Kembali
                </button>
              ) : <div></div>}

              {step < 3 ? (
                <button type="button" onClick={nextStep} style={{...btnStyle, backgroundColor: 'var(--primary-color)', color: 'white'}}>
                  Selanjutnya <ArrowRight size={20} />
                </button>
              ) : (
                <button type="button" onClick={() => alert('Formulir berhasil dikirim!')} style={{...btnStyle, backgroundColor: '#f7a81b', color: 'white'}}>
                  <CheckCircle size={20} /> Kirim Formulir
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function StepIndicator({ currentStep, stepNum, label }) {
  const isCompleted = currentStep > stepNum;
  const isActive = currentStep === stepNum;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: isActive || isCompleted ? 'var(--primary-color)' : '#ffffff',
        border: `3px solid ${isActive || isCompleted ? 'var(--primary-color)' : '#e5e7eb'}`,
        color: isActive || isCompleted ? '#ffffff' : '#9ca3af',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        transition: 'all 0.3s ease',
        boxShadow: isActive ? '0 0 0 4px rgba(11, 96, 86, 0.2)' : 'none'
      }}>
        {isCompleted ? <CheckCircle size={20} /> : stepNum}
      </div>
      <span style={{ 
        marginTop: '0.5rem', 
        fontSize: '0.85rem', 
        fontWeight: isActive ? '700' : '500', 
        color: isActive ? 'var(--primary-color)' : 'var(--text-light)',
        textAlign: 'center'
      }}>
        {label}
      </span>
    </div>
  );
}

// Komponen Input dengan Voice-to-Text
function VoiceInput({ type = "text", placeholder }) {
  const [value, setValue] = useState('');
  const [isListening, setIsListening] = useState(false);

  const toggleListen = () => {
    if (isListening) return; // Prevent double trigger
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Maaf, browser Anda tidak mendukung fitur suara.");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue(prev => prev ? prev + ' ' + transcript : transcript);
    };
    
    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input 
        type={type} 
        placeholder={placeholder} 
        style={{ ...inputStyle, paddingRight: '3.5rem' }} 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button 
        type="button" 
        onClick={toggleListen}
        title="Gunakan Suara"
        style={{
          position: 'absolute',
          right: '8px',
          background: isListening ? '#ef4444' : 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          animation: isListening ? 'pulse 1.5s infinite' : 'none'
        }}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>
    </div>
  );
}

function VoiceTextarea({ placeholder, rows }) {
  const [value, setValue] = useState('');
  const [isListening, setIsListening] = useState(false);

  const toggleListen = () => {
    if (isListening) return;
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Maaf, browser Anda tidak mendukung fitur suara.");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue(prev => prev ? prev + ' ' + transcript : transcript);
    };
    
    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  return (
    <div style={{ position: 'relative' }}>
      <textarea 
        placeholder={placeholder} 
        rows={rows}
        style={{ ...inputStyle, paddingRight: '3.5rem', resize: 'vertical' }} 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button 
        type="button" 
        onClick={toggleListen}
        title="Gunakan Suara"
        style={{
          position: 'absolute',
          right: '8px',
          bottom: '12px',
          background: isListening ? '#ef4444' : 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          animation: isListening ? 'pulse 1.5s infinite' : 'none'
        }}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>
    </div>
  );
}

const labelStyle = { 
  fontWeight: '600', 
  color: 'var(--text-color)', 
  fontSize: '1.05rem',
  marginBottom: '0.5rem'
};

const inputStyle = { 
  padding: '1rem', 
  borderRadius: '8px', 
  border: '2px solid #d1d5db', 
  width: '100%', 
  fontSize: '1.05rem',
  backgroundColor: 'var(--card-bg)',
  color: 'var(--text-color)',
  transition: 'border-color 0.2s',
  outline: 'none'
};

const btnStyle = {
  padding: '12px 24px', 
  borderRadius: '8px', 
  fontWeight: '700', 
  fontSize: '1.1rem', 
  border: 'none', 
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'transform 0.2s, opacity 0.2s'
};

// Global keyframe for simple animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    input:focus, select:focus, textarea:focus {
      border-color: var(--primary-color) !important;
    }
    button:hover {
      opacity: 0.9;
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
  `;
  document.head.appendChild(style);
}
