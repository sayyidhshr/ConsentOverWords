import React from 'react';
import { MessageCircle, Heart } from 'lucide-react';

export const Footer = ({ onOpenAwareness }) => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
    { label: 'Official Poster', href: '#poster' },
    { label: 'Learn', href: '#learn' },
    { label: 'Share Your Story', href: '#share' },
    { label: 'Voices', href: '#voices' },
    { label: 'What Can I Do?', href: '#action' },
    { label: 'What We Hear (Insights)', href: '#insights' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #4FBEB0, #3B6EA8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageCircle size={17} color="#FFF" />
              </div>
              <span className="footer-brand-title">Consent Over Words</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: '1rem' }}>
              "Words can be shared in seconds. Their impact can last much longer."
            </p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
              Tindak lanjut <strong>LIDM 2026</strong>:<br />
              <em>"Kata di Ruang Digital Dapat Melanggar Batas"</em>
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Navigasi
            </h4>
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="footer-link"
                onClick={(e) => { e.preventDefault(); scrollTo(s.href); }}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Campaign Values */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Prinsip Kampanye
            </h4>
            {['EDUCATE', 'LISTEN', 'EMPOWER'].map((p) => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4FBEB0', display: 'inline-block', flexShrink: 0 }}></span>
                {p}
              </div>
            ))}
          </div>

          {/* Awareness CTA */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mulai Sekarang
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
              Uji kepekaan batas digitalmu dengan kuis singkat berbasis skenario nyata.
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onOpenAwareness('pre')}
            >
              ✨ Take Awareness Check
            </button>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.75rem' }}>
              Admin? Akses melalui{' '}
              <a href="/admin" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>
                /admin
              </a>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>© 2026 Consent Over Words — Gerakan Edukasi</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Dibuat dengan <Heart size={12} fill="currentColor" color="#E893B0" /> oleh Tim Jarvis
          </span>
        </div>
      </div>
    </footer>
  );
};
