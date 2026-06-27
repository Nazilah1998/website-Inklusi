'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, CheckCircle, Download, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const EMPTY_FORM = { judul: '', jenis: 'PDF', url_file: '', tanggal: '', status: 'Aktif' };

export default function DokumenAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  async function fetchData() {
    const { data: result } = await supabase.from('dokumen').select('*').order('created_at', { ascending: false });
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
    setForm({ judul: item.judul, jenis: item.jenis || 'PDF', url_file: item.url_file || '', tanggal: item.tanggal || '', status: item.status || 'Aktif' });
    setEditId(item.id);
    setShowModal(true);
  }
  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    let error;
    if (editId) ({ error } = await supabase.from('dokumen').update(form).eq('id', editId));
    else ({ error } = await supabase.from('dokumen').insert([form]));
    setSaving(false);
    if (error) { showToast('Gagal menyimpan: ' + error.message, 'error'); return; }
    showToast(editId ? 'Dokumen berhasil diperbarui!' : 'Dokumen berhasil ditambahkan!');
    setShowModal(false);
    fetchData();
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('dokumen').delete().eq('id', id);
    if (error) { showToast('Gagal menghapus: ' + error.message, 'error'); return; }
    showToast('Dokumen berhasil dihapus!');
    setDeleteId(null);
    fetchData();
  }

  const jenisColor = { PDF: '#ef4444', DOCX: '#2563eb', XLSX: '#16a34a', PPTX: '#d97706' };

  return (
    <div>
      {toast && <div className={`admin-toast ${toast.type}`}><CheckCircle size={18} /> {toast.msg}</div>}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Kelola Dokumen & Panduan</h1>
        <button className="btn-primary" onClick={openAdd}><Plus size={18} /> Tambah Dokumen</button>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead><tr><th>No</th><th>Nama Dokumen</th><th>Jenis</th><th>Tanggal Upload</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="6" style={{ textAlign: 'center' }}><Loader2 className="animate-spin" /> Memuat...</td></tr>
            : data.length === 0 ? <tr><td colSpan="6" style={{ textAlign: 'center' }}>Belum ada data dokumen.</td></tr>
            : data.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td style={{ maxWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={18} color={jenisColor[item.jenis] || '#6b7280'} />
                    {item.judul}
                  </div>
                </td>
                <td>
                  <span style={{ background: jenisColor[item.jenis] || '#6b7280', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
                    {item.jenis || 'PDF'}
                  </span>
                </td>
                <td>{item.tanggal || item.created_at?.split('T')[0]}</td>
                <td><span className={`status-badge ${item.status?.toLowerCase() || 'aktif'}`}>{item.status || 'Aktif'}</span></td>
                <td><div className="action-buttons">
                  {item.url_file && <a href={item.url_file} target="_blank" rel="noopener noreferrer" className="btn-icon" title="Unduh"><Download size={16} /></a>}
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
              <h2>{editId ? 'Edit Dokumen' : 'Tambah Dokumen'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group">
                <label>Nama Dokumen *</label>
                <input name="judul" value={form.judul} onChange={handleChange} required placeholder="Nama dokumen / panduan" />
              </div>
              <div className="form-group">
                <label>URL File / Link Unduhan</label>
                <input name="url_file" value={form.url_file} onChange={handleChange} placeholder="https://drive.google.com/..." />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Jenis File</label>
                  <select name="jenis" value={form.jenis} onChange={handleChange}>
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="XLSX">XLSX</option>
                    <option value="PPTX">PPTX</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tanggal Upload</label>
                  <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="Aktif">Aktif</option>
                  <option value="Draft">Draft</option>
                  <option value="Arsip">Arsip</option>
                </select>
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
            <h2>Hapus Dokumen?</h2>
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
