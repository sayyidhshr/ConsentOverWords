# Consent Over Words — Next.js Backend (Prisma & MySQL)

Backend API untuk platform kampanye **Consent Over Words**, dibangun menggunakan **Next.js (App Router)** dan **Prisma ORM** yang terhubung langsung ke **MySQL Workbench**.

---

## 🗄️ Konfigurasi Database (.env)

File konfigurasi koneksi MySQL tersimpan di [`.env`](file:///C:/Users/LATITUDE%207480/ConsentOverWords/backend/.env):

```env
DATABASE_URL="mysql://root:PASSWORD@localhost:3306/consent_over_words"
PORT=3000
```

---

## 🚀 Perintah Menjalankan Backend

Dari root project (`ConsentOverWords/`):

| Perintah | Deskripsi |
|---|---|
| `npm run backend:dev` | Menjalankan backend Next.js dalam mode development di `http://localhost:3000` |
| `npm run backend:build` | Melakukan build produksi backend |
| `npm run backend:start` | Menjalankan backend mode produksi di `http://localhost:3000` |
| `npm run backend:push` | Sinkronisasi skema Prisma ke database MySQL (`prisma db push`) |
| `npm run backend:seed` | Mengisi database MySQL dengan seed data cerita & asesmen (`prisma/seed.js`) |
| `npm run backend:studio` | Membuka Prisma Studio GUI di browser untuk melihat isi tabel database MySQL |

---

## 📡 Daftar Endpoints API

### 1. Stories (Cerita Pengguna)
- `GET /api/stories` — Mendapatkan semua cerita (query filter: `?status=approved`, `?status=pending`, atau `?status=all`).
- `POST /api/stories` — Mengirimkan cerita baru (pesan, informasi perasaan, kategori, dan izin publikasi). Data otomatis berstatus `pending` dan disimpan ke tabel `Story` di MySQL.
- `GET /api/stories/:id` — Mengambil detail cerita berdasarkan ID.
- `PATCH /api/stories/:id` — Update status moderasi (`approved` / `rejected`) atau kategori cerita.
- `DELETE /api/stories/:id` — Menghapus cerita dari database.
- `POST /api/stories/:id/resonate` — Menambah/mengurangi dukungan *"You Are Not Alone"* (`{ "action": "increment" | "decrement" }`).

### 2. Assessments (Kuis Kesadaran)
- `GET /api/assessments` — Mendapatkan seluruh riwayat asesmen partisipan.
- `POST /api/assessments` — Menyimpan hasil kuis awareness (pre-test / post-test) ke database MySQL.
- `DELETE /api/assessments/:id` — Menghapus data asesmen partisipan.

### 3. Server & Health Check
- `GET /api/health` — Menampilkan status koneksi database MySQL, total cerita, dan total asesmen.
- `POST /api/admin/reset` — Mereset data di database MySQL kembali ke seed dataset default.
