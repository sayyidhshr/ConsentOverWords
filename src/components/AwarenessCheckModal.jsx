import React, { useState, useEffect } from 'react';
import {
  X, ArrowRight, RotateCcw, Sparkles, Award, HelpCircle,
  CheckCircle2, AlertCircle, User, Edit3, TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AWARENESS_QUESTIONS } from '../data/seedData';
import { useCampaign } from '../context/CampaignContext';

export const AwarenessCheckModal = ({ isOpen, onClose, mode = 'pre' }) => {
  const {
    participant,
    saveParticipant,
    saveAwarenessResult,
    preTestResult,
    postTestResult
  } = useCampaign();

  // Modal Step: 'identity' | 'quiz' | 'result'
  const [step, setStep] = useState('quiz');

  // Identity Form State
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    role: 'Mahasiswa'
  });
  const [formError, setFormError] = useState('');

  // Quiz State
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Sync initial identity from context when modal opens
  useEffect(() => {
    if (isOpen) {
      if (participant && participant.name) {
        setFormData({
          name: participant.name,
          institution: participant.institution || '',
          role: participant.role || 'Mahasiswa'
        });
        setStep('quiz');
      } else {
        setStep('identity');
      }
      setIdx(0);
      setSelected(null);
      setShowExp(false);
      setAnswers([]);
    }
  }, [isOpen, participant]);

  if (!isOpen) return null;

  const total = AWARENESS_QUESTIONS.length;
  const q = AWARENESS_QUESTIONS[idx] || AWARENESS_QUESTIONS[0];

  // Handle Identity Save
  const handleSaveIdentity = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Nama lengkap atau panggilan wajib diisi.');
      return;
    }
    if (!formData.institution.trim()) {
      setFormError('Asal institusi, kampus, atau sekolah wajib diisi.');
      return;
    }

    setFormError('');
    saveParticipant(formData);
    setStep('quiz');
  };

  // Handle Quiz Option Selection
  const handleSelect = (opt) => {
    if (showExp) return;
    setSelected(opt);
    setShowExp(true);
    setAnswers(prev => [
      ...prev,
      {
        questionId: q.id,
        category: q.category,
        question: q.question,
        selected: opt.value,
        selectedLabel: opt.label,
        isCorrect: opt.correct
      }
    ]);
  };

  // Handle Next Question / Finish
  const handleNext = () => {
    if (idx < total - 1) {
      setIdx(idx + 1);
      setSelected(null);
      setShowExp(false);
    } else {
      const score = answers.filter(a => a.isCorrect).length;
      saveAwarenessResult(mode, score, total, answers, {
        ...participant,
        ...formData
      });
      setStep('result');
      try {
        confetti({
          particleCount: 110,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#290087', '#CAC5E5', '#F2E0A4', '#10B981']
        });
      } catch {}
    }
  };

  // Reset Quiz
  const resetQuiz = () => {
    setIdx(0);
    setSelected(null);
    setShowExp(false);
    setAnswers([]);
    setStep('quiz');
  };

  // Current Score & Percentage
  const score = answers.filter(a => a.isCorrect).length;
  const pct = Math.round((score / total) * 100);

  // Evaluative Feedback
  const getFeedback = () => {
    if (pct >= 90) {
      return {
        title: 'Champion of Digital Boundaries! ',
        msg: 'Kamu memiliki kepekaan dan pemahaman etika yang sangat tinggi mengenai consent dan batasan digital. Terus jaga ruang siber agar aman dan berdaya bersama!',
        color: 'var(--purple-deep)'
      };
    }
    if (pct >= 70) {
      return {
        title: 'Empathetic Digital Citizen',
        msg: 'Kamu sudah memiliki pemahaman yang baik terhadap privasi dan batasan orang lain. Jelajahi modul edukasi untuk mempertajam respon saat situasi kritis!',
        color: 'var(--purple)'
      };
    }
    return {
      title: 'Growing Digital Explorer',
      msg: 'Setiap orang belajar dengan dinamikanya masing-masing. Platform ini hadir untuk memandu dan memperluas sudut pandangmu tentang rasa aman bersama.',
      color: 'var(--orange)'
    };
  };

  const fb = getFeedback();

  // Comparison logic for Pre vs Post
  const showComparison = (mode === 'post' && preTestResult) || (mode === 'pre' && postTestResult);
  const baselineScore = mode === 'post' ? preTestResult : { percentage: pct };
  const finalScore = mode === 'post' ? { percentage: pct } : postTestResult;
  const scoreDelta = (finalScore?.percentage || 0) - (baselineScore?.percentage || 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: '680px', width: '95%' }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Tutup Modal">
          <X size={19} />
        </button>

        {/* ══════════════════════════════════════════════════
            STEP 1: IDENTITY INPUT FORM
        ══════════════════════════════════════════════════ */}
        {step === 'identity' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--purple-deep) 0%, var(--purple) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  boxShadow: 'var(--shadow-purple)'
                }}
              >
                <User size={28} color="#FFF" />
              </div>

              <span className={`badge ${mode === 'post' ? 'badge-pink' : 'badge-teal'}`} style={{ marginBottom: '0.45rem' }}>
                {mode === 'post' ? 'Identitas Responden · Post-Test' : 'Identitas Responden · Pre-Test'}
              </span>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '0.35rem' }}>Data Diri Peserta</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto' }}>
                Masukkan data dirimu untuk memulai evaluasi kesadaran batas digital.
              </p>
            </div>

            <form onSubmit={handleSaveIdentity} style={{ maxWidth: '520px', margin: '0 auto' }}>
              {/* Nama */}
              <div className="form-group">
                <label className="form-label" htmlFor="user-name">
                  Nama Lengkap / Panggilan <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="user-name"
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Rania Putri"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Institusi / Kampus */}
              <div className="form-group">
                <label className="form-label" htmlFor="user-institution">
                  Asal Kampus / Sekolah / Organisasi <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  id="user-institution"
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Universitas Gadjah Mada / SMA Negeri 1"
                  value={formData.institution}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                  required
                />
              </div>

              {/* Status / Peran */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" htmlFor="user-role">
                  Status / Peran
                </label>
                <select
                  id="user-role"
                  className="form-select"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Mahasiswa">Mahasiswa</option>
                  <option value="Siswa SMA/SMK">Siswa SMA/SMK</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>

              {formError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#EF4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <AlertCircle size={15} />
                  <span>{formError}</span>
                </div>
              )}

              {/* Submit Button */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                {participant?.name && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep('quiz')}
                  >
                    Batal
                  </button>
                )}
                <button type="submit" className="btn btn-primary" style={{ minWidth: 170 }}>
                  <span>{mode === 'post' ? 'Mulai Post-Check' : 'Mulai Pre-Check'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STEP 2: QUIZ / AWARENESS QUESTIONS FLOW
        ══════════════════════════════════════════════════ */}
        {step === 'quiz' && (
          <div>
            {/* Header & Participant Bar */}
            <div style={{ marginBottom: '1.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`badge ${mode === 'post' ? 'badge-pink' : 'badge-teal'}`}>
                    {mode === 'post' ? 'Post-Learning Reflection' : 'Pre-Learning Awareness Check'}
                  </span>
                  {/* Participant Badge with Edit Trigger */}
                  <button
                    onClick={() => setStep('identity')}
                    title="Klik untuk mengubah nama/institusi peserta"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: 'var(--purple-pale)',
                      border: '1px solid var(--purple-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.2rem 0.65rem',
                      fontSize: '0.75rem',
                      color: 'var(--purple-deep)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <User size={12} color="var(--purple)" />
                    <span>{formData.name || participant?.name || 'Anonim'}</span>
                    <Edit3 size={11} color="var(--purple)" style={{ opacity: 0.7 }} />
                  </button>
                </div>

                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--purple-deep)' }}>
                  {idx + 1} / {total}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>Uji Kesadaran Batas Digital</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Jawab berdasarkan sudut pandangmu. Tidak ada jawaban yang menghakimi.
              </p>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: 7, background: 'var(--border)', borderRadius: 4, marginTop: '0.75rem', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${((idx + 1) / total) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #290087 0%, #5A2EB8 50%, #CAC5E5 100%)',
                    transition: 'width 0.35s var(--ease)'
                  }}
                />
              </div>
            </div>

            {/* Scenario Card with Category Tag */}
            <div
              style={{
                background: 'var(--bg-mint)',
                border: '1.5px solid var(--lilac)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem 1.25rem',
                marginBottom: '1.15rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--purple-deep)', letterSpacing: '0.07em' }}>
                  📌 Skenario {idx + 1}
                </span>
                {q.category && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      background: '#FFF',
                      padding: '0.15rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--purple)',
                      border: '1px solid var(--lilac)',
                      fontWeight: 600
                    }}
                  >
                    {q.category}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-dark)', fontWeight: 600, lineHeight: 1.5 }}>
                "{q.scenario}"
              </p>
            </div>

            {/* Question Text */}
            <h4 style={{ fontSize: '1.02rem', color: 'var(--text-dark)', marginBottom: '1rem', fontWeight: 700 }}>
              {q.question}
            </h4>

            {/* Options Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.35rem' }}>
              {q.options.map((opt, i) => {
                const isSelected = selected?.value === opt.value;
                return (
                  <button
                    key={i}
                    className={`quiz-option-btn ${isSelected ? (opt.correct ? 'selected-correct' : 'selected-wrong') : ''}`}
                    onClick={() => handleSelect(opt)}
                    disabled={showExp}
                  >
                    <span style={{ fontWeight: 600, flex: 1, paddingRight: '0.5rem' }}>{opt.label}</span>
                    {isSelected && (
                      opt.correct ? (
                        <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0 }} />
                      ) : (
                        <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
                      )
                    )}
                  </button>
                );
              })}
            </div>

            {/* Educational Explanation Box */}
            {showExp && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #F5F2FC 0%, #FDFBF2 100%)',
                  border: '1.5px solid var(--lilac)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.1rem 1.25rem',
                  marginBottom: '1.35rem',
                  animation: 'popIn 0.22s var(--ease)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <HelpCircle size={16} color="var(--purple-deep)" />
                  <strong style={{ fontSize: '0.88rem', color: 'var(--purple-deep)' }}>
                    Sudut Pandang Edukatif & Batasan Digital:
                  </strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.55 }}>
                  {q.explanation}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {showExp && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.65rem' }}>
                <button
                  className="btn btn-primary"
                  id="btn-awareness-next"
                  onClick={handleNext}
                >
                  <span>{idx < total - 1 ? 'Skenario Berikutnya' : 'Selesaikan & Simpan Hasil'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STEP 3: COMPLETION & BACKEND READINESS SCREEN
        ══════════════════════════════════════════════════ */}
        {step === 'result' && (
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            {/* Visual Icon */}
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--purple-deep) 0%, var(--purple) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.1rem auto',
                boxShadow: 'var(--shadow-purple)'
              }}
            >
              <Award size={32} color="#FFF" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className={`badge ${pct >= 80 ? 'badge-teal' : pct >= 60 ? 'badge-blue' : 'badge-pink'}`}>
                {mode === 'post' ? 'Post-Test Selesai' : 'Pre-Test Selesai'}
              </span>
              <span className="badge badge-purple" style={{ textTransform: 'none' }}>
                ID: {participant?.id?.substring(0, 12) || 'cow-usr'}
              </span>
            </div>

            {/* Participant Name Heading */}
            <h3 style={{ fontSize: '1.55rem', color: fb.color, marginBottom: '0.2rem' }}>
              {fb.title}
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-dark)', fontWeight: 600, marginBottom: '0.2rem' }}>
              Refleksi untuk: <strong>{formData.name || participant?.name || 'Peserta'}</strong>
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.35rem' }}>
              {formData.institution || participant?.institution || 'Institusi Umum'} · {formData.role || participant?.role || 'Mahasiswa'}
            </p>

            <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 1.4rem auto', fontSize: '0.9rem' }}>
              {fb.msg}
            </p>

            {/* Score Visual Badge */}
            <div className="awareness-score-badge" style={{ marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Skor Kepekaan</span>
                <strong style={{ fontSize: '1.75rem', color: 'var(--text-dark)', fontFamily: 'var(--font-display)' }}>
                  {score} / {total}
                </strong>
              </div>
              <div style={{ borderLeft: '1.5px solid var(--border)', paddingLeft: '2rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Indeks Kesadaran</span>
                <strong style={{ fontSize: '1.75rem', color: 'var(--purple-deep)', fontFamily: 'var(--font-display)' }}>
                  {pct}%
                </strong>
              </div>
            </div>

            {/* Pre vs Post Comparison Card (if available) */}
            {showComparison && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #F5F2FC 0%, #FFFFFF 100%)',
                  border: '1.5px solid var(--lilac)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.1rem 1.4rem',
                  maxWidth: '520px',
                  margin: '0 auto 1.4rem auto',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <TrendingUp size={16} color="var(--purple-deep)" />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--purple-deep)' }}>
                      Perkembangan Pre-Test vs Post-Test:
                    </strong>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: scoreDelta >= 0 ? '#10B981' : '#EF4444',
                      background: scoreDelta >= 0 ? '#F0FDF7' : '#FFF1F0',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      border: `1px solid ${scoreDelta >= 0 ? '#A7F3D0' : '#FECACA'}`
                    }}
                  >
                    {scoreDelta >= 0 ? `+${scoreDelta}% Awareness Boost` : `${scoreDelta}%`}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', textAlign: 'center' }}>
                  <div style={{ background: '#FFF', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Pre-Test</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--purple)' }}>
                      {mode === 'post' ? `${preTestResult?.percentage}%` : `${pct}%`}
                    </strong>
                  </div>
                  <div style={{ background: '#FFF', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Post-Test</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--purple-deep)' }}>
                      {mode === 'post' ? `${pct}%` : `${postTestResult?.percentage || '—'}%`}
                    </strong>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" onClick={resetQuiz}>
                <RotateCcw size={15} />
                <span>Ulangi Kuis</span>
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  document.querySelector('#learn')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Sparkles size={15} />
                <span>Jelajahi Materi Learn</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
