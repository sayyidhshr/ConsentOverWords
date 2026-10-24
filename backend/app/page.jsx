export default function BackendHomePage() {
  return (
    <main style={{ maxWidth: 800, margin: '2rem auto', background: '#FFF', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '2rem' }}></span>
        <h1 style={{ fontSize: '1.75rem', margin: 0, color: '#1B2A4A' }}>Consent Over Words — Backend API</h1>
      </div>
      <p style={{ color: '#64748B', lineHeight: 1.6 }}>
        Next.js Backend API terhubung ke MySQL Workbench melalui Prisma ORM.
      </p>

      <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid #E2E8F0' }} />

      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Daftar API Endpoints:</h2>
      <ul style={{ lineHeight: 2, paddingLeft: '1.25rem' }}>
        <li><code>GET /api/health</code> — Cek status server & koneksi MySQL</li>
        <li><code>GET /api/stories</code> — Mengambil daftar cerita (parameter: <code>?status=approved</code> / <code>?status=pending</code> / <code>?status=all</code>)</li>
        <li><code>POST /api/stories</code> — Menyimpan cerita baru (pesan, informasi perasaan, kategori) ke database</li>
        <li><code>PATCH /api/stories/:id</code> — Update status moderasi atau kategori cerita</li>
        <li><code>DELETE /api/stories/:id</code> — Hapus cerita</li>
        <li><code>POST /api/stories/:id/resonate</code> — Tambah dukungan "You Are Not Alone"</li>
        <li><code>GET /api/assessments</code> — Mengambil data asesmen kuis awareness</li>
        <li><code>POST /api/assessments</code> — Menyimpan hasil asesmen kuis ke database</li>
        <li><code>DELETE /api/assessments/:id</code> — Hapus data asesmen</li>
      </ul>
    </main>
  );
}
