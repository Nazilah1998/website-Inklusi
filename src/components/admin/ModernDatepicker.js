'use client';
import { Calendar } from 'lucide-react';
import { useRef } from 'react';

export default function ModernDatepicker({ value, onChange, name, label = "Tanggal", type = "date" }) {
  const inputRef = useRef(null);
  
  return (
    <div className="form-group">
      <label>{label}</label>
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}
        onClick={() => inputRef.current?.showPicker && inputRef.current.showPicker()}
      >
        <input 
          type={type} 
          ref={inputRef}
          name={name}
          value={value} 
          onChange={onChange}
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            paddingLeft: '2.5rem',
            border: '1.5px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontFamily: 'inherit',
            outline: 'none',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: '#111827'
          }}
          className="modern-date-input"
        />
        <Calendar 
          size={18} 
          color="#6b7280" 
          style={{ position: 'absolute', left: '0.875rem', pointerEvents: 'none' }} 
        />
      </div>
    </div>
  );
}
