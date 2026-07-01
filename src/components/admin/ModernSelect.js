'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function ModernSelect({ value, onChange, options, label = "Status", name }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div className="form-group" ref={containerRef}>
      <label>{label}</label>
      <div 
        style={{
          position: 'relative',
          width: '100%',
          border: `1.5px solid ${isOpen ? 'var(--primary-color)' : '#d1d5db'}`,
          borderRadius: '8px',
          padding: '0.625rem 0.875rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          background: 'white',
          boxShadow: isOpen ? '0 0 0 3px rgba(11, 96, 86, 0.1)' : 'none',
          transition: 'all 0.2s'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ fontSize: '0.9rem', color: '#111827', fontWeight: 500 }}>
          {selectedOption?.label}
        </span>
        <ChevronDown size={18} color="#6b7280" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
        
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            width: '100%',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            zIndex: 1000,
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
            animation: 'fadeIn 0.15s ease'
          }}>
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={(e) => { e.stopPropagation(); handleSelect(opt.value); }}
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: value === opt.value ? '#f0fdf4' : 'transparent',
                  color: value === opt.value ? 'var(--primary-color)' : '#374151',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => { if (value !== opt.value) e.target.style.background = '#f9fafb' }}
                onMouseLeave={e => { if (value !== opt.value) e.target.style.background = 'transparent' }}
              >
                <span style={{ fontWeight: value === opt.value ? 600 : 400 }}>{opt.label}</span>
                {value === opt.value && <Check size={16} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
