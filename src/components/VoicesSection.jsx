import React, { useState } from 'react';
import { Heart, Search, Calendar, Sparkles, Filter, LayoutGrid, Rows } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { AnonymousHorizontalMarquee } from '@/components/ui/AnonymousHorizontalMarquee';

const FILTERS = ['All', 'Unwanted Comments', 'Body Shaming', 'Sexual Harassment', 'Sharing Without Consent', 'Cyberbullying'];

const CATEGORY_BADGES = {
  'Unwanted Comments': 'badge-blue',
  'Body Shaming': 'badge-orange',
  'Sexual Harassment': 'badge-pink',
  'Sharing Without Consent': 'badge-lavender',
  'Cyberbullying': 'badge-teal',
  'Other': 'badge-blue',
};

// Rich Anonymous Testimonials for the animated column marquee
const ANONYMOUS_STORIES_CAROUSEL = [
  {
    id: "anon-1",
    text: "Setiap kali saya posting foto kegiatan organisasi di Instagram, selalu ada kenalan yang meninggalkan komentar bernada fisik dan 'candaan' menggoda. Saat ditegur, dia berdalih 'santai aja kali, kan cuma muji'. Batas privasi saya sama sekali tidak dihargai.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    name: "Anonim #A12",
    role: "Mahasiswi, Jakarta",
    category: "Unwanted Comments",
    feeling: "Uncomfortable"
  },
  {
    id: "anon-2",
    text: "Screenshot curhatan pribadi saya di grup kecil disebarkan ke grup angkatan tanpa izin saya sama sekali, hanya untuk dijadikan lelucon. Saya merasa dikhianati dan langsung menarik diri dari interaksi online selama berminggu-minggu.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    name: "Anonim #B34",
    role: "Mahasiswa, Bandung",
    category: "Sharing Without Consent",
    feeling: "Betrayed"
  },
  {
    id: "anon-3",
    text: "Foto wisuda saya dikomentari di Twitter dengan membandingkan proporsi tubuh saya memakai kata-kata sarkas. Orang-orang ikut tertawa. Komentar 5 detik itu membuat saya cemas bercermin selama berbulan-bulan.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    name: "Anonim #C56",
    role: "Fresh Graduate, Surabaya",
    category: "Body Shaming",
    feeling: "Sad & Insecure"
  },
  {
    id: "anon-4",
    text: "Mendapat DM berisi ajakan eksplisit dan voice note tidak pantas dari kenalan di game online. Ketika saya tolak dengan tegas, dia mengancam akan menyebarkan ID medsos saya. Segera saya block dan amankan tangkapan layar.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    name: "Anonim #D78",
    role: "Pelajar SMA, Yogyakarta",
    category: "Sexual Harassment",
    feeling: "Unsafe"
  },
  {
    id: "anon-5",
    text: "Ada akun anonim di menfess kampus yang menggiring opini negatif dan menyindir nama panggilan saya. Kolom komentar penuh spekulasi liar, sementara teman-teman hanya menonton tanpa ada yang berani meluruskan.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    name: "Anonim #E90",
    role: "Mahasiswi, Semarang",
    category: "Cyberbullying",
    feeling: "Angry & Isolated"
  },
  {
    id: "anon-6",
    text: "Sering dikirimi pesan spam larut malam dengan sapaan genit dari rekan satu divisi kerja paruh waktu. Saat tidak dibalas, dia menyindir di grup kerja bahwa saya 'sombong'. Padahal saya hanya ingin menjaga batasan profesional.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80",
    name: "Anonim #F12",
    role: "Intern, Jakarta",
    category: "Unwanted Comments",
    feeling: "Embarrassed"
  },
  {
    id: "anon-7",
    text: "Foto saya saat tertidur di ruang belajar difoto diam-diam dan diunggah ke story publik dengan caption mengejek. Saat diminta take down, dia bilang 'baper banget, kan cuma konten lucu'.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    name: "Anonim #G34",
    role: "Mahasiswa, Malang",
    category: "Sharing Without Consent",
    feeling: "Violated"
  },
  {
    id: "anon-8",
    text: "Di kolom komentar TikTok saya, banyak komentar bernada merendahkan pilihan busana saya saat membuat konten edukasi sains. Layar ponsel sering disalahartikan sebagai izin untuk menghina martabat orang lain.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    name: "Anonim #H56",
    role: "Content Creator, Solo",
    category: "Unwanted Comments",
    feeling: "Frustrated"
  },
  {
    id: "anon-9",
    text: "Nomor pribadi saya disebar ke grup asing tanpa izin setelah menolak ajakan kencan. Saya menerima belasan pesan tidak senonoh dari nomor tak dikenal dalam satu malam. Pengalaman ini sangat membekas.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    name: "Anonim #I78",
    role: "Karyawati, Depok",
    category: "Cyberbullying",
    feeling: "Distressed"
  }
];

