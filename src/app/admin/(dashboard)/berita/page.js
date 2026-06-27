/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const EMPTY_FORM = { judul: '', slug: '', konten: '', thumbnail: '', tanggal: '', status: 'Aktif' };

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function BeritaAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  async function fetchData() {
    const { data: result } = await supabase.from('berita').select('*').order('created_at', { ascending: false });
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

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowModal(true);
  }

  function openEdit(item) {
    setForm({ judul: item.judul, slug: item.slug, konten: item.konten || '', thumbnail: item.thumbnail || '', tanggal: item.tanggal || '', status: item.status || 'Aktif' });
    setEditId(item.id);
    setShowModal(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      if (name === 'judul' && !editId) next.slug = slugify(value);
      return next;
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    let error;
    if (editId) {
      ({ error } = await supabase.from('berita').update(form).eq('id', editId));
    } else {
      ({ error } = await supabase.from('berita').insert([form]));
    }
    setSaving(false);
    if (error) { showToast('Gagal menyimpan: ' + error.message, 'error'); return; }
    showToast(editId ? 'Berita berhasil diperbarui!' : 'Berita berhasil ditambahkan!');
    setShowModal(false);
    fetchData();
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('berita').delete().eq('id', id);
    if (error) { showToast('Gagal menghapus: ' + error.message, 'error'); return; }
    showToast('Berita berhasil dihapus!');
    setDeleteId(null);
    fetchData();
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          <CheckCircle size={18} /> {toast.msg}
        </div>
      )}

      <div className="admin-page-header">
        <h1 className="admin-page-title">Kelola Berita</h1>
        <button className="btn-primary" onClick={openAdd}>
          <Plus size={18} /> Tambah Berita
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Thumbnail</th>
              <th>Judul</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}><Loader2 className="animate-spin" /> Memuat...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>Belum ada data berita.</td></tr>
            ) : data.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.judul} style={{ width: '64px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: '64px', height: '40px', background: '#e5e7eb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ImageIcon size={16} color="#9ca3af" />
                    </div>
                  )}
                </td>
                <td style={{ maxWidth: '250px' }}>{item.judul}</td>
                <td>{item.tanggal || item.created_at?.split('T')[0]}</td>
                <td><span className={`status-badge ${item.status?.toLowerCase() || 'draft'}`}>{item.status || 'Draft'}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon btn-edit" onClick={() => openEdit(item)}><Edit2 size={16} /></button>
                    <button className="btn-icon btn-delete" onClick={() => setDeleteId(item.id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editId ? 'Edit Berita' : 'Tambah Berita'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group">
                <label>Judul Berita *</label>
                <input name="judul" value={form.judul} onChange={handleChange} required placeholder="Masukkan judul berita" />
              </div>
              <div className="form-group">
                <label>Slug (URL)</label>
                <input name="slug" value={form.slug} onChange={handleChange} placeholder="slug-otomatis" />
              </div>
              <div className="form-group">
                <label>URL Thumbnail / Cover Gambar</label>
                <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://..." />
                {form.thumbnail && (
                  <img src={form.thumbnail} alt="preview" style={{ marginTop: '0.5rem', width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }} onError={e => e.target.style.display='none'} />
                )}
              </div>
              <div className="form-group">
                <label>Konten / Isi Berita</label>
                <textarea name="konten" value={form.konten} onChange={handleChange} rows={5} placeholder="Tulis isi berita di sini..." />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Tanggal</label>
                  <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option value="Aktif">Aktif</option>
                    <option value="Draft">Draft</option>
                    <option value="Arsip">Arsip</option>
                  </select>
                </div>
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

      {/* Delete Confirm */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-box modal-confirm" onClick={e => e.stopPropagation()}>
            <h2>Hapus Berita?</h2>
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
