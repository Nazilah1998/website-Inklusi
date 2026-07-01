'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');

  const toggleDropdown = (menu, e) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === menu ? '' : menu);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open-lock');
    } else {
      document.body.classList.remove('mobile-menu-open-lock');
    }
    return () => {
      document.body.classList.remove('mobile-menu-open-lock');
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="navbar">
      {/* Top Bar */}
      <div className="navbar-top">
        <div className="navbar-container">
          <Link href="/" className="navbar-brand">
            <div className="logo-circle">
              <Image 
                src="/assets/branding/kemenag.svg" 
                alt="Logo Kemenag" 
                width={36} 
                height={36} 
                className="navbar-logo"
              />
            </div>
            <div className="navbar-title">
              <strong>LAYANAN INKLUSI</strong>
              <span>KEMENTERIAN AGAMA KABUPATEN BARITO UTARA</span>
            </div>
          </Link>
          <div className="navbar-actions desktop-only">
            <Link href="/admin/login" className="btn-login-modern">
              <span className="icon"><User size={18} /></span> 
              <span>Masuk Admin</span>
            </Link>
          </div>
          <button className={`mobile-menu-btn`} onClick={toggleMenu}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      <div 
        className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={isMobileMenuOpen ? toggleMenu : undefined}
      ></div>

      {/* Bottom Bar (Menus) */}
      <div className={`navbar-bottom ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        
        {/* Mobile Sidebar Header */}
        <div className="mobile-sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="logo-circle" style={{ width: '40px', height: '40px' }}>
              <Image 
                src="/assets/branding/kemenag.svg" 
                alt="Logo Kemenag" 
                width={26} 
                height={26} 
              />
            </div>
            <div className="mobile-sidebar-title">
              <strong>KEMENTERIAN AGAMA</strong>
              <span>BARITO UTARA</span>
            </div>
          </div>
          <button onClick={toggleMenu} style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4b5563' }}>
            <X size={20} />
          </button>
        </div>

        <div className="navbar-container menu-container">
          <ul className="navbar-menu">
            <li className="active"><Link href="/" onClick={toggleMenu}>Home</Link></li>
            
            <li className={`dropdown ${openDropdown === 'profile' ? 'open' : ''}`}>
              <span className="dropdown-toggle" tabIndex="0" onClick={(e) => toggleDropdown('profile', e)}>
                Profile 
                <span className={`caret-wrapper ${openDropdown === 'profile' ? 'rotated' : ''}`}>
                  <ChevronDown size={18} />
                </span>
              </span>
              <ul className="dropdown-menu">
                <li><Link href="/profile/latar-belakang" onClick={toggleMenu}>Latar Belakang Inklusi</Link></li>
                <li><Link href="/profile/tim" onClick={toggleMenu}>Tim Layanan Inklusi</Link></li>
                <li><Link href="/profile/fasilitas" onClick={toggleMenu}>Fasilitas Ramah Disabilitas</Link></li>
                <li><Link href="/profile/peta-kantor" onClick={toggleMenu}>Peta Denah Kantor</Link></li>
                <li><Link href="/virtual-tour" onClick={toggleMenu}>Tur Virtual 360°</Link></li>
              </ul>
            </li>

            <li className={`dropdown ${openDropdown === 'informasi' ? 'open' : ''}`}>
              <span className="dropdown-toggle" tabIndex="0" onClick={(e) => toggleDropdown('informasi', e)}>
                Informasi 
                <span className={`caret-wrapper ${openDropdown === 'informasi' ? 'rotated' : ''}`}>
                  <ChevronDown size={18} />
                </span>
              </span>
              <ul className="dropdown-menu">
                <li><Link href="/informasi/pengumuman" onClick={toggleMenu}>Pengumuman</Link></li>
                <li><Link href="/informasi/regulasi" onClick={toggleMenu}>Regulasi / Dasar Hukum</Link></li>
                <li><Link href="/informasi/skm" onClick={toggleMenu}>Survei Kepuasan (SKM)</Link></li>
                <li><Link href="/kamus-isyarat" onClick={toggleMenu}>Kamus Isyarat (BISINDO)</Link></li>
                <li><Link href="/pengaduan" onClick={toggleMenu}>Layanan Pengaduan</Link></li>
              </ul>
            </li>

            <li className={`dropdown ${openDropdown === 'layanan' ? 'open' : ''}`}>
              <span className="dropdown-toggle" tabIndex="0" onClick={(e) => toggleDropdown('layanan', e)}>
                Layanan Khusus 
                <span className={`caret-wrapper ${openDropdown === 'layanan' ? 'rotated' : ''}`}>
                  <ChevronDown size={18} />
                </span>
              </span>
              <ul className="dropdown-menu">
                <li><Link href="/booking" onClick={toggleMenu} style={{ color: 'var(--secondary-color)', fontWeight: '800' }}>Antrean Prioritas</Link></li>
                <li><Link href="/layanan/tracking" onClick={toggleMenu}>Pelacakan Berkas</Link></li>
                <li><Link href="/layanan/kalkulator-zakat" onClick={toggleMenu}>Kalkulator Zakat</Link></li>
                <li><Link href="/layanan/literasi-audio" onClick={toggleMenu}>Pojok Literasi Audio</Link></li>
                <li><Link href="/layanan/panduan-ibadah" onClick={toggleMenu}>Panduan Ibadah (AD)</Link></li>
              </ul>
            </li>

            <li><Link href="/formulir" onClick={toggleMenu}>Form Identifikasi</Link></li>
            <li><Link href="/standar-layanan" onClick={toggleMenu}>Standar Pelayanan</Link></li>
            <li><Link href="/berita" onClick={toggleMenu}>Berita</Link></li>
            <li><Link href="/galeri" onClick={toggleMenu}>Video</Link></li>
            
            <li className="mobile-only login-list-item" style={{ marginTop: '2rem', padding: '0 1rem', paddingBottom: '1rem' }}>
              <Link href="/admin/login" onClick={toggleMenu} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#059669', color: 'white', padding: '12px', borderRadius: '30px', fontWeight: '700', textDecoration: 'none', boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.4)' }}>
                <User size={18} /> Login Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
