import React, { useState } from 'react';
import { Sparkles, Camera, ShieldAlert, UserX, Flag, HeartHandshake, Hand, XCircle, Shield, MessageCircleHeart, FileCheck, Users, Copy, Check } from 'lucide-react';
import { ACTION_GUIDE } from '../data/seedData';

const ICON_MAP = {
  Sparkles: Sparkles, Camera: Camera, ShieldAlert: ShieldAlert, UserX: UserX,
  Flag: Flag, HeartHandshake: HeartHandshake, Hand: Hand, XCircle: XCircle,
  Shield: Shield, MessageCircleHeart: MessageCircleHeart, FileCheck: FileCheck, Users: Users
};

const STEP_COLORS = ['var(--teal)', 'var(--blue)', 'var(--pink)', 'var(--orange)', 'var(--lavender)', 'var(--teal)'];
const STEP_ICON_CLASSES = ['icon-circle-teal', 'icon-circle-blue', 'icon-circle-pink', 'icon-circle-orange', 'icon-circle-lavender', 'icon-circle-teal'];
const BYSTANDER_ICON_CLASSES = ['icon-circle-orange', 'icon-circle-pink', 'icon-circle-teal', 'icon-circle-blue', 'icon-circle-lavender', 'icon-circle-teal'];

export const WhatCanIDoSection = () => {
  const [activeTab, setActiveTab] = useState('victim');
  const [copied, setCopied] = useState(null);

  const copyTemplate = (text, i) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  const steps = activeTab === 'victim' ? ACTION_GUIDE.victim : ACTION_GUIDE.bystander;
  const iconClasses = activeTab === 'victim' ? STEP_ICON_CLASSES : BYSTANDER_ICON_CLASSES;

  return (
    <section id="action" className="section section-white">
      {/* Bubbles */}
      <div className="bubble bubble-blue" style={{ width: 260, height: 260, top: '5%', right: -80, zIndex: 0 }} />
      <div className="bubble bubble-teal" style={{ width: 200, height: 200, bottom: '10%', left: -60, zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <span className="badge badge-blue">Panduan Aksi Nyata</span>
          <h2>What Can <span className="gradient-text">I Do?</span></h2>
          <p>
            Mengetahui langkah konkret yang bisa diambil saat menghadapi atau menyaksikan pelanggaran batas dapat membuat perbedaan besar bagi keselamatan dan kesejahteraan diri kita bersama.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="action-tabs">
          <button
            id="tab-victim"
            className={`action-tab ${activeTab === 'victim' ? 'active' : ''}`}
            onClick={() => setActiveTab('victim')}
          >
            🛡️ Jika Terjadi Pada Anda
          </button>
          <button
            id="tab-bystander"
            className={`action-tab ${activeTab === 'bystander' ? 'active' : ''}`}
            onClick={() => setActiveTab('bystander')}
          >
            🤝 Jika Anda Menyaksikannya
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid-auto">
          {steps.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || Sparkles;
            return (
              <div key={i} className="card">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div className={`icon-circle ${iconClasses[i]}`} style={{ flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: STEP_COLORS[i],
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '0.25rem'
                    }}>
                      LANGKAH {item.step}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Boundary Response Templates */}
        <div style={{ marginTop: '3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span className="badge badge-pink" style={{ marginBottom: '0.5rem' }}>Template Komunikasi Asertif</span>
            <h3 style={{ fontSize: '1.4rem', marginTop: '0.4rem' }}>Contoh Kalimat Menegakkan Batas</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Klik tombol salin dan gunakan kalimat ini sebagai acuan respons yang asertif dan profesional.
            </p>
          </div>

          <div className="templates-grid">
            {ACTION_GUIDE.boundaryTemplates.map((tpl, i) => (
              <div key={i} className="card card-pink">
                <strong style={{ fontSize: '0.88rem', color: 'var(--pink)', display: 'block', marginBottom: '0.5rem' }}>
                  {tpl.title}
                </strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', fontStyle: 'italic', marginBottom: '1rem' }}>
                  {tpl.template}
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => copyTemplate(tpl.template, i)}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {copied === i ? (
                    <><Check size={13} color="var(--teal)" /><span style={{ color: 'var(--teal)' }}>Tersalin!</span></>
                  ) : (
                    <><Copy size={13} /><span>Salin Kalimat</span></>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
