import React, { useState } from 'react';
import {
  ShieldCheck, Compass, MessageSquareOff, HeartOff, Share2, AlertTriangle,
  SmilePlus, ChevronDown, ChevronUp, ArrowRight, Lightbulb, Check, Sparkles
} from 'lucide-react';
import { LEARN_MODULES, INTERACTIVE_SCENARIO } from '../data/seedData';

const ICON_MAP = {
  ShieldCheck: <ShieldCheck size={22} />, Compass: <Compass size={22} />,
  MessageSquareOff: <MessageSquareOff size={22} />, HeartOff: <HeartOff size={22} />,
  Share2: <Share2 size={22} />, AlertTriangle: <AlertTriangle size={22} />,
  SmilePlus: <SmilePlus size={22} />
};

const ICON_CLASSES = [
  'icon-circle-teal', 'icon-circle-blue', 'icon-circle-pink',
  'icon-circle-orange', 'icon-circle-lavender', 'icon-circle-pink', 'icon-circle-teal'
];

export const LearnSection = ({ onOpenAwareness }) => {
  const [activeId, setActiveId] = useState(LEARN_MODULES[0].id);
  const [simChoice, setSimChoice] = useState(null);

  const feedback = simChoice ? INTERACTIVE_SCENARIO.options.find(o => o.id === simChoice) : null;

  return (
    <section id="learn" className="section section-white">
      {/* Background bubbles */}
      <div className="bubble bubble-teal" style={{ width: 250, height: 250, top: '10%', left: -80, zIndex: 0 }} />
      <div className="bubble bubble-pink" style={{ width: 180, height: 180, bottom: '15%', right: -60, zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="section-header">
          <span className="badge badge-teal">Modul Edukasi Interaktif</span>
          <h2>Understand <span className="gradient-text">Your Boundaries</span></h2>
          <p>
            Memahami batasan bukan tentang membatasi kebebasan — melainkan menciptakan ruang komunikasi yang sehat, bermartabat, dan aman bagi semua orang.
          </p>
        </div>

        {/* Module Accordion Grid */}
        <div className="grid-auto">
          {LEARN_MODULES.map((mod, idx) => {
            const isOpen = activeId === mod.id;
            return (
              <div
                key={mod.id}
                className="card learn-module-card"
                style={{
                  borderColor: isOpen ? 'var(--teal)' : 'var(--border)',
                  boxShadow: isOpen ? 'var(--shadow-teal)' : 'var(--shadow-sm)'
                }}
                onClick={() => setActiveId(isOpen ? null : mod.id)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className={`icon-circle ${ICON_CLASSES[idx]}`} style={{ flexShrink: 0 }}>
                    {ICON_MAP[mod.icon]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>{mod.tag}</span>
                      <span className="card-arrow">
                        {isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>{mod.title}</h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{mod.subtitle}</p>
                  </div>
                </div>

                {isOpen && (
                  <div className="learn-expand-area">
                    <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
                      Poin Kunci:
                    </p>
                    {mod.keyPoints.map((pt, i) => (
                      <div key={i} className="key-point-item">
                        <div className="key-point-dot"></div>
                        <span>{pt}</span>
                      </div>
                    ))}
                    <div style={{
                      marginTop: '0.9rem',
                      background: 'var(--teal-pale)',
                      borderLeft: '3px solid var(--teal)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.8rem 1rem',
                      fontSize: '0.86rem',
                      fontStyle: 'italic',
                      color: 'var(--text-body)'
                    }}>
                      {mod.deepDive}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Interactive Decision Simulator ─────────── */}
        <div className="sim-box">
          <div style={{ marginBottom: '0.6rem' }}>
            <span className="badge badge-orange">Simulasi Keputusan Interaktif</span>
          </div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
            {INTERACTIVE_SCENARIO.title}
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.93rem' }}>
            {INTERACTIVE_SCENARIO.situation}
          </p>

          {/* Message mock */}
          <div style={{
            background: '#FFF',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.1rem 1.25rem',
            marginBottom: '1.35rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                💬
              </div>
              <strong style={{ fontSize: '0.82rem', color: 'var(--text-dark)' }}>Rekan Organisasi</strong>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>• 23:14</span>
            </div>
            <div style={{
              background: 'var(--blue-pale)',
              borderRadius: '0 14px 14px 14px',
              padding: '0.75rem 1rem',
              fontSize: '0.92rem',
              color: 'var(--text-dark)',
              maxWidth: '85%'
            }}>
              {INTERACTIVE_SCENARIO.messagePreview}
            </div>
          </div>

          <p style={{ fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-dark)', marginBottom: '0.9rem' }}>
            Apa respon yang paling nyaman untuk kamu ambil?
          </p>

          <div className="sim-options-grid">
            {INTERACTIVE_SCENARIO.options.map((opt) => (
              <button
                key={opt.id}
                className={`sim-option-btn ${simChoice === opt.id ? 'selected' : ''}`}
                onClick={() => setSimChoice(opt.id)}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                    {opt.badge}
                  </span>
                  <span style={{ fontWeight: 600 }}>{opt.choice}</span>
                </div>
                {simChoice === opt.id && <Check size={16} color="var(--teal)" />}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <div style={{
              background: '#FFF',
              border: '1.5px solid rgba(79, 190, 176, 0.3)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.4rem',
              animation: 'expandIn 0.25s var(--ease)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <Lightbulb size={19} color="var(--orange)" />
                <strong style={{ fontSize: '1rem', color: 'var(--text-dark)' }}>{feedback.feedbackTitle}</strong>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginBottom: '0.75rem' }}>{feedback.feedbackText}</p>
              <div style={{ background: 'var(--teal-pale)', borderLeft: '3px solid var(--teal)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', fontSize: '0.86rem', color: 'var(--text-body)' }}>
                {feedback.safetyTip}
              </div>
            </div>
          )}
        </div>

        {/* Post-awareness CTA */}
        <div className="post-check-banner">
          <span className="badge badge-pink" style={{ marginBottom: '0.7rem' }}>Refleksi Post-Test</span>
          <h3 style={{ fontSize: '1.55rem', marginBottom: '0.6rem' }}>
            Has your perspective changed?
          </h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
            Setelah menjelajahi modul edukasi, coba uji kembali pemahamanmu dan lihat seberapa jauh perspektifmu berkembang.
          </p>
          <button
            id="btn-post-check"
            className="btn btn-primary btn-lg"
            onClick={() => onOpenAwareness('post')}
          >
            <Sparkles size={17} />
            <span>Ikuti Post-Awareness Check</span>
          </button>
        </div>
      </div>
    </section>
  );
};
