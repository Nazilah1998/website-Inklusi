'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ModernDatepicker from '@/components/admin/ModernDatepicker';
import ModernSelect from '@/components/admin/ModernSelect';

const EMPTY_FORM = { acara: '', deskripsi: '', waktu: '', lokasi: '', status: 'Mendatang' };

export default function AgendaAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  async function fetchData() {
    const { data: result } = await supabase.from('agenda').select('*').order('created_at', { ascending: false });
    if (result) setData(result);
    setLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => { fetchData(); }, 0);
    return () => clearTimeout(timer);
  }, []);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  function openAdd() { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); }
  function openEdit(item) {
    setForm({
      acara: item.acara,
      deskripsi: item.deskripsi || '',
      waktu: item.waktu ? item.waktu.slice(0, 16) : '',
      lokasi: item.lokasi || '',
      status: item.status || 'Mendatang'
    });
    setEditId(item.id);
    setShowModal(true);
  }
  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    let error;
    if (editId) ({ error } = await supabase.from('agenda').update(form).eq('id', editId));
    else ({ error } = await supabase.from('agenda').insert([form]));
    setSaving(false);
    if (error) { showToast('Gagal menyimpan: ' + error.message, 'error'); return; }
    showToast(editId ? 'Agenda berhasil diperbarui!' : 'Agenda berhasil ditambahkan!');
    setShowModal(false);
    fetchData();
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('agenda').delete().eq('id', id);
    if (error) { showToast('Gagal menghapus: ' + error.message, 'error'); return; }
    showToast('Agenda berhasil dihapus!');
    setDeleteId(null);
    fetchData();
  }

  return (
    <div>
      {toast && <div className={`admin-toast ${toast.type}`}><CheckCircle size={18} /> {toast.msg}</div>}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Kelola Agenda</h1>
        <button className="btn-primary" onClick={openAdd}><Plus size={18} /> Tambah Agenda</button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>No</th><th>Nama Acara</th><th>Waktu</th><th>Lokasi</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="6" style={{ textAlign: 'center' }}><Loader2 className="animate-spin" /> Memuat...</td></tr>
            : data.length === 0 ? <tr><td colSpan="6" style={{ textAlign: 'center' }}>Belum ada data agenda.</td></tr>
            : data.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td style={{ maxWidth: '220px' }}>{item.acara}</td>
                <td>{item.waktu ? new Date(item.waktu).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}</td>
                <td>{item.lokasi || '-'}</td>
                <td><span className={`status-badge ${item.status?.toLowerCase() || 'mendatang'}`}>{item.status || 'Mendatang'}</span></td>
                <td><div className="action-buttons">
                  <button className="btn-icon btn-edit" onClick={() => openEdit(item)}><Edit2 size={16} /></button>
                  <button className="btn-icon btn-delete" onClick={() => setDeleteId(item.id)}><Trash2 size={16} /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? 'Edit Agenda' : 'Tambah Agenda'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group">
                <label>Nama Acara *</label>
                <input name="acara" value={form.acara} onChange={handleChange} required placeholder="Nama kegiatan / acara" />
              </div>
              <div className="form-group">
                <label>Deskripsi</label>
                <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} rows={3} placeholder="Deskripsi singkat agenda..." />
              </div>
              <div className="form-row">
                <ModernDatepicker
                  name="waktu"
                  value={form.waktu}
                  onChange={handleChange}
                  label="Waktu Pelaksanaan"
                  type="datetime-local"
                />
                <ModernSelect
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  label="Status"
                  options={[
                    { value: 'Mendatang', label: 'Mendatang' },
                    { value: 'Berlangsung', label: 'Berlangsung' },
                    { value: 'Selesai', label: 'Selesai' },
                    { value: 'Dibatalkan', label: 'Dibatalkan' }
                  ]}
                />
              </div>
              <div className="form-group">
                <label>Lokasi</label>
                <input name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="Nama tempat / gedung" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? <><Loader2 className="animate-spin" size={16} /> Menyimpan...</> : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-box modal-confirm" onClick={e => e.stopPropagation()}>
            <h2>Hapus Agenda?</h2>
            <p>Data yang dihapus tidak dapat dikembalikan.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setDeleteId(null)}>Batal</button>
              <button className="btn-danger" onClick={() => handleDelete(deleteId)}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
