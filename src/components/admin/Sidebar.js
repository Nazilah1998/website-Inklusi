'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Bell, Calendar, Image as ImageIcon, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Berita', path: '/admin/berita', icon: FileText },
    { name: 'Pengumuman', path: '/admin/pengumuman', icon: Bell },
    { name: 'Agenda', path: '/admin/agenda', icon: Calendar },
    { name: 'Galeri', path: '/admin/galeri', icon: ImageIcon },
    { name: 'Dokumen', path: '/admin/dokumen', icon: BookOpen },
  ];

  return (
    <>
      <div className="admin-mobile-header">
        <button className="admin-mobile-menu-btn" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
        <span className="admin-mobile-header-title">Panel Admin</span>
      </div>

      <div className={`admin-mobile-backdrop ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>

      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <h2>Panel Admin</h2>
          <button className="admin-mobile-close-btn" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className={pathname === item.path ? 'active' : ''} onClick={() => setIsOpen(false)}>
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <form action={logoutAction}>
          <button type="submit" className="btn-logout">
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </form>
      </div>
      </aside>
    </>
  );
}
