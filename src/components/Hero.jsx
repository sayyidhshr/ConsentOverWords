import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, BookOpen, Compass, Heart, Star } from 'lucide-react';

export const Hero = ({ onOpenAwareness }) => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    {
      key: 'share',
      label: 'SHARE',
      quote: '"Your story deserves to be heard."',
      desc: 'Berbagi pengalaman interaksi digital yang tidak nyaman secara anonim dan terlindungi.',
      href: '#share',
      icon: MessageSquare,
      iconClass: 'icon-circle-pink',
      cardClass: 'card card-pink',
    },
    {
      key: 'understand',
      label: 'UNDERSTAND',
      quote: '"Not every \'joke\' feels like a joke."',
      desc: 'Pelajari consent, batasan digital, dan etika komunikasi di ruang siber.',
      href: '#learn',
      icon: BookOpen,
      iconClass: 'icon-circle-teal',
      cardClass: 'card card-mint',
    },
    {
      key: 'act',
      label: 'ACT',
      quote: '"Knowing what to do matters."',
      desc: 'Ketahui langkah praktis saat menghadapi atau menyaksikan pelanggaran batas.',
      href: '#action',
      icon: Compass,
      iconClass: 'icon-circle-blue',
      cardClass: 'card card-blue',
    },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section id="home" className="hero-section">
        {/* Decorative Bubbles */}
        <div className="bubble bubble-teal" style={{ width: 340, height: 340, top: -80, right: -60, zIndex: 0 }} />
        <div className="bubble bubble-pink" style={{ width: 220, height: 220, bottom: 40, left: -60, zIndex: 0 }} />
        <div className="bubble bubble-blue" style={{ width: 160, height: 160, top: '40%', right: '30%', zIndex: 0 }} />

        <div className="container">
          <div className="hero-grid" style={{ position: 'relative', zIndex: 1 }}>
            {/* Left: Copy */}
            <div>
              {/* Eyebrow */}
              <div className="hero-eyebrow">
                <Star size={13} fill="currentColor" />
                <span>LIDM 2026 · Kampanye Edukasi Digital</span>
              </div>

              {/* Title Wordmark */}
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '0.3rem'
              }}>
                CONSENT OVER WORDS
              </p>

              {/* Main Headline */}
              <h1 className="hero-title-main">
                Your words matter.{' '}
                <span className="gradient-text">So do their boundaries.</span>
              </h1>

              <p className="hero-subtitle">
                Kata-kata di ruang digital mungkin terlihat sederhana, tetapi dampaknya bisa jauh lebih besar dari yang kita sadari.
              </p>

              {/* CTAs */}
              <div className="hero-cta-row">
                <button
                  id="btn-hero-share"
                  className="btn btn-primary btn-lg"
                  onClick={() => scrollTo('#share')}
                >
                  <MessageSquare size={17} />
                  <span>Share Your Story</span>
                </button>
                <button
                  id="btn-hero-explore"
                  className="btn btn-secondary btn-lg"
                  onClick={() => scrollTo('#why')}
                >
                  <span>Start Exploring</span>
                  <ArrowRight size={17} />
                </button>
              </div>

              {/* Trust Signals */}
              <div className="hero-trust-row">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }}></span>
                  100% Anonim
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={14} color="var(--teal)" />
                  Dimoderasi & Aman
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Heart size={14} color="var(--pink)" />
                  Platform Edukasi
                </span>
              </div>
            </div>

            {/* Right: Chat Visual Card */}
            <div className="hero-visual">
              <div className="hero-card">
                {/* Window Bar */}
                <div className="chat-header">
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <div className="chat-avatar">💬</div>
                    <div>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--text-dark)', display: 'block' }}>Percakapan Digital</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Simulasi Interaksi</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {['#FCA5A5', '#FCD34D', '#6EE7B7'].map((c) => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }}></div>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div className="chat-msg chat-msg-in">
                    "Pap lagi santai di kamar dong, kan kita temenan... santai aja 😄"
                  </div>
                  <div className="chat-msg chat-msg-boundary">
                    "Maaf, saya tidak nyaman dengan permintaan ini. 🙅‍♀️"
                  </div>
                  <div className="chat-msg chat-msg-in" style={{ animationDelay: '1.5s' }}>
                    "Baperan banget sih, cuma bercanda kok..."
                  </div>
                </div>

                {/* Callout */}
                <div className="hero-callout">
                  <ShieldCheck size={20} color="var(--teal)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '0.83rem', color: 'var(--text-dark)', display: 'block' }}>
                      Niat bercanda ≠ Bebas melanggar batas
                    </strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Dampak yang dirasakan selalu lebih nyata dari alasannya.
                    </span>
                  </div>
                </div>

                {/* Micro CTA */}
                <button
                  className="btn btn-outline-teal btn-sm"
                  style={{ width: '100%', marginTop: '1.1rem' }}
                  onClick={() => onOpenAwareness('pre')}
                >
                  <span>✨ Uji kepekaan batas digitalmu</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why It Matters ───────────────────────────────── */}
      <section id="why" className="section section-mint">
        {/* Bubble */}
        <div className="bubble bubble-pink" style={{ width: 280, height: 280, top: -60, right: '10%', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header">
            <span className="badge badge-teal">Mengapa Ini Penting?</span>
            <h2>Ruang Digital <span className="gradient-text">Tidak Selalu Aman</span></h2>
            <p>
              Di balik layar sentuh dan keyboard, kita sering lupa ada manusia nyata di ujung sana. Candaan di kolom komentar, spam DM, atau screenshot privat yang disebar bisa merenggut rasa aman seseorang.
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid-3">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.key} className={p.cardClass} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className={`icon-circle ${p.iconClass}`}>
                      <Icon size={22} />
                    </div>

                    <span className="badge badge-blue" style={{ marginBottom: '0.65rem', fontFamily: 'var(--font-display)' }}>
                      {p.label}
                    </span>

                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '0.55rem', lineHeight: 1.3 }}>
                      {p.quote}
                    </p>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      {p.desc}
                    </p>
                  </div>

                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                    onClick={() => scrollTo(p.href)}
                  >
                    <span>{p.key === 'share' ? 'Share Your Story' : p.key === 'understand' ? 'Learn More' : 'What Can I Do?'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
