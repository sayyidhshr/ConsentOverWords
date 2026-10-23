import React, { useState } from 'react';
import {
  X, Shield, CheckCircle2, XCircle, Trash2, RotateCcw, Lock,
  Eye, Edit2, LogOut, AlertCircle, BarChart3, Users, Download,
  Code2, ExternalLink, Search, Check, Copy
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

const CATEGORIES = [
  'Unwanted Comments',
  'Body Shaming',
  'Sexual Harassment',
  'Sharing Without Consent',
  'Cyberbullying',
  'Other'
];

export const AdminDashboardModal = ({ isOpen, onClose }) => {
  const {
    isAdminLoggedIn, adminLogin, adminLogout,
    stories, approvedStories, pendingStories, rejectedStories,
    approveStory, rejectStory, updateStoryCategory, deleteStory, resetDemoData,
    assessments, deleteAssessment, resetAssessments,
    isBackendConnected
  } = useCampaign();

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginError, setLoginError] = useState('');

  // Top Section Switcher: 'stories' | 'respondents'
  const [mainTab, setMainTab] = useState('stories');

  // Story Tab: 'pending' | 'approved' | 'rejected' | 'all'
  const [activeStoryTab, setActiveStoryTab] = useState('pending');
  const [editingId, setEditingId] = useState(null);
  const [editCat, setEditCat] = useState('');
  const [previewStory, setPreviewStory] = useState(null);

  // Respondent Search & Detail State
  const [respondentSearch, setRespondentSearch] = useState('');
  const [previewAssessment, setPreviewAssessment] = useState(null);
  const [showBackendGuide, setShowBackendGuide] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const ok = await adminLogin(username, password);
    if (!ok) setLoginError('Username atau password salah.');
    else {
      setUsername('');
      setPassword('');
    }
  };

  // Filtered stories
  const filteredStories = stories.filter(s =>
    activeStoryTab === 'all' ? true : s.status === activeStoryTab
  );

  // Filtered respondents
  const filteredAssessments = (assessments || []).filter(a => {
    if (!respondentSearch.trim()) return true;
    const q = respondentSearch.toLowerCase();
    return (
      (a.name && a.name.toLowerCase().includes(q)) ||
      (a.institution && a.institution.toLowerCase().includes(q)) ||
      (a.email && a.email.toLowerCase().includes(q))
    );
  });

  // Calculate assessment statistics
  const preAssessments = (assessments || []).filter(a => a.mode === 'pre');
  const postAssessments = (assessments || []).filter(a => a.mode === 'post');
  const preAvg = preAssessments.length
    ? Math.round(preAssessments.reduce((acc, a) => acc + (a.percentage || 0), 0) / preAssessments.length)
    : 0;
  const postAvg = postAssessments.length
    ? Math.round(postAssessments.reduce((acc, a) => acc + (a.percentage || 0), 0) / postAssessments.length)
    : 0;

  // CSV Export for Respondents
  const handleExportCSV = () => {
    const headers = ['ID', 'Nama', 'Institusi', 'Email', 'Role', 'Tipe Tes', 'Skor', 'Total', 'Persentase', 'Tanggal Submisi'];
    const rows = (assessments || []).map(a => [
      `"${a.id || ''}"`,
      `"${a.name || 'Anonim'}"`,
      `"${a.institution || '-'}"`,
      `"${a.email || '-'}"`,
      `"${a.role || 'Mahasiswa'}"`,
      `"${a.mode === 'post' ? 'Post-Test' : 'Pre-Test'}"`,
      a.score || 0,
      a.total || 10,
      `"${a.percentage || 0}%"`,
      `"${a.timestamp || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cow_responden_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Export for Backend Import
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(assessments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cow_assessments_backend_db_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const sampleBackendSnippet = `// Node.js & Express API Endpoint Example
// POST /api/v1/assessments/submit
app.post('/api/v1/assessments/submit', async (req, res) => {
  const { participant, assessmentType, score, totalQuestions, percentage, answersSummary } = req.body;
  
  // Save to MongoDB, PostgreSQL, or Supabase
  const result = await db.assessments.create({
    data: {
      participantId: participant.id,
      name: participant.name,
      institution: participant.institution,
      email: participant.email,
      role: participant.role,
      type: assessmentType,
      score,
      total: totalQuestions,
      percentage,
      answers: answersSummary,
      createdAt: new Date()
    }
  });

  return res.status(201).json({ success: true, id: result.id });
});`;

  const copySnippet = () => {
    navigator.clipboard.writeText(sampleBackendSnippet);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const STATUS_STYLE = {
    approved: { bg: '#F0FDF7', color: '#10B981', label: 'Approved' },
    pending: { bg: '#FFF9EC', color: '#E48826', label: 'Pending' },
    rejected: { bg: '#FFF1F0', color: '#EF4444', label: 'Rejected' },
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: '980px', width: '96%' }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}><X size={19} /></button>

        {!isAdminLoggedIn ? (
          /* Login Screen */
          <div style={{ maxWidth: 400, margin: '0 auto', padding: '1rem 0', textAlign: 'center' }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--purple-deep), var(--purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.1rem auto',
                boxShadow: 'var(--shadow-purple)'
              }}
            >
              <Lock size={26} color="#FFF" />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Admin Campaign Portal</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
              Masuk untuk memoderasi cerita komunitas dan mengakses data responden pre/post test untuk backend.
            </p>
            <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-username">Username Admin:</label>
                <input
                  id="admin-username"
                  type="text"
                  className="form-input"
                  placeholder="Masukkan username..."
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-password">Kata Sandi Admin:</label>
                <input
                  id="admin-password"
                  type="password"
                  className="form-input"
                  placeholder="Masukkan password..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
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
          /* Full Admin Dashboard */
          <div>
            {/* Top Bar Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem',
                paddingBottom: '1rem',
                borderBottom: '1.5px solid var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="icon-circle icon-circle-teal" style={{ marginBottom: 0 }}>
                  <Shield size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>Consent Over Words - Control Center</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>

                  </div>
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

            {/* Main Section Switcher Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.65rem',
                marginBottom: '1.5rem',
                background: 'var(--purple-pale)',
                padding: '0.35rem',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <button
                type="button"
                onClick={() => setMainTab('stories')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  background: mainTab === 'stories' ? '#FFF' : 'transparent',
                  color: mainTab === 'stories' ? 'var(--purple-deep)' : 'var(--text-muted)',
                  boxShadow: mainTab === 'stories' ? 'var(--shadow-xs)' : 'none',
                  transition: 'all 0.2s var(--ease)'
                }}
              >
                <Shield size={16} />
                <span>Moderasi Cerita ({pendingStories.length} Pending)</span>
              </button>

              <button
                type="button"
                onClick={() => setMainTab('respondents')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  background: mainTab === 'respondents' ? '#FFF' : 'transparent',
                  color: mainTab === 'respondents' ? 'var(--purple-deep)' : 'var(--text-muted)',
                  boxShadow: mainTab === 'respondents' ? 'var(--shadow-xs)' : 'none',
                  transition: 'all 0.2s var(--ease)'
                }}
              >
                <Users size={16} />
                <span>Data Responden Pre/Post ({assessments.length} Submisi)</span>
              </button>
            </div>

            {/* ══════════════════════════════════════════════
                TAB 1: STORIES MODERATION
            ══════════════════════════════════════════════ */}
            {mainTab === 'stories' && (
              <div>
                {/* Metrics */}
                <div className="admin-metrics-grid">
                  {[
                    { label: 'Total Cerita', val: stories.length, color: 'var(--purple-deep)' },
                    { label: 'Pending Review', val: pendingStories.length, color: '#E48826' },
                    { label: 'Terkurasi (Approved)', val: approvedStories.length, color: '#10B981' },
                    { label: 'Ditolak (Rejected)', val: rejectedStories.length, color: '#EF4444' },
                  ].map((m) => (
                    <div key={m.label} className="card" style={{ textAlign: 'center', padding: '0.9rem' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{m.label}</span>
                      <strong style={{ fontSize: '1.4rem', display: 'block', color: m.color }}>{m.val}</strong>
                    </div>
                  ))}
                </div>

                {/* Sub-tabs */}
                <div className="admin-tabs">
                  {[
                    { key: 'pending', label: `Pending (${pendingStories.length})` },
                    { key: 'approved', label: `Approved (${approvedStories.length})` },
                    { key: 'rejected', label: `Rejected (${rejectedStories.length})` },
                    { key: 'all', label: `Semua Cerita (${stories.length})` },
                  ].map(t => (
                    <button
                      key={t.key}
                      className={`btn btn-sm ${activeStoryTab === t.key ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setActiveStoryTab(t.key)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Stories Table */}
                <div className="admin-table-wrap">
                  {filteredStories.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                      Tidak ada cerita di status ini.
                    </div>
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
                        {filteredStories.map((s) => {
                          const st = STATUS_STYLE[s.status] || STATUS_STYLE.pending;
                          return (
                            <tr key={s.id}>
                              <td>
                                <p style={{ fontSize: '0.84rem', maxHeight: '3.6em', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-dark)' }}>
                                  {s.storyText}
                                </p>
                                <button
                                  style={{ fontSize: '0.74rem', color: 'var(--purple)', marginTop: '0.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                                  onClick={() => setPreviewStory(s)}
                                >
                                  <Eye size={11} /> Lihat Lengkap
                                </button>
                              </td>
                              <td>
                                {editingId === s.id ? (
                                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                                    <select
                                      className="form-select"
                                      style={{ padding: '0.3rem 0.4rem', fontSize: '0.78rem' }}
                                      value={editCat || s.category}
                                      onChange={e => setEditCat(e.target.value)}
                                    >
                                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <button
                                      className="btn btn-primary btn-sm"
                                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                                      onClick={() => { updateStoryCategory(s.id, editCat || s.category); setEditingId(null); }}
                                    >
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
                                    <button
                                      className="btn btn-sm"
                                      style={{ borderColor: '#10B981', color: '#10B981', background: '#F0FDF7', padding: '0.3rem 0.6rem', borderRadius: 6, border: '1.5px solid', fontSize: '0.78rem', display: 'flex', gap: '0.2rem', alignItems: 'center' }}
                                      onClick={() => approveStory(s.id)}
                                    >
                                      <CheckCircle2 size={13} /> Approve
                                    </button>
                                  )}
                                  {s.status !== 'rejected' && (
                                    <button
                                      className="btn btn-sm"
                                      style={{ borderColor: '#EF4444', color: '#EF4444', background: '#FFF1F0', padding: '0.3rem 0.6rem', borderRadius: 6, border: '1.5px solid', fontSize: '0.78rem', display: 'flex', gap: '0.2rem', alignItems: 'center' }}
                                      onClick={() => rejectStory(s.id)}
                                    >
                                      <XCircle size={13} /> Reject
                                    </button>
                                  )}
                                  <button
                                    style={{ color: 'var(--text-dim)', padding: '0.3rem', borderRadius: 4 }}
                                    onClick={() => { if (window.confirm('Hapus cerita ini?')) deleteStory(s.id); }}
                                    title="Hapus Cerita"
                                  >
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
              </div>
            )}

            {/* ══════════════════════════════════════════════
                TAB 2: RESPONDENTS & BACKEND HUB
            ══════════════════════════════════════════════ */}
            {mainTab === 'respondents' && (
              <div>
                {/* Respondent Metrics */}
                <div className="admin-metrics-grid">
                  {[
                    { label: 'Total Submisi', val: assessments.length, color: 'var(--purple-deep)' },
                    { label: 'Submisi Pre-Test', val: preAssessments.length, color: 'var(--purple)' },
                    { label: 'Submisi Post-Test', val: postAssessments.length, color: '#10B981' },
                    { label: 'Rata-rata Pre ➔ Post', val: `${preAvg}% ➔ ${postAvg}%`, color: '#7A5907' },
                  ].map((m) => (
                    <div key={m.label} className="card" style={{ textAlign: 'center', padding: '0.9rem' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{m.label}</span>
                      <strong style={{ fontSize: '1.2rem', display: 'block', color: m.color, marginTop: '0.2rem' }}>{m.val}</strong>
                    </div>
                  ))}
                </div>

                {/* Toolbar: Search & Export Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{ position: 'relative', width: '280px' }}>
                    <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Cari nama / kampus..."
                      value={respondentSearch}
                      onChange={e => setRespondentSearch(e.target.value)}
                      style={{ paddingLeft: '2.2rem', fontSize: '0.85rem', padding: '0.45rem 0.65rem 0.45rem 2.2rem' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowBackendGuide(!showBackendGuide)}
                    >
                      <Code2 size={13} />
                      <span>{showBackendGuide ? 'Tutup Guide Backend' : 'Panduan Endpoint API'}</span>
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>
                      <Download size={13} />
                      <span>Export CSV</span>
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={handleExportJSON}>
                      <Download size={13} />
                      <span>Export JSON Database</span>
                    </button>
                  </div>
                </div>

                {/* Backend Guide Dropdown Panel */}
                {showBackendGuide && (
                  <div
                    style={{
                      background: 'var(--bg-mint)',
                      border: '1.5px solid var(--lilac)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.1rem 1.25rem',
                      marginBottom: '1.25rem',
                      animation: 'popIn 0.2s var(--ease)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--purple-deep)' }}>
                        🔌 Integrasi Backend API (Pre/Post Test Submissions)
                      </strong>
                      <button
                        onClick={copySnippet}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: '#FFF',
                          border: '1px solid var(--border)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: 6,
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          color: 'var(--purple-deep)'
                        }}
                      >
                        {copiedCurl ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                        <span>{copiedCurl ? 'Tersalin!' : 'Salin Kode Express'}</span>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', marginBottom: '0.75rem' }}>
                      Setiap kali peserta menekan "Selesaikan & Simpan Hasil", payload data lengkap berikut dikirimkan siap ditampung oleh server Anda:
                    </p>
                    <pre
                      style={{
                        background: '#1E0A4A',
                        color: '#E0DBF5',
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        overflowX: 'auto',
                        maxHeight: '160px'
                      }}
                    >
                      {sampleBackendSnippet}
                    </pre>
                  </div>
                )}

                {/* Respondents Table */}
                <div className="admin-table-wrap">
                  {filteredAssessments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                      Belum ada data responden yang cocok.
                    </div>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Identitas Peserta</th>
                          <th>Institusi / Peran</th>
                          <th>Tipe Tes</th>
                          <th>Skor</th>
                          <th>Waktu</th>
                          <th style={{ textAlign: 'right' }}>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAssessments.map((a) => (
                          <tr key={a.id}>
                            <td>
                              <strong style={{ fontSize: '0.86rem', color: 'var(--text-dark)', display: 'block' }}>
                                {a.name || 'Anonim'}
                              </strong>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                                {a.email || 'Tanpa kontak'}
                              </span>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.82rem', color: 'var(--text-body)', display: 'block' }}>
                                {a.institution || 'Umum'}
                              </span>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                {a.role || 'Mahasiswa'}
                              </span>
                            </td>
                            <td>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  padding: '0.2rem 0.55rem',
                                  borderRadius: '4px',
                                  background: a.mode === 'post' ? '#F0FDF7' : '#F5F2FC',
                                  color: a.mode === 'post' ? '#10B981' : 'var(--purple-deep)',
                                  border: `1px solid ${a.mode === 'post' ? '#A7F3D0' : 'var(--lilac)'}`
                                }}
                              >
                                {a.mode === 'post' ? 'Post-Test' : 'Pre-Test'}
                              </span>
                            </td>
                            <td>
                              <strong style={{ fontSize: '0.92rem', color: 'var(--purple-deep)' }}>
                                {a.score} / {a.total || 10}
                              </strong>
                              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginLeft: '0.35rem' }}>
                                ({a.percentage}%)
                              </span>
                            </td>
                            <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              {a.timestamp ? new Date(a.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                                <button
                                  className="btn btn-sm btn-secondary"
                                  style={{ padding: '0.25rem 0.6rem', fontSize: '0.74rem' }}
                                  onClick={() => setPreviewAssessment(a)}
                                >
                                  <Eye size={12} /> Detail
                                </button>
                                <button
                                  style={{ color: 'var(--text-dim)', padding: '0.3rem', borderRadius: 4 }}
                                  onClick={() => { if (window.confirm('Hapus rekaman tes responden ini?')) deleteAssessment(a.id); }}
                                  title="Hapus Rekaman"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* Modal: Story Preview */}
            {previewStory && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(45,49,66,0.6)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ background: '#FFF', borderRadius: 'var(--radius-xl)', padding: '2rem', maxWidth: 520, width: '100%', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
                  <button style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }} onClick={() => setPreviewStory(null)}><X size={18} /></button>
                  <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>{previewStory.category}</span>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: 1.65, marginBottom: '1.1rem' }}>"{previewStory.storyText}"</p>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.4rem' }}>
                    Feeling: {previewStory.feeling} | Status: {previewStory.status}
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end' }}>
                    <button className="btn btn-primary btn-sm" onClick={() => { approveStory(previewStory.id); setPreviewStory(null); }}>Approve Story</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setPreviewStory(null)}>Tutup</button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal: Assessment Detail Preview */}
            {previewAssessment && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(45,49,66,0.65)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ background: '#FFF', borderRadius: 'var(--radius-xl)', padding: '2rem', maxWidth: 620, width: '100%', maxHeight: '85vh', overflowY: 'auto', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
                  <button style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }} onClick={() => setPreviewAssessment(null)}><X size={18} /></button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className="badge badge-teal">
                      {previewAssessment.mode === 'post' ? 'Post-Test Result' : 'Pre-Test Result'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>ID: {previewAssessment.id}</span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.2rem' }}>{previewAssessment.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {previewAssessment.institution} · {previewAssessment.role} {previewAssessment.email ? `(${previewAssessment.email})` : ''}
                  </p>

                  <div className="awareness-score-badge" style={{ padding: '0.8rem 1.4rem', marginBottom: '1.35rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Skor Total</span>
                      <strong style={{ fontSize: '1.3rem', color: 'var(--text-dark)' }}>{previewAssessment.score} / {previewAssessment.total || 10}</strong>
                    </div>
                    <div style={{ borderLeft: '1.5px solid var(--border)', paddingLeft: '1.5rem' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Indeks Kepekaan</span>
                      <strong style={{ fontSize: '1.3rem', color: 'var(--purple-deep)' }}>{previewAssessment.percentage}%</strong>
                    </div>
                  </div>

                  <strong style={{ fontSize: '0.88rem', color: 'var(--text-dark)', display: 'block', marginBottom: '0.65rem' }}>
                    Rincian Jawaban Soal:
                  </strong>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                    {(previewAssessment.answers || []).map((ans, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: ans.isCorrect ? '#F0FDF7' : '#FFF1F0',
                          border: `1px solid ${ans.isCorrect ? '#A7F3D0' : '#FECACA'}`,
                          borderRadius: 'var(--radius-sm)',
                          padding: '0.65rem 0.85rem',
                          fontSize: '0.82rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>
                            Soal #{ans.questionId || idx + 1}: {ans.category || ''}
                          </span>
                          <span style={{ fontWeight: 700, color: ans.isCorrect ? '#10B981' : '#EF4444' }}>
                            {ans.isCorrect ? '✓ Tepat' : '✗ Perlu Edukasi'}
                          </span>
                        </div>
                        <div style={{ color: 'var(--text-body)' }}>
                          Pilihan: <em>"{ans.selectedLabel || ans.selected || 'N/A'}"</em>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setPreviewAssessment(null)}>
                      Tutup
                    </button>
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