// Curated Anonymous Hope & Boundary Stories (highlighting FILKOM mental health quote from screenshot)
const ANONYMOUS_HOPE_STORIES = [
  {
    id: "hope-1",
    text: "Pengen ada lebih banyak kegiatan dengan tema kesehatan mental di FILKOM.",
  },
  {
    id: "hope-2",
    text: "Batas privasi di ruang digital itu penting banget. Stop jadikan screenshot curhatan pribadi sebagai lelucon di grup angkatan.",
  },
  {
    id: "hope-3",
    text: "Semoga kita semua bisa lebih bijak berkomentar dan menghargai konsen orang lain sebelum mengunggah foto bersama.",
  },
  {
    id: "hope-4",
    text: "Komentar bernada fisik itu bukan pujian kalau bikin risih. Ruang digital harusnya jadi tempat yang aman untuk berekspresi.",
  },
  {
    id: "hope-5",
    text: "Pengen kampus dan media sosial kita bebas dari cyberbullying dan akun menfess yang menyindir tanpa dasar fakta.",
  },
  {
    id: "hope-6",
    text: "Semangat buat teman-teman yang sedang berjuang memulihkan diri dari pelecehan verbal online. Suaramu valid dan kamu tidak sendiri!",
  },
  {
    id: "hope-7",
    text: "Belajar menetapkan batasan diri itu bukan berarti sombong. Menolak ajakan tidak pantas adalah hak mutlak setiap orang.",
  },
  {
    id: "hope-8",
    text: "Mari ciptakan budaya saling menjaga dan konfirmasi izin, bukan saling menghakimi di kolom komentar.",
  },
];

