'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Bell, Calendar, Image as ImageIcon, BookOpen, LogOut } from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';

export default function Sidebar() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Berita', path: '/admin/berita', icon: FileText },
    { name: 'Pengumuman', path: '/admin/pengumuman', icon: Bell },
    { name: 'Agenda', path: '/admin/agenda', icon: Calendar },
    { name: 'Galeri', path: '/admin/galeri', icon: ImageIcon },
    { name: 'Dokumen', path: '/admin/dokumen', icon: BookOpen },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <h2>Panel Admin</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className={pathname === item.path ? 'active' : ''}>
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
  );
}
