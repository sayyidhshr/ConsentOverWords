import React, { useState } from 'react';
import {
  X, Shield, CheckCircle2, XCircle, Trash2, RotateCcw, Lock,
  Eye, Edit2, LogOut, AlertCircle, BarChart3
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

const CATEGORIES = ['Unwanted Comments', 'Body Shaming', 'Sexual Harassment', 'Sharing Without Consent', 'Cyberbullying', 'Other'];

export const AdminDashboardModal = ({ isOpen, onClose }) => {
  const {
    isAdminLoggedIn, adminLogin, adminLogout,
    stories, approvedStories, pendingStories, rejectedStories,
    approveStory, rejectStory, updateStoryCategory, deleteStory, resetDemoData
  } = useCampaign();

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [editingId, setEditingId] = useState(null);
  const [editCat, setEditCat] = useState('');
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!adminLogin(password)) {
      setLoginError('Password salah. Gunakan: admin123');
    } else {
      setPassword('');
    }
  };

  const filtered = stories.filter(s => activeTab === 'all' ? true : s.status === activeTab);

  const STATUS_STYLE = {
    approved: { bg: '#F0FDF7', color: '#10B981', label: 'Approved' },
    pending: { bg: '#FFF9EC', color: '#E48826', label: 'Pending' },
    rejected: { bg: '#FFF1F0', color: '#EF4444', label: 'Rejected' },
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: '940px', width: '95%' }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}><X size={19} /></button>

        {!isAdminLoggedIn ? (
          /* Login */
          <div style={{ maxWidth: 400, margin: '0 auto', padding: '1rem 0', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.1rem auto', boxShadow: 'var(--shadow-teal)' }}>
              <Lock size={26} color="#FFF" />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Admin Moderation Portal</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
              Masuk untuk meninjau dan memoderasi cerita komunitas sebelum dipublikasikan.
            </p>
            <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-password">Kata Sandi Admin:</label>
                <input id="admin-password" type="password" className="form-input" placeholder="Masukkan password..." value={password} onChange={e => setPassword(e.target.value)} autoFocus required />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.3rem', display: 'block' }}>Demo PIN: <code>admin123</code></span>
              </div>
              {loginError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#EF4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <AlertCircle size={15} /><span>{loginError}</span>
                </div>
              )}
              <button id="btn-admin-login" type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Buka Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard */
          <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1.5px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="icon-circle icon-circle-teal" style={{ marginBottom: 0 }}>
                  <Shield size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>Story Moderation Desk</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Admin Session Active</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={resetDemoData}>
                  <RotateCcw size={13} /><span>Reset Demo</span>
                </button>
                <button className="btn btn-outline-teal btn-sm" onClick={adminLogout}>
                  <LogOut size={13} /><span>Logout</span>
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="admin-metrics-grid">
              {[
                { label: 'Total', val: stories.length, color: 'var(--blue)' },
                { label: 'Pending', val: pendingStories.length, color: '#E48826' },
                { label: 'Approved', val: approvedStories.length, color: '#10B981' },
                { label: 'Rejected', val: rejectedStories.length, color: '#EF4444' },
              ].map((m) => (
                <div key={m.label} className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{m.label}</span>
                  <strong style={{ fontSize: '1.4rem', display: 'block', color: m.color }}>{m.val}</strong>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
              {[
                { key: 'pending', label: `Pending (${pendingStories.length})` },
                { key: 'approved', label: `Approved (${approvedStories.length})` },
                { key: 'rejected', label: `Rejected (${rejectedStories.length})` },
                { key: 'all', label: `All (${stories.length})` },
              ].map(t => (
                <button key={t.key} className={`btn btn-sm ${activeTab === t.key ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="admin-table-wrap">
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Tidak ada cerita di status ini.</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '38%' }}>Isi Cerita</th>
                      <th>Kategori</th>
                      <th>Status</th>
                      <th>Perasaan</th>
                      <th style={{ textAlign: 'right' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s) => {
                      const st = STATUS_STYLE[s.status] || STATUS_STYLE.pending;
                      return (
                        <tr key={s.id}>
                          <td>
                            <p style={{ fontSize: '0.84rem', maxHeight: '3.8em', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-dark)' }}>
                              {s.storyText}
                            </p>
                            <button style={{ fontSize: '0.74rem', color: 'var(--blue)', marginTop: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                              onClick={() => setPreview(s)}>
                              <Eye size={11} /> Lihat Lengkap
                            </button>
                          </td>
                          <td>
                            {editingId === s.id ? (
                              <div style={{ display: 'flex', gap: '0.25rem' }}>
                                <select className="form-select" style={{ padding: '0.3rem 0.4rem', fontSize: '0.78rem' }} value={editCat || s.category} onChange={e => setEditCat(e.target.value)}>
                                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <button className="btn btn-primary btn-sm" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} onClick={() => { updateStoryCategory(s.id, editCat || s.category); setEditingId(null); }}>
                                  ✓
                                </button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <span style={{ fontSize: '0.81rem', color: 'var(--text-body)' }}>{s.category}</span>
                                <button onClick={() => { setEditingId(s.id); setEditCat(s.category); }} style={{ color: 'var(--text-dim)', padding: '0.15rem' }}>
                                  <Edit2 size={12} />
                                </button>
                              </div>
                            )}
                          </td>
                          <td>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '4px', background: st.bg, color: st.color }}>
                              {st.label}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.81rem', color: 'var(--text-muted)' }}>{s.feeling}</td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                              {s.status !== 'approved' && (
                                <button className="btn btn-sm" style={{ borderColor: '#10B981', color: '#10B981', background: '#F0FDF7', padding: '0.3rem 0.6rem', borderRadius: 6, border: '1.5px solid', fontSize: '0.78rem', display: 'flex', gap: '0.2rem', alignItems: 'center' }} onClick={() => approveStory(s.id)}>
                                  <CheckCircle2 size={13} /> Approve
                                </button>
                              )}
                              {s.status !== 'rejected' && (
                                <button className="btn btn-sm" style={{ borderColor: '#EF4444', color: '#EF4444', background: '#FFF1F0', padding: '0.3rem 0.6rem', borderRadius: 6, border: '1.5px solid', fontSize: '0.78rem', display: 'flex', gap: '0.2rem', alignItems: 'center' }} onClick={() => rejectStory(s.id)}>
                                  <XCircle size={13} /> Reject
                                </button>
                              )}
                              <button style={{ color: 'var(--text-dim)', padding: '0.3rem', borderRadius: 4 }} onClick={() => { if (window.confirm('Hapus cerita ini?')) deleteStory(s.id); }}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Story Preview Overlay */}
            {preview && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(45,49,66,0.6)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ background: '#FFF', borderRadius: 'var(--radius-xl)', padding: '2rem', maxWidth: 520, width: '100%', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
                  <button style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }} onClick={() => setPreview(null)}><X size={18} /></button>
                  <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>{preview.category}</span>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: 1.65, marginBottom: '1.1rem' }}>"{preview.storyText}"</p>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.4rem' }}>
                    Feeling: {preview.feeling} | Status: {preview.status}
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
                    <button className="btn btn-primary btn-sm" onClick={() => { approveStory(preview.id); setPreview(null); }}>Approve Story</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setPreview(null)}>Tutup</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
