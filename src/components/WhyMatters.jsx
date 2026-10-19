import React from 'react';
import { Share2, BookOpen, Compass, ArrowRight, ShieldCheck, HeartPulse, UserCheck } from 'lucide-react';

export const WhyMatters = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    {
      id: 'share',
      tagline: 'SHARE',
      quote: '“Your story deserves to be heard.”',
      title: 'Ruang Cerita Bersama',
      desc: 'Berbagi pengalaman interaksi digital yang tidak nyaman secara 100% anonim dan terlindungi. Suaramu membantu orang lain menyadari bahwa mereka tidak sendirian.',
      btnText: 'Share Your Story',
      target: '#share-story',
      icon: Share2,
      cardClass: 'pillar-share',
      btnClass: 'btn-primary'
    },
    {
      id: 'understand',
      tagline: 'UNDERSTAND',
      quote: '“Not every ‘joke’ feels like a joke.”',
      title: 'Pahami Consent & Batasan',
      desc: 'Pelajari konsep persetujuan digital, batasan privasi personal, serta dinamika di balik candaan yang melukai melalui modul interaktif dan simulasi skenario nyata.',
      btnText: 'Learn More',
      target: '#learn',
      icon: BookOpen,
      cardClass: 'pillar-understand',
      btnClass: 'btn-secondary'
    },
    {
      id: 'act',
      tagline: 'ACT',
      quote: '“Knowing what to do matters.”',
      title: 'Langkah Aksi Nyata',
      desc: 'Ketahui langkah praktis dan aman saat menghadapi pelanggaran batas diri sendiri atau saat menjadi saksi (upstander) di ruang siber.',
      btnText: 'What Can I Do?',
      target: '#what-can-i-do',
      icon: Compass,
      cardClass: 'pillar-act',
      btnClass: 'btn-outline-orange'
    }
  ];

  return (
    <section id="why-matters" className="section" style={{ background: 'rgba(10, 7, 41, 0.4)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-orange">
            <span>Mengapa Ini Penting?</span>
          </div>
          <h2>Ruang Digital Tidak Selalu Terasa Aman</h2>
          <p>
            Di balik layar sentuh dan keyboard, kita sering lupa bahwa ada manusia dengan emosi dan batas privasi di ujung sana. Candaan di kolom komentar, spam DM tanpa henti, atau screenshot chat privat yang disebar bisa merenggut rasa aman seseorang dalam sekejap.
          </p>
        </div>

        {/* 3 Main Pillars */}
        <div className="pillar-grid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} className={`glass-card pillar-card ${pillar.cardClass}`}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span className="badge badge-lavender" style={{ fontFamily: 'var(--font-mono)' }}>
                      {pillar.tagline}
                    </span>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '12px',
                      background: 'rgba(134, 133, 224, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-lavender-light)'
                    }}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--accent-orange)',
                    marginBottom: '0.6rem'
                  }}>
                    {pillar.quote}
                  </p>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>
                    {pillar.title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>

                <div>
                  <button
                    className={`btn ${pillar.btnClass}`}
                    style={{ width: '100%' }}
                    onClick={() => scrollTo(pillar.target)}
                  >
                    <span>{pillar.btnText}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Saling Jaga Community Movement Banner */}
        <div style={{
          marginTop: '3.5rem',
          background: 'linear-gradient(135deg, rgba(80, 76, 150, 0.25) 0%, rgba(228, 136, 38, 0.12) 100%)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', maxWidth: '750px' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-orange) 0%, var(--accent-warm-red) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              flexShrink: 0
            }}>
              <UserCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>Gerakan Saling Jaga Warga Digital</h4>
              <p style={{ fontSize: '0.88rem', margin: 0 }}>
                Platform ini dibangun bukan sebagai tempat aduan formal, melainkan ruang kolektif mahasiswa dan masyarakat untuk membangun kesadaran, saling menghormati ruang pribadi, dan menghentikan normalisasi pelecehan digital.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span className="badge badge-warm">#ConsentOverWords</span>
            <span className="badge badge-lavender">#SalingJaga</span>
          </div>
        </div>
      </div>
    </section>
  );
};
