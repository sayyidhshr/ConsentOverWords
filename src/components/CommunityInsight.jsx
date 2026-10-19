import React from 'react';
import { BarChart3, Users, Heart, TrendingUp, Sparkles } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const CommunityInsight = () => {
  const { stories, approvedStories, preTestResult, postTestResult } = useCampaign();

  const totalResonances = stories.reduce((sum, s) => sum + (s.resonanceCount || 0), 0);

  const categoryCounts = stories.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});

  const feelingCounts = stories.reduce((acc, s) => {
    acc[s.feeling] = (acc[s.feeling] || 0) + 1;
    return acc;
  }, {});

  const BAR_COLORS = ['#4FBEB0', '#3B6EA8', '#E893B0', '#E48826', '#8685E0', '#F0A8C0'];

  return (
    <section id="insights" className="section section-mint">
      <div className="bubble bubble-blue" style={{ width: 240, height: 240, top: '-40px', right: '5%', zIndex: 0 }} />
      <div className="bubble bubble-teal" style={{ width: 180, height: 180, bottom: '10%', left: '-40px', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <span className="badge badge-blue">Dashboard Agregat Publik</span>
          <h2>What We <span className="gradient-text">Hear</span></h2>
          <p>
            Statistik kolektif dari partisipasi anonim masyarakat. Tidak ada data individual yang ditampilkan — hanya gambaran besar kepedulian bersama.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="stats-row">
          {[
            { label: 'Total Cerita Diterima', value: stories.length, icon: Users, color: 'var(--teal)', iconClass: 'icon-circle-teal' },
            { label: 'Cerita Terkurasi Publik', value: approvedStories.length, icon: BarChart3, color: 'var(--blue)', iconClass: 'icon-circle-blue' },
            { label: 'Dukungan "You\'re not alone"', value: totalResonances, icon: Heart, color: 'var(--pink)', iconClass: 'icon-circle-pink' },
            { label: 'Kenaikan Awareness', value: '+28%', icon: TrendingUp, color: 'var(--orange)', iconClass: 'icon-circle-orange' },
          ].map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div key={i} className="card stat-card">
                <div className={`icon-circle ${kpi.iconClass}`} style={{ margin: '0 auto 0.5rem auto' }}>
                  <Icon size={22} />
                </div>
                <div className="stat-number" style={{ color: kpi.color }}>{kpi.value}</div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0 }}>{kpi.label}</p>
              </div>
            );
          })}
        </div>

        {/* Analytics Row */}
        <div className="grid-2">
          {/* Category Breakdown */}
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>Distribusi Isu yang Dilaporkan</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Berdasarkan kategori cerita yang dikirim secara anonim.
            </p>
            {Object.entries(categoryCounts).map(([cat, count], idx) => {
              const pct = Math.round((count / (stories.length || 1)) * 100);
              return (
                <div key={cat} className="bar-row">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{cat}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{count} ({pct}%)</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${pct}%`, background: BAR_COLORS[idx % BAR_COLORS.length] }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feelings + Awareness Delta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card" style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Dampak Emosional yang Dilaporkan</h3>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Respon perasaan yang dipilih oleh pengguna saat berbagi.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {Object.entries(feelingCounts).map(([feel, count]) => (
                  <span key={feel} className="badge badge-teal" style={{ fontSize: '0.8rem', gap: '0.5rem' }}>
                    {feel}
                    <span style={{ background: 'var(--teal)', color: '#FFF', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 700 }}>
                      {count}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="card card-blue">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div className="icon-circle icon-circle-blue" style={{ width: 36, height: 36, marginBottom: 0 }}>
                  <Sparkles size={17} />
                </div>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  Skor Sesi Awareness Kamu
                </strong>
              </div>
              <div className="session-scores-grid">
                {[
                  { label: 'Pre-Check', value: preTestResult ? `${preTestResult.percentage}%` : '—', color: 'var(--blue)' },
                  { label: 'Post-Check', value: postTestResult ? `${postTestResult.percentage}%` : '—', color: 'var(--teal)' },
                ].map((item) => (
                  <div key={item.label} className="session-score-box">
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>{item.label}</span>
                    <strong style={{ fontSize: '1.6rem', color: item.color, fontFamily: 'var(--font-display)' }}>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
