import React, { useState, useEffect } from 'react';
import { Sparkles, ExternalLink, ZoomIn, X, Heart, MessageCircle, Share2, ShieldCheck, Award } from 'lucide-react';

// Lucide-compatible Instagram SVG Icon
const InstagramIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const CampaignPosterSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    if (lightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  const instagramPostUrl = "https://www.instagram.com/p/Da5TtfqMj78/?utm_source=ig_web_copy_link";

  const engagementSteps = [
    {
      icon: <Heart size={14} fill="currentColor" />,
      iconBg: 'var(--purple-pale)',
      iconColor: 'var(--purple)',
      title: 'Beri Like pada Postingan',
      desc: 'Apresiasi karya poster edukasi digital untuk mendukung partisipasi LIDM.',
    },
    {
      icon: <MessageCircle size={14} />,
      iconBg: 'var(--lilac-pale)',
      iconColor: 'var(--purple-dark)',
      title: 'Tuliskan Komentar Positif',
      desc: 'Sampaikan pandanganmu atau tag teman untuk membuka diskusi yang sehat.',
    },
    {
      icon: <Share2 size={14} />,
      iconBg: 'var(--butter-pale)',
      iconColor: 'var(--butter-dark)',
      title: 'Repost ke Instagram Story',
      desc: 'Bagikan kembali untuk mengajak followersmu lebih peka terhadap batas privasi.',
    },
  ];

  return (
    <section id="poster" className="section section-butter relative overflow-hidden">
      {/* Decorative Bubbles */}
      <div className="bubble bubble-teal" style={{ width: 300, height: 300, top: '-60px', right: '-60px', zIndex: 0 }} />
      <div className="bubble bubble-pink" style={{ width: 220, height: 220, bottom: '-40px', left: '-50px', zIndex: 0 }} />

      <div className="container relative z-10">

        {/* ── Section Header ── */}
        <div className="section-header">
          <span className="badge badge-teal flex items-center gap-1.5 mx-auto w-fit">
            <Award size={13} />
            Karya Poster Edukasi LIDM 2026
          </span>
          <h2>
            Official Campaign Poster:{' '}
            <span className="gradient-text">Consent Over Words</span>
          </h2>
          <p>
            Karya poster edukasi digital resmi yang menjadi fondasi gerakan kesadaran batasan komunikasi di ruang siber.
            Bantu gaungkan pesan ini agar semakin banyak orang saling menjaga dan menghargai privasi sesama!
          </p>
        </div>

        {/* ── 2-Column Grid ── */}
        <div className="campaign-poster-grid">

          {/* ── Left: Poster Showcase ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div
              className="group poster-card-wrapper"
            >
              {/* Image Frame */}
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-lg)',
                  aspectRatio: '4 / 5',
                  backgroundColor: 'var(--bg-lilac)',
                  cursor: 'pointer',
                }}
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src="/Poster.png"
                  alt="Poster Resmi Kampanye Consent Over Words – LIDM 2026"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  loading="lazy"
                />

                {/* Hover Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.32)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: '#fff',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                  }}
                  className="group-hover-overlay"
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <ZoomIn size={18} />
                  <span>Klik untuk Perbesar</span>
                </div>

                {/* Corner Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'linear-gradient(135deg, var(--purple-deep) 0%, var(--purple) 100%)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <Sparkles size={11} />
                  <span>Poster Resmi LIDM</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.6rem',
                  marginTop: '0.75rem',
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setLightboxOpen(true)}
                  style={{ width: '100%', justifyContent: 'center', gap: '0.35rem' }}
                >
                  <ZoomIn size={14} />
                  <span>Lihat Ukuran Penuh</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: Instagram Engagement Card ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Main Engagement Card */}
            <div
              className="card poster-engagement-card"
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #405DE6 0%, #833AB4 50%, #E1306C 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <InstagramIcon size={18} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--purple)',
                      fontFamily: "var(--font-display)",
                      display: 'block',
                    }}
                  >
                    Dukungan Media Sosial
                  </span>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--text-dark)',
                      margin: 0,
                      fontFamily: "var(--font-display)",
                      lineHeight: 1.25,
                    }}
                  >
                    Beri Dukungan di Instagram!
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: 'var(--text-body)',
                  margin: '0 0 1.25rem 0',
                  fontFamily: "var(--font-body)",
                }}
              >
                Gerakan ini membutuhkan suaramu! Bantu sebarkan karya poster digital ini ke audiens yang lebih luas
                agar kesadaran etika dan batasan komunikasi di media sosial semakin tumbuh.
              </p>

              {/* 3 Engagement Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                {engagementSteps.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'var(--bg-page)',
                      border: '1.5px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: step.iconBg,
                        color: step.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <strong
                        style={{
                          fontSize: '0.83rem',
                          color: 'var(--text-dark)',
                          display: 'block',
                          marginBottom: '2px',
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {i + 1}. {step.title}
                      </strong>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.5,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {step.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button – Instagram Gradient */}
              <a
                href={instagramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, #405DE6 0%, #833AB4 50%, #E1306C 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  fontFamily: "var(--font-display)",
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                  boxShadow: '0 4px 18px rgba(131, 58, 180, 0.32)',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(131, 58, 180, 0.48)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(131, 58, 180, 0.32)';
                }}
              >
                <InstagramIcon size={17} />
                <span>Buka Postingan di Instagram & Dukung</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Pesan Utama Poster */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '1.1rem 1.25rem',
                backgroundColor: 'var(--purple-pale)',
                border: '1.5px solid var(--lilac-border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <ShieldCheck
                size={20}
                color="var(--purple-deep)"
                style={{ flexShrink: 0, marginTop: '2px' }}
              />
              <div>
                <strong
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-dark)',
                    display: 'block',
                    marginBottom: '0.3rem',
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Pesan Utama Poster
                </strong>
                <p
                  style={{
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)',
                    margin: 0,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <em>"Consent Over Words"</em> mengingatkan kita bahwa layar gadget tidak menghapus batasan etika.
                  Sebelum berkomentar, membagikan foto, atau bercanda secara daring — pastikan persetujuan dan
                  kenyamanan bersama selalu diutamakan.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      {lightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(6px)',
          }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'background 0.2s',
            }}
            onClick={() => setLightboxOpen(false)}
            aria-label="Tutup"
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <X size={20} />
          </button>

          {/* Modal Image */}
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '640px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/Poster.png"
              alt="Poster Resmi Consent Over Words HD"
              style={{
                maxHeight: '80vh',
                maxWidth: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                border: '2px solid rgba(255,255,255,0.18)',
              }}
            />

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <a
                href={instagramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ gap: '0.4rem' }}
              >
                <InstagramIcon size={14} />
                <span>Lihat di Instagram</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CampaignPosterSection;
