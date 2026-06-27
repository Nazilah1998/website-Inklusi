import Sidebar from '@/components/admin/Sidebar';
import './admin.css';

export const metadata = {
  title: 'Admin Dashboard - Layanan Inklusi',
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