export const VoicesSection = () => {
  const { approvedStories, toggleResonate, resonatedIds } = useCampaign();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('marquee'); // 'marquee' | 'grid'

  const allMarqueeStories = React.useMemo(() => {
    const rawStories = [
      ...ANONYMOUS_HOPE_STORIES,
      ...approvedStories.map((s) => ({
        id: s.id,
        text: s.storyText,
        category: s.category,
        feeling: s.feeling,
      })),
    ];

    // Deduplicate stories by text to prevent identical stories from repeating
    const seenTexts = new Set();
    const unique = [];
    for (const item of rawStories) {
      const textKey = (item.text || item.storyText || '').trim().toLowerCase();
      if (textKey && !seenTexts.has(textKey)) {
        seenTexts.add(textKey);
        unique.push(item);
      }
    }

    return unique.length > 0 ? unique : ANONYMOUS_HOPE_STORIES;
  }, [approvedStories]);

  const filtered = approvedStories.filter((s) => {
    const matchFilter = filter === 'All' || s.category === filter;
    const matchSearch = !search || s.storyText.toLowerCase().includes(search.toLowerCase()) || s.feeling.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const fmt = (iso) => {
    try { return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return '—'; }
  };

  return (
    <section id="voices" className="section section-mint relative overflow-hidden">
      {/* Decorative Bubbles */}
      <div className="bubble bubble-teal" style={{ width: 280, height: 280, top: -60, right: '5%', zIndex: 0 }} />
      <div className="bubble bubble-pink" style={{ width: 200, height: 200, bottom: '10%', left: -40, zIndex: 0 }} />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge-teal flex items-center gap-1.5 mx-auto w-fit">
            <Sparkles size={14} /> Suara Komunitas Anonim
          </span>
          <h2><span className="gradient-text">Voices:</span> Pengalaman Nyata, Batasan Bersama</h2>
          <p>
            Kumpulan pengalaman nyata dan harapan yang dibagikan secara anonim. Cerita dan harapan mereka menjadi pengingat bahwa ketidaknyamananmu valid dan kita saling menguatkan.
          </p>
        </div>

        {/* View Toggle Bar */}
        <div className="voices-view-toggle">
          <button
            className={`btn btn-sm ${viewMode === 'marquee' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('marquee')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Rows size={15} />
            <span>Aliran Cerita Bergerak</span>
          </button>
          <button
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setViewMode('grid')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <LayoutGrid size={15} />
            <span>Eksplorasi & Cari ({approvedStories.length} Cerita)</span>
          </button>
        </div>

        {/* View Mode 1: 1-Row Animated Horizontal Marquee moving left */}
        {viewMode === 'marquee' && (
          <div className="voices-marquee-wrapper relative">
            <AnonymousHorizontalMarquee items={allMarqueeStories} speed={70} />

            <div className="text-center mt-6 sm:mt-8 px-2">
              <button
                className="btn btn-secondary btn-sm voices-explore-jump-btn"
                onClick={() => setViewMode('grid')}
              >
                <Search size={14} />
                <span>Ingin cari cerita tertentu atau beri dukungan? Buka Mode Eksplorasi →</span>
              </button>
            </div>
          </div>
        )}

        {/* View Mode 2: Searchable & Filterable Interactive Grid */}
        {viewMode === 'grid' && (
          <div>
            {/* Search + Filter */}
            <div style={{ maxWidth: 820, margin: '0 auto 2rem auto' }}>
              <div style={{ position: 'relative', marginBottom: '1.1rem' }}>
                <Search size={17} color="var(--text-dim)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-full)' }}
                  placeholder="Cari berdasarkan kata kunci, perasaan, atau kategori..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="filter-chip-row">
                {FILTERS.map((f) => (
                  <button key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Stories Grid */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FFF', borderRadius: 'var(--radius-xl)', border: '1.5px dashed var(--border)', maxWidth: 560, margin: '0 auto' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Tidak ada cerita untuk filter ini.</p>
                <button className="btn btn-secondary btn-sm" onClick={() => { setFilter('All'); setSearch(''); }}>Reset Filter</button>
              </div>
            ) : (
              <div className="grid-auto">
                {filtered.map((s) => {
                  const hasResonated = resonatedIds.includes(s.id);
                  return (
                    <div key={s.id} className="card voice-card">
                      <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                          <span className={`badge ${CATEGORY_BADGES[s.category] || 'badge-blue'}`}>{s.category}</span>
                          <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)', padding: '0.2rem 0.6rem', background: '#F5F7FA', borderRadius: 'var(--radius-full)' }}>
                            Felt: <strong style={{ color: 'var(--text-body)' }}>{s.feeling}</strong>
                          </span>
                        </div>
                        <p className="voice-quote">"{s.storyText}"</p>
                      </div>
                      <div className="voice-footer">
                        <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Calendar size={13} />
                          <span>{fmt(s.date)}</span>
                        </span>
                        <button
                          className={`resonance-btn ${hasResonated ? 'active' : ''}`}
                          onClick={() => toggleResonate(s.id)}
                        >
                          <Heart size={13} fill={hasResonated ? '#FFF' : 'transparent'} />
                          <span>{s.resonanceCount || 0}</span>
                          <span style={{ fontSize: '0.76rem' }}>{hasResonated ? 'Dukung Terkirim' : 'You\'re not alone'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Invite to Share */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          paddingTop: '2.5rem',
          borderTop: '1.5px solid rgba(41, 0, 135, 0.08)'
        }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.85rem', fontSize: '0.94rem' }}>
            Punya pengalaman serupa? Kamu bisa berbagi secara aman dan 100% anonim.
          </p>
          <a
            href="#share"
            className="btn btn-outline-teal btn-sm"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#share')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Bagikan Pengalamanmu →
          </a>
        </div>
      </div>
    </section>
  );
};

