import React, { useState } from 'react';
import { Send, Shield, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

const CATEGORIES = ['Unwanted Comments', 'Body Shaming', 'Sexual Harassment', 'Sharing Without Consent', 'Cyberbullying', 'Other'];
const FEELINGS = ['Uncomfortable', 'Embarrassed', 'Angry', 'Sad', 'Confused', 'Unsafe', 'Other'];

export const ShareStorySection = () => {
  const { submitStory } = useCampaign();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [story, setStory] = useState('');
  const [feeling, setFeeling] = useState('Uncomfortable');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (story.trim().length < 20) {
      setError('Cerita minimal 20 karakter agar konteks dapat dipahami.');
      return;
    }
    if (!consent) {
      setError('Centang persetujuan publikasi anonim terlebih dahulu.');
      return;
    }
    setSubmitting(true);
    try {
      await submitStory({
        category,
        storyText: story.trim(),
        feeling,
        consentToPublish: consent
      });
      setSuccess(true);
      setStory('');
      setConsent(false);
    } catch (err) {
      setError(err.message || 'Gagal mengirim cerita ke server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="share" className="section section-pink">
      {/* Bubbles */}
      <div className="bubble bubble-pink" style={{ width: 300, height: 300, top: -80, right: -80, zIndex: 0 }} />
      <div className="bubble bubble-teal" style={{ width: 180, height: 180, bottom: '5%', left: -50, zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header">
          <span className="badge badge-pink">Ruang Berbagi Anonim</span>
          <h2>Your Story <span className="gradient-text">Matters</span></h2>
          <p>
            Pernah mengalami atau menyaksikan interaksi digital yang melanggar batas kenyamananmu? Ceritakan di sini secara anonim. Suaramu membantu membangun empati bersama.
          </p>
        </div>

        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Privacy Notice */}
          <div className="privacy-notice">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <div className="icon-circle icon-circle-teal" style={{ width: 36, height: 36, marginBottom: 0 }}>
                <Shield size={17} />
              </div>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--text-dark)' }}>
                Jaminan Privasi & Keamanan
              </strong>
            </div>
            <ul>
              <li><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span><span><strong>100% Anonim</strong> — Tanpa nama, tanpa login, tanpa penyimpanan identitas apa pun.</span></li>
              <li><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span><span><strong>Jangan sertakan</strong> nama orang lain, nomor telepon, alamat, atau username akun.</span></li>
              <li><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span><span><strong>Tersimpan di Database</strong> — Cerita diproses dan ditinjau melalui meja moderasi sebelum tampil di Voices.</span></li>
              <li><span style={{ color: 'var(--teal)', fontWeight: 700 }}>✓</span><span><strong>Bukan pengaduan resmi</strong> — Untuk darurat, gunakan layanan di Help & Resources.</span></li>
            </ul>
          </div>

          {/* Success State */}
          {success ? (
            <div style={{
              background: 'linear-gradient(135deg, #F0FDF7 0%, #EAF7F2 100%)',
              border: '1.5px solid #10B981',
              borderRadius: 'var(--radius-2xl)',
              padding: '3rem 2rem',
              textAlign: 'center',
              animation: 'popIn 0.3s var(--ease)'
            }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <CheckCircle2 size={30} color="#FFF" />
              </div>
              <h3 style={{ fontSize: '1.55rem', marginBottom: '0.5rem' }}>Thank you for sharing. 💚</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 1.5rem auto' }}>
                Cerita Anda telah tersimpan ke database dan akan ditinjau tim moderasi sebelum tampil di Voices Gallery. Keberanianmu berbagi adalah langkah pertama menciptakan ruang digital yang lebih berempati.
              </p>
              <button className="btn btn-secondary" onClick={() => setSuccess(false)}>Kirim Cerita Lain</button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="card share-story-form">
              {/* Category */}
              <div className="form-group">
                <label className="form-label" htmlFor="story-category">Kategori Pengalaman:</label>
                <select id="story-category" className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Story Text */}
              <div className="form-group">
                <label className="form-label" htmlFor="story-text">Cerita Pengalamanmu (Pesan):</label>
                <textarea
                  id="story-text"
                  className="form-textarea"
                  value={story}
                  onChange={e => setStory(e.target.value)}
                  placeholder="Ceritakan apa yang terjadi. Jangan sertakan nama atau informasi pribadi..."
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  <span>Minimal 20 karakter</span>
                  <span>{story.length} karakter</span>
                </div>
              </div>

              {/* Feeling */}
              <div className="form-group">
                <label className="form-label">Bagaimana perasaanmu saat itu? (Informasi tambahan)</label>
                <div className="feeling-group">
                  {FEELINGS.map(f => (
                    <button key={f} type="button" className={`feeling-btn ${feeling === f ? 'active' : ''}`} onClick={() => setFeeling(f)}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Consent */}
              <label className="form-checkbox-wrapper" htmlFor="story-consent">
                <input id="story-consent" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
                <span>
                  <strong>Publication Consent:</strong> Saya memahami bahwa cerita ini akan dimoderasi dan dipublikasikan secara anonim sebagai bagian dari kampanye edukasi ini.
                </span>
              </label>

              {/* Error */}
              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--pink)', fontSize: '0.85rem', marginTop: '1rem' }}>
                  <AlertCircle size={16} /><span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                id="btn-submit-story"
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '1.75rem' }}
                disabled={submitting}
              >
                <Send size={17} />
                <span>{submitting ? 'Menyimpan ke Database...' : 'Submit My Story'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShareStorySection;
