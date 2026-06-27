/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const EMPTY_FORM = { judul: '', url_file: '', tipe_file: 'foto', tanggal: '', status: 'Aktif' };

export default function GaleriAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  async function fetchData() {
    const { data: result } = await supabase.from('galeri').select('*').order('created_at', { ascending: false });
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
    setForm({ judul: item.judul, url_file: item.url_file || '', tipe_file: item.tipe_file || 'foto', tanggal: item.tanggal || '', status: item.status || 'Aktif' });
    setEditId(item.id);
    setShowModal(true);
  }
  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    let error;
    if (editId) ({ error } = await supabase.from('galeri').update(form).eq('id', editId));
    else ({ error } = await supabase.from('galeri').insert([form]));
    setSaving(false);
    if (error) { showToast('Gagal menyimpan: ' + error.message, 'error'); return; }
    showToast(editId ? 'Galeri berhasil diperbarui!' : 'Galeri berhasil ditambahkan!');
    setShowModal(false);
    fetchData();
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('galeri').delete().eq('id', id);
    if (error) { showToast('Gagal menghapus: ' + error.message, 'error'); return; }
    showToast('Item galeri berhasil dihapus!');
    setDeleteId(null);
    fetchData();
  }

  return (
    <div>
      {toast && <div className={`admin-toast ${toast.type}`}><CheckCircle size={18} /> {toast.msg}</div>}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Kelola Galeri</h1>
        <button className="btn-primary" onClick={openAdd}><Plus size={18} /> Tambah Foto/Video</button>
      </div>

      {/* Grid Galeri */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className="animate-spin" size={32} /></div>
      ) : data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Belum ada data galeri.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {data.map((item) => (
            <div key={item.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <div style={{ position: 'relative', height: '150px', background: '#f3f4f6' }}>
                {item.url_file ? (
                  <img src={item.url_file} alt={item.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display='none'} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ImageIcon size={40} color="#9ca3af" />
                  </div>
                )}
                <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                  <button className="btn-icon btn-edit" style={{ padding: '4px' }} onClick={() => openEdit(item)}><Edit2 size={14} /></button>
                  <button className="btn-icon btn-delete" style={{ padding: '4px' }} onClick={() => setDeleteId(item.id)}><Trash2 size={14} /></button>
                </div>
              </div>
              <div style={{ padding: '0.75rem' }}>
                <p style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.25rem', color: '#111827' }}>{item.judul}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.tipe_file || 'foto'}</span>
                  <span className={`status-badge ${item.status?.toLowerCase() || 'aktif'}`} style={{ fontSize: '0.7rem' }}>{item.status || 'Aktif'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? 'Edit Item Galeri' : 'Tambah Foto/Video'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group">
                <label>Judul *</label>
                <input name="judul" value={form.judul} onChange={handleChange} required placeholder="Judul foto/video" />
              </div>
              <div className="form-group">
                <label>URL File / Gambar</label>
                <input name="url_file" value={form.url_file} onChange={handleChange} placeholder="https://..." />
                {form.url_file && (
                  <img src={form.url_file} alt="preview" style={{ marginTop: '0.5rem', width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }} onError={e => e.target.style.display='none'} />
                )}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipe</label>
                  <select name="tipe_file" value={form.tipe_file} onChange={handleChange}>
                    <option value="foto">Foto</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tanggal</label>
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
            <h2>Hapus Item Galeri?</h2>
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
