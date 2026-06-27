'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Bottom Bar (Menus) */}
      <div className={`navbar-bottom ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="navbar-container menu-container">
          <ul className="navbar-menu">
            <li className="active"><Link href="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="/profile" onClick={toggleMenu}>Profile <span>⌄</span></Link></li>
            <li><Link href="/informasi" onClick={toggleMenu}>Informasi <span>⌄</span></Link></li>
            <li><Link href="/formulir" onClick={toggleMenu}>Formulir Online Identifikasi Kelompok Rentan</Link></li>
            <li><Link href="/standar-layanan" onClick={toggleMenu}>Standar Pelayanan</Link></li>
            <li><Link href="/berita" onClick={toggleMenu}>Berita</Link></li>
            <li><Link href="/galeri" onClick={toggleMenu}>Video</Link></li>
            <li className="mobile-only login-list-item">
              <Link href="/admin/login" className="btn-login-modern mobile-login-btn" onClick={toggleMenu}>
                <span className="icon"><User size={18} /></span> 
                <span>Masuk Admin</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
