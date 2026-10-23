import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const INITIAL_STORIES = [
  {
    id: "story-1",
    category: "Unwanted Comments",
    storyText: "Setiap kali saya posting foto kegiatan organisasi di Instagram, selalu ada akun kenalan satu kampus yang meninggalkan komentar mengarah ke fisik dan 'candaan' menggoda yang bikin saya risih. Saat saya tegur via DM, dia bilang 'santai aja kali, namanya juga muji'. Rasanya batas privasi saya sama sekali tidak dihargai.",
    feeling: "Uncomfortable",
    date: new Date("2026-09-15T14:32:00Z"),
    status: "approved",
    resonanceCount: 42,
    consentToPublish: true
  },
  {
    id: "story-2",
    category: "Sharing Without Consent",
    storyText: "Screenshot curhatan pribadi saya di grup kecil disebarkan ke grup angkatan tanpa izin saya sama sekali, hanya untuk dijadikan bahan lelucon. Saya merasa dikhianati dan langsung menarik diri dari semua interaksi online selama berminggu-minggu.",
    feeling: "Confused",
    date: new Date("2026-09-14T09:15:00Z"),
    status: "approved",
    resonanceCount: 67,
    consentToPublish: true
  },
  {
    id: "story-3",
    category: "Body Shaming",
    storyText: "Foto wisuda saya dikomentari di Twitter dengan membandingkan proporsi tubuh saya memakai kata-kata 'lucu-lucuan'. Orang-orang ikut tertawa di kolom balasan. Mereka tidak sadar komentar 5 detik itu membuat saya insecure bercermin selama berbulan-bulan.",
    feeling: "Sad",
    date: new Date("2026-09-13T20:04:00Z"),
    status: "approved",
    resonanceCount: 89,
    consentToPublish: true
  },
  {
    id: "story-4",
    category: "Sexual Harassment",
    storyText: "Mendapat DM berisi ajakan eksplisit dan voice note tidak pantas dari orang yang baru kenal di game online. Ketika saya tolak dengan tegas, dia malah mengancam akan menyebarkan ID sosial media saya. Saya langsung block dan amankan bukti tangkapan layar.",
    feeling: "Unsafe",
    date: new Date("2026-09-12T11:45:00Z"),
    status: "approved",
    resonanceCount: 115,
    consentToPublish: true
  },
  {
    id: "story-5",
    category: "Cyberbullying",
    storyText: "Ada akun anonim di menfess kampus yang menggiring opini negatif dan menyindir nama panggilan saya. Kolom komentar penuh dengan spekulasi liar. Yang paling menyakitkan adalah teman-teman satu kelas hanya membaca dan menonton tanpa ada yang berani meluruskan.",
    feeling: "Angry",
    date: new Date("2026-09-11T16:20:00Z"),
    status: "approved",
    resonanceCount: 53,
    consentToPublish: true
  },
  {
    id: "story-6",
    category: "Unwanted Comments",
    storyText: "Saya sering dikirimi pesan DM spam setiap malam dengan sapaan genit dan panggilan sok akrab, padahal kami hanya rekan satu divisi kerja paruh waktu. Saat tidak saya balas, dia menyindir di grup kerja bahwa saya 'sombong'. Sulit membedakan profesionalitas dan pelanggaran batas ketika orang lain menganggapnya sepele.",
    feeling: "Embarrassed",
    date: new Date("2026-09-10T18:10:00Z"),
    status: "approved",
    resonanceCount: 38,
    consentToPublish: true
  },
  {
    id: "story-pending-1",
    category: "Sharing Without Consent",
    storyText: "Foto saya saat tertidur di perpustakaan difoto diam-diam dan diunggah ke story publik oleh teman seangkatan dengan caption mengejek. Saya sudah meminta take down namun tidak digubris dengan alasan 'lucu kok'.",
    feeling: "Embarrassed",
    date: new Date("2026-09-17T08:00:00Z"),
    status: "pending",
    resonanceCount: 0,
    consentToPublish: true
  },
  {
    id: "story-pending-2",
    category: "Unwanted Comments",
    storyText: "Di kolom komentar TikTok saya, banyak komentar bernada merendahkan pilihan busana saya. Mengapa orang merasa berhak mendikte orang lain hanya karena layar ponsel memberi jarak?",
    feeling: "Angry",
    date: new Date("2026-09-17T09:30:00Z"),
    status: "pending",
    resonanceCount: 0,
    consentToPublish: true
  }
];

const INITIAL_ASSESSMENTS = [
  {
    id: "assess-seed-1",
    participantId: "usr-demo-1",
    name: "Alya Zahra",
    institution: "Universitas Gadjah Mada",
    email: "alya.zahra@mail.ugm.ac.id",
    role: "Mahasiswa",
    mode: "pre",
    score: 6,
    total: 10,
    percentage: 60,
    timestamp: new Date("2026-09-18T10:15:00Z")
  },
  {
    id: "assess-seed-2",
    participantId: "usr-demo-1",
    name: "Alya Zahra",
    institution: "Universitas Gadjah Mada",
    email: "alya.zahra@mail.ugm.ac.id",
    role: "Mahasiswa",
    mode: "post",
    score: 10,
    total: 10,
    percentage: 100,
    timestamp: new Date("2026-09-18T11:05:00Z")
  },
  {
    id: "assess-seed-3",
    participantId: "usr-demo-2",
    name: "Fikri Maulana",
    institution: "Institut Teknologi Bandung",
    email: "fikri.m@students.itb.ac.id",
    role: "Mahasiswa",
    mode: "pre",
    score: 5,
    total: 10,
    percentage: 50,
    timestamp: new Date("2026-09-17T14:20:00Z")
  },
  {
    id: "assess-seed-4",
    participantId: "usr-demo-2",
    name: "Fikri Maulana",
    institution: "Institut Teknologi Bandung",
    email: "fikri.m@students.itb.ac.id",
    role: "Mahasiswa",
    mode: "post",
    score: 9,
    total: 10,
    percentage: 90,
    timestamp: new Date("2026-09-17T15:00:00Z")
  },
  {
    id: "assess-seed-5",
    participantId: "usr-demo-3",
    name: "Nadhira Saraswati",
    institution: "SMA Negeri 1 Jakarta",
    email: "nadhira.s@gmail.com",
    role: "Siswa SMA/SMK",
    mode: "pre",
    score: 7,
    total: 10,
    percentage: 70,
    timestamp: new Date("2026-09-16T16:45:00Z")
  }
];

export async function POST() {
  try {
    // Delete current data
    await prisma.story.deleteMany({});
    await prisma.assessment.deleteMany({});

    // Re-seed stories
    for (const story of INITIAL_STORIES) {
      await prisma.story.create({ data: story });
    }

    // Re-seed assessments
    for (const assess of INITIAL_ASSESSMENTS) {
      await prisma.assessment.create({ data: assess });
    }

    const stories = await prisma.story.findMany({ orderBy: { date: 'desc' } });
    const assessments = await prisma.assessment.findMany({ orderBy: { timestamp: 'desc' } });

    return NextResponse.json({
      success: true,
      message: 'Database berhasil di-reset ke seed data default.',
      stories,
      assessments
    });
  } catch (error) {
    console.error('Error resetting database:', error);
    return NextResponse.json(
      { error: 'Gagal mereset database', details: error.message },
      { status: 500 }
    );
  }
}
