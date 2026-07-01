/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';

export default function DragDropImage({ value, onChange, label = "Upload Gambar" }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Tolong unggah file gambar (JPG/PNG).');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result); // Pass base64 back
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div 
        className={`drag-drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !value && fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--primary-color)' : '#d1d5db'}`,
          borderRadius: '8px',
          padding: value ? '0' : '2rem',
          textAlign: 'center',
          backgroundColor: isDragging ? '#f0fdf4' : (value ? '#f3f4f6' : '#f9fafb'),
          cursor: value ? 'default' : 'pointer',
          position: 'relative',
          transition: 'all 0.2s',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '160px'
        }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        
        {value ? (
          <>
            <img src={value} alt="Preview" style={{ width: '100%', maxHeight: '250px', objectFit: 'contain' }} />
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'rgba(239, 68, 68, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
            <UploadCloud size={40} color={isDragging ? 'var(--primary-color)' : '#9ca3af'} />
            <p style={{ margin: 0, fontWeight: 600, color: isDragging ? 'var(--primary-color)' : '#4b5563' }}>
              Tarik & Lepas gambar di sini
            </p>
            <span style={{ fontSize: '0.8rem' }}>Atau klik untuk memilih file</span>
          </div>
        )}
      </div>
    </div>
  );
}
