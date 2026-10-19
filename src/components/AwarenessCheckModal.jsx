import React, { useState } from 'react';
import { X, ArrowRight, RotateCcw, Sparkles, Award, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AWARENESS_QUESTIONS } from '../data/seedData';
import { useCampaign } from '../context/CampaignContext';

export const AwarenessCheckModal = ({ isOpen, onClose, mode = 'pre' }) => {
  const { saveAwarenessResult } = useCampaign();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  const q = AWARENESS_QUESTIONS[idx];
  const total = AWARENESS_QUESTIONS.length;

  const handleSelect = (opt) => {
    if (showExp) return;
    setSelected(opt);
    setShowExp(true);
    setAnswers(prev => [...prev, { questionId: q.id, selected: opt.value, isCorrect: opt.correct }]);
  };

  const handleNext = () => {
    if (idx < total - 1) {
      setIdx(idx + 1);
      setSelected(null);
      setShowExp(false);
    } else {
      const score = [...answers].filter(a => a.isCorrect).length;
      saveAwarenessResult(mode, score, total, answers);
      setDone(true);
      try { confetti({ particleCount: 90, spread: 65, origin: { y: 0.55 }, colors: ['#4FBEB0', '#3B6EA8', '#E893B0', '#E48826'] }); } catch {}
    }
  };

  const reset = () => {
    setIdx(0); setSelected(null); setShowExp(false); setAnswers([]); setDone(false);
  };

  const score = answers.filter(a => a.isCorrect).length;
  const pct = Math.round((score / total) * 100);

  const getFeedback = () => {
    if (score === total) return { title: 'Champion of Digital Boundaries! ✨', msg: 'Kamu memiliki kepekaan yang sangat tinggi tentang consent dan batasan digital. Terus jaga ruang siber agar aman bersama!', color: 'var(--teal)' };
    if (score >= 3) return { title: 'Empathetic Digital Citizen 🌱', msg: 'Kamu sudah punya pemahaman yang cukup baik. Eksplorasi modul Learn untuk mempertajam pemahamanmu!', color: 'var(--blue)' };
    return { title: 'Growing Digital Explorer 🧭', msg: 'Setiap orang belajar dengan caranya sendiri. Platform ini hadir untuk membantumu tumbuh dan memahami batas kenyamanan bersama.', color: 'var(--pink)' };
  };

  const fb = getFeedback();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={19} /></button>

        {!done ? (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <span className={`badge ${mode === 'post' ? 'badge-pink' : 'badge-teal'}`}>
                  {mode === 'post' ? 'Post-Learning Reflection' : 'Pre-Learning Awareness Check'}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal)' }}>
                  {idx + 1} / {total}
                </span>
              </div>

              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Uji Kesadaran Batas Digital</h3>
              <p style={{ fontSize: '0.87rem', color: 'var(--text-muted)' }}>
                Jawab berdasarkan sudut pandangmu. Tidak ada jawaban yang menghakimi.
              </p>

              {/* Progress */}
              <div style={{ width: '100%', height: 6, background: 'var(--border)', borderRadius: 3, marginTop: '0.75rem', overflow: 'hidden' }}>
                <div style={{
                  width: `${((idx + 1) / total) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--teal) 0%, var(--pink) 100%)',
                  transition: 'width 0.35s var(--ease)'
                }} />
              </div>
            </div>

            {/* Scenario */}
            <div style={{ background: 'var(--teal-pale)', border: '1.5px solid rgba(79,190,176,0.3)', borderRadius: 'var(--radius-md)', padding: '1.1rem 1.25rem', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '0.73rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--teal)', letterSpacing: '0.07em', display: 'block', marginBottom: '0.3rem' }}>
                📌 Skenario:
              </span>
              <p style={{ fontSize: '0.97rem', color: 'var(--text-dark)', fontWeight: 600 }}>"{q.scenario}"</p>
            </div>

            <h4 style={{ fontSize: '1.02rem', color: 'var(--text-dark)', marginBottom: '1rem' }}>{q.question}</h4>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.4rem' }}>
              {q.options.map((opt, i) => {
                const isSelected = selected?.value === opt.value;
                return (
                  <button
                    key={i}
                    className={`quiz-option-btn ${isSelected ? (opt.correct ? 'selected-correct' : 'selected-wrong') : ''}`}
                    onClick={() => handleSelect(opt)}
                    disabled={showExp}
                  >
                    <span style={{ fontWeight: 600 }}>{opt.label}</span>
                    {isSelected && (opt.correct
                      ? <CheckCircle2 size={17} color="#10B981" />
                      : <AlertCircle size={17} color="var(--pink)" />)}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExp && (
              <div style={{
                background: 'linear-gradient(135deg, #EAF7F2 0%, #F0F9FF 100%)',
                border: '1.5px solid rgba(79,190,176,0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem 1.25rem',
                marginBottom: '1.4rem',
                animation: 'expandIn 0.2s var(--ease)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem' }}>
                  <HelpCircle size={16} color="var(--teal)" />
                  <strong style={{ fontSize: '0.88rem', color: 'var(--teal)' }}>Sudut Pandang Edukatif:</strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.55 }}>{q.explanation}</p>
              </div>
            )}

            {showExp && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" id="btn-awareness-next" onClick={handleNext}>
                  <span>{idx < total - 1 ? 'Skenario Berikutnya' : 'Lihat Refleksi'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion Screen */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal) 0%, var(--blue) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.1rem auto', boxShadow: 'var(--shadow-teal)' }}>
              <Award size={32} color="#FFF" />
            </div>

            <span className={`badge ${pct >= 80 ? 'badge-teal' : pct >= 60 ? 'badge-blue' : 'badge-pink'}`} style={{ marginBottom: '0.6rem' }}>
              Refleksi Selesai
            </span>

            <h3 style={{ fontSize: '1.65rem', color: fb.color, marginBottom: '0.4rem' }}>{fb.title}</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>{fb.msg}</p>

            {/* Score visual */}
            <div className="awareness-score-badge">
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Skor Kepekaan</span>
                <strong style={{ fontSize: '1.75rem', color: 'var(--text-dark)', fontFamily: 'var(--font-display)' }}>{score} / {total}</strong>
              </div>
              <div style={{ borderLeft: '1.5px solid var(--border)', paddingLeft: '2rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Indeks Kesadaran</span>
                <strong style={{ fontSize: '1.75rem', color: 'var(--teal)', fontFamily: 'var(--font-display)' }}>{pct}%</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" onClick={reset}>
                <RotateCcw size={15} /><span>Ulangi Kuis</span>
              </button>
              <button className="btn btn-primary" onClick={() => { onClose(); document.querySelector('#learn')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <Sparkles size={15} /><span>Jelajahi Materi Learn</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
