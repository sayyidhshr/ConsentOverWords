import React from 'react';
import { PhoneCall, ExternalLink, ShieldAlert } from 'lucide-react';
import { HELP_RESOURCES } from '../data/seedData';

export const HelpResourcesSection = () => (
  <section id="help" className="section section-white">
    <div className="bubble bubble-teal" style={{ width: 220, height: 220, top: '-40px', left: '-60px', zIndex: 0 }} />
    <div className="bubble bubble-pink" style={{ width: 180, height: 180, bottom: '10%', right: '-40px', zIndex: 0 }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div className="section-header">
        <span className="badge badge-pink">Layanan Bantuan Resmi</span>
        <h2>You Don't Have to <span className="gradient-text">Handle It Alone.</span></h2>
        <p>
          Jika situasimu membutuhkan penanganan darurat, pendampingan psikologis, atau tindakan hukum, berikut layanan resmi dan terpercaya di Indonesia.
        </p>
      </div>

      <div className="grid-auto" style={{ marginBottom: '2.5rem' }}>
        {HELP_RESOURCES.map((res, i) => (
          <div key={i} className="card resource-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className={`badge ${i % 2 === 0 ? 'badge-teal' : 'badge-blue'}`}>{res.tag}</span>
                <PhoneCall size={18} color="var(--teal)" />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{res.name}</h3>
              <p style={{ fontSize: '0.87rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.5 }}>{res.description}</p>

              <div className="resource-contact-box">
                <span style={{ color: 'var(--text-dark)', fontWeight: 700 }}>📞 {res.hotline}</span>
                <span style={{ color: 'var(--text-muted)' }}>💬 {res.whatsapp}</span>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                <strong>Kapan digunakan:</strong> {res.useCase}
              </p>
            </div>
            <a href={res.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              <span>Situs Resmi</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF5F8 0%, #EAF7F2 100%)',
        border: '1.5px solid rgba(232, 147, 176, 0.3)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem 1.75rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        <div className="icon-circle icon-circle-pink" style={{ flexShrink: 0 }}>
          <ShieldAlert size={20} />
        </div>
        <div>
          <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--text-dark)', display: 'block', marginBottom: '0.2rem' }}>
            Disclaimer Kampanye Edukasi
          </strong>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>
            <em>Consent Over Words</em> adalah platform kampanye edukasi berbasis inisiatif mahasiswa. Untuk situasi darurat medis, pendampingan psikologis mendalam, atau tindakan hukum pidana resmi, segera hubungi lembaga profesional di atas.
          </p>
        </div>
      </div>
    </div>
  </section>
);
