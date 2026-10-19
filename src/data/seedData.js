// Seed Data for Consent Over Words Campaign Platform

export const INITIAL_STORIES = [
  {
    id: "story-1",
    category: "Unwanted Comments",
    storyText: "Setiap kali saya posting foto kegiatan organisasi di Instagram, selalu ada akun kenalan satu kampus yang meninggalkan komentar mengarah ke fisik dan 'candaan' menggoda yang bikin saya risih. Saat saya tegur via DM, dia bilang 'santai aja kali, namanya juga muji'. Rasanya batas privasi saya sama sekali tidak dihargai.",
    feeling: "Uncomfortable",
    date: "2026-09-15T14:32:00Z",
    status: "approved",
    resonanceCount: 42,
    consentToPublish: true
  },
  {
    id: "story-2",
    category: "Sharing Without Consent",
    storyText: "Screenshot curhatan pribadi saya di grup kecil disebarkan ke grup angkatan tanpa izin saya sama sekali, hanya untuk dijadikan bahan lelucon. Saya merasa dikhianati dan langsung menarik diri dari semua interaksi online selama berminggu-minggu.",
    feeling: "Confused",
    date: "2026-09-14T09:15:00Z",
    status: "approved",
    resonanceCount: 67,
    consentToPublish: true
  },
  {
    id: "story-3",
    category: "Body Shaming",
    storyText: "Foto wisuda saya dikomentari di Twitter dengan membandingkan proporsi tubuh saya memakai kata-kata 'lucu-lucuan'. Orang-orang ikut tertawa di kolom balasan. Mereka tidak sadar komentar 5 detik itu membuat saya insecure bercermin selama berbulan-bulan.",
    feeling: "Sad",
    date: "2026-09-13T20:04:00Z",
    status: "approved",
    resonanceCount: 89,
    consentToPublish: true
  },
  {
    id: "story-4",
    category: "Sexual Harassment",
    storyText: "Mendapat DM berisi ajakan eksplisit dan voice note tidak pantas dari orang yang baru kenal di game online. Ketika saya tolak dengan tegas, dia malah mengancam akan menyebarkan ID sosial media saya. Saya langsung block dan amankan bukti tangkapan layar.",
    feeling: "Unsafe",
    date: "2026-09-12T11:45:00Z",
    status: "approved",
    resonanceCount: 115,
    consentToPublish: true
  },
  {
    id: "story-5",
    category: "Cyberbullying",
    storyText: "Ada akun anonim di menfess kampus yang menggiring opini negatif dan menyindir nama panggilan saya. Kolom komentar penuh dengan spekulasi liar. Yang paling menyakitkan adalah teman-teman satu kelas hanya membaca dan menonton tanpa ada yang berani meluruskan.",
    feeling: "Angry",
    date: "2026-09-11T16:20:00Z",
    status: "approved",
    resonanceCount: 53,
    consentToPublish: true
  },
  {
    id: "story-6",
    category: "Unwanted Comments",
    storyText: "Saya sering dikirimi pesan DM spam setiap malam dengan sapaan genit dan panggilan sok akrab, padahal kami hanya rekan satu divisi kerja paruh waktu. Saat tidak saya balas, dia menyindir di grup kerja bahwa saya 'sombong'. Sulit membedakan profesionalitas dan pelanggaran batas ketika orang lain menganggapnya sepele.",
    feeling: "Embarrassed",
    date: "2026-09-10T18:10:00Z",
    status: "approved",
    resonanceCount: 38,
    consentToPublish: true
  },
  // Pending stories for Moderation Desk Demo
  {
    id: "story-pending-1",
    category: "Sharing Without Consent",
    storyText: "Foto saya saat tertidur di perpustakaan difoto diam-diam dan diunggah ke story publik oleh teman seangkatan dengan caption mengejek. Saya sudah meminta take down namun tidak digubris dengan alasan 'lucu kok'.",
    feeling: "Embarrassed",
    date: "2026-09-17T08:00:00Z",
    status: "pending",
    resonanceCount: 0,
    consentToPublish: true
  },
  {
    id: "story-pending-2",
    category: "Unwanted Comments",
    storyText: "Di kolom komentar TikTok saya, banyak komentar bernada merendahkan pilihan busana saya. Mengapa orang merasa berhak mendikte orang lain hanya karena layar ponsel memberi jarak?",
    feeling: "Angry",
    date: "2026-09-17T09:30:00Z",
    status: "pending",
    resonanceCount: 0,
    consentToPublish: true
  }
];

export const AWARENESS_QUESTIONS = [
  {
    id: 1,
    scenario: "Seorang teman memotret teman lain yang sedang tertidur di kelas, lalu mengunggahnya ke Instagram Story untuk bahan 'jokes'.",
    question: "Apakah tindakan ini melanggar batas (digital boundary) jika belum ada izin dari yang bersangkutan?",
    options: [
      { label: "Ya, melanggar batas", value: "yes", correct: true },
      { label: "Tidak, kan cuma bercanda", value: "no", correct: false },
      { label: "Ragu-ragu / Tergantung situasi", value: "not_sure", correct: false }
    ],
    explanation: "Benar! Setiap individu berhak atas citra diri dan privasi mereka. Membagikan foto seseorang tanpa persetujuan eksplisit (consent) melanggar batas privasi digital, terlepas dari niat awal yang hanya untuk bercanda."
  },
  {
    id: 2,
    scenario: "Seseorang terus mengirimkan pesan 'P', menyapa larut malam, dan meminta nomor telepon pribadi di DM meskipun sudah tidak dibalas berkali-kali.",
    question: "Apakah mengabaikan sinyal 'tidak merespons' termasuk pelanggaran consent komunikasi?",
    options: [
      { label: "Ya, itu melanggar consent", value: "yes", correct: true },
      { label: "Tidak, kan bebas kirim pesan", value: "no", correct: false },
      { label: "Bukan pelanggaran selama tidak mengancam", value: "not_sure", correct: false }
    ],
    explanation: "Tepat! Sikap diam atau tidak membalas adalah bentuk penolakan non-verbal yang jelas. Terus memaksakan interaksi saat pihak lain tidak bersedia merupakan pelanggaran consent komunikasi di ruang digital."
  },
  {
    id: 3,
    scenario: "Teman satu grup membagikan tangkapan layar (screenshot) obrolan curhat personal Anda ke grup lain yang lebih besar untuk ditertawakan bersama.",
    question: "Apakah screenshot percakapan privat boleh dibagikan secara bebas tanpa izin pengirim?",
    options: [
      { label: "Boleh saja kalau seru", value: "no", correct: false },
      { label: "Tidak boleh, itu ruang privat", value: "yes", correct: true },
      { label: "Boleh asal nama disensor sedikit", value: "not_sure", correct: false }
    ],
    explanation: "Tepat sekali! Percakapan privat memiliki ekspektasi kerahasiaan. Menyebarkan screenshot tanpa izin melanggar kepercayaan (breach of trust) dan dapat menimbulkan dampak psikologis yang serius bagi korban."
  },
  {
    id: 4,
    scenario: "Seseorang mengomentari bentuk tubuh teman di postingan media sosial dengan kata-kata sindiran, lalu menambahkan 'cuma ngingetin doang kok, jangan baper'.",
    question: "Apakah niat 'mengingatkan' atau 'candaan' menghapus dampak negatif dari body shaming?",
    options: [
      { label: "Ya, niat baik harus dimaklumi", value: "no", correct: false },
      { label: "Tidak, dampak lebih utama dari niat", value: "yes", correct: true },
      { label: "Tergantung seberapa dekat pertemanannya", value: "not_sure", correct: false }
    ],
    explanation: "Benar! Prinsip dasar etika komunikasi digital adalah: 'Intent does not equal Impact'. Niat baik atau candaan tidak menghapus rasa sakit dan ketidaknyamanan yang dirasakan penerima."
  },
  {
    id: 5,
    scenario: "Anda melihat teman Anda dirundung (cyberbullying) di kolom komentar akun publik, tetapi Anda memilih diam agar tidak ikut terseret masalah.",
    question: "Apakah sikap diam sebagai saksi (bystander) dapat memperburuk situasi korban di ruang digital?",
    options: [
      { label: "Ya, diam memberi ruang pelaku merasa benar", value: "yes", correct: true },
      { label: "Tidak, diam adalah langkah paling netral", value: "no", correct: false },
      { label: "Tidak yakin", value: "not_sure", correct: false }
    ],
    explanation: "Tepat. Dalam dinamika digital, saksi pasif (silent bystanders) secara tidak sengaja menormalisasi perilaku merundung. Memberikan dukungan privat atau melaporkan konten adalah langkah aman yang sangat berdampak."
  }
];

export const LEARN_MODULES = [
  {
    id: "what-is-consent",
    title: "A. What is Digital Consent?",
    subtitle: "Persetujuan bukan hanya tentang kata 'Iya', melainkan kesepakatan sadar dan sukarela.",
    tag: "Fondasi",
    icon: "ShieldCheck",
    keyPoints: [
      "Freely Given: Diberikan tanpa paksaan, manipulasi, atau intimidasi status.",
      "Reversible: Persetujuan bisa ditarik kapan saja saat seseorang merasa tidak nyaman.",
      "Informed: Mengetahui secara jelas konteks bagaimana data, foto, atau pesan akan digunakan.",
      "Enthusiastic: Keinginan tulus berinteraksi, bukan sekadar pasrah karena tertekan.",
      "Specific: Setuju untuk chat biasa BUKAN berarti setuju untuk percakapan eksplisit."
    ],
    deepDive: "Di ruang digital, batasan sering kali kabur karena kita tidak bertatap muka langsung. Namun, ketiadaan penolakan keras (seperti hanya membaca pesan atau diam) TIDAK sama dengan persetujuan (Consent)."
  },
  {
    id: "digital-boundaries",
    title: "B. Understanding Digital Boundaries",
    subtitle: "Garis tak kasat mata yang melindungi kenyamanan mental dan privasi Anda secara online.",
    tag: "Privasi & Ruang",
    icon: "Compass",
    keyPoints: [
      "Boundaries Waktu: Hak untuk tidak membalas pesan di luar jam yang Anda tentukan.",
      "Boundaries Konten: Menentukan topik apa yang nyaman Anda diskusikan dan apa yang tidak.",
      "Boundaries Akses: Hak membatasi siapa yang boleh melihat profil, status, atau lokasi Anda.",
      "Boundaries Emosional: Menolak menjadi 'tempat sampah emosional' tanpa kesiapan Anda."
    ],
    deepDive: "Menegakkan batas bukan berarti Anda sombong atau antisosial. Itu adalah bentuk pertahanan diri yang sehat dalam menjaga kesehatan mental di tengah arus informasi media sosial."
  },
  {
    id: "unwanted-comments",
    title: "C. Unwanted Comments & Disguised Hate",
    subtitle: "Ketika komentar publik berubah menjadi pelanggaran ruang pribadi seseorang.",
    tag: "Interaksi",
    icon: "MessageSquareOff",
    keyPoints: [
      "Komentar menggoda bernada seksual kepada orang yang tidak dikenal.",
      "Opini agresif yang menyerang kepribadian dan bukan gagasan yang dibahas.",
      "Spam mention atau tagar dengan maksud mempermalukan seseorang di hadapan publik."
    ],
    deepDive: "Ruang publik online tetap memiliki norma etika. 'Ruang publik' bukan izin bagi siapa saja untuk menginjak-injak martabat orang lain."
  },
  {
    id: "body-shaming",
    title: "D. Body Shaming in Digital Spaces",
    subtitle: "Mengomentari fisik dengan dalih 'perhatian', 'kesehatan', atau 'candaan'.",
    tag: "Etika",
    icon: "HeartOff",
    keyPoints: [
      "Menilai kenaikan/penurunan berat badan seseorang di kolom komentar terbuka.",
      "Menggunakan stiker atau meme yang mengejek bentuk wajah atau tubuh orang lain.",
      "Membandingkan penampilan seseorang dengan standar kecantikan yang tidak realistis."
    ],
    deepDive: "Komentar mengenai fisik di internet memiliki jejak digital permanen yang dapat memicu gangguan kecemasan dan dismorfia tubuh pada korban."
  },
  {
    id: "sharing-without-consent",
    title: "E. Sharing Without Consent",
    subtitle: "Penyebaran materi visual, rekaman suara, atau pesan pribadi tanpa izin.",
    tag: "Pelanggaran Berat",
    icon: "Share2",
    keyPoints: [
      "Menyebarkan screenshot percakapan intim atau curhat privat (Doxing & Breach of Trust).",
      "Memotret orang lain di tempat umum secara diam-diam (creepshots).",
      "Non-consensual sharing of intimate images (NCII) yang merupakan tindak pidana."
    ],
    deepDive: "Sekali materi digital diunggah dan disebarkan, kendali atas materi tersebut hilang selamanya. Hormati hak kepemilikan data pribadi orang lain."
  },
  {
    id: "sexual-harassment",
    title: "F. Online Gender-Based Violence (KBGO)",
    subtitle: "Mengenali tanda-tanda pelecehan seksual berbasis elektronik.",
    tag: "Keamanan Hukum",
    icon: "AlertTriangle",
    keyPoints: [
      "Pengiriman foto kelamin/tidak senonoh tanpa diminta (Cyber-flashing).",
      "Pemerasan seksual berbasis ancaman penyebaran data pribadi (Sextortion).",
      "Impersonasi akun media sosial untuk merusak reputasi korban."
    ],
    deepDive: "KBGO diatur dalam UU Tindak Pidana Kekerasan Seksual (UU TPKS No. 12 Tahun 2022). Korban memiliki hak perlindungan hukum dan pendampingan psikologis penuh."
  },
  {
    id: "it-was-just-a-joke",
    title: "G. 'It Was Just a Joke' — Intent vs. Impact",
    subtitle: "Candaan berhenti menjadi lucu ketika ada salah satu pihak yang merasa tersakiti.",
    tag: "Refleksi",
    icon: "SmilePlus",
    keyPoints: [
      "Niat (Intent) adalah apa yang kita maksudkan di kepala kita.",
      "Dampak (Impact) adalah apa yang dirasakan dan dialami oleh orang lain di hati mereka.",
      "Jika orang lain terluka, memvalidasi perasaannya jauh lebih penting daripada membela niat kita."
    ],
    deepDive: "Lelucon yang sehat adalah lelucon yang ditertawakan bersama-sama, bukan menertawakan penderitaan atau ketidaknyamanan satu orang."
  }
];

export const INTERACTIVE_SCENARIO = {
  title: "Simulasi Interaktif: Menghadapi Permintaan Tak Pantas di DM",
  situation: "Anda baru saja berkenalan dengan teman dari organisasi luar kampus. Setelah berdiskusi normal selama dua hari, tiba-tiba di malam hari dia mengirimkan pesan:",
  messagePreview: "'Boleh minta pap lagi santai di kamar gak? Buat kita berdua aja, janji gak disebar kok 😉'",
  options: [
    {
      id: "opt-1",
      choice: "Mengabaikan saja dan pura-pura tidak membaca (Ignore)",
      badge: "Pilihan Pasif",
      feedbackTitle: "Memahami Pilihan Ini",
      feedbackText: "Mengabaikan adalah reaksi alami ketika bingung. Namun, pelaku sering menganggap ini sebagai 'belum terbaca' dan mungkin akan mengulanginya lagi. Jika Anda merasa aman, menetapkan batasan verbal lebih efektif.",
      safetyTip: "💡 Bila Anda merasa cemas, mengabaikan sambil mengambil tangkapan layar (screenshot) bukti adalah langkah awal yang sah demi keamanan mental Anda."
    },
    {
      id: "opt-2",
      choice: "Menegaskan batasan dengan jelas dan sopan (Set a Boundary)",
      badge: "Disarankan (Jika Aman)",
      feedbackTitle: "Langkah Asertif & Berdaya",
      feedbackText: "Sangat baik! Contoh respon: 'Maaf, saya tidak nyaman dengan permintaan foto pribadi seperti itu. Mari fokus pada komunikasi profesional organisasi saja ya.' Ini mendefinisikan batasan Anda tanpa ruang multitafsir.",
      safetyTip: "💡 Jika dia membalas dengan menghina atau menuduh Anda 'baper', itu adalah sinyal jelas untuk segera memblokirnya."
    },
    {
      id: "opt-3",
      choice: "Langsung Screenshot bukti, Block, dan Report akunnya",
      badge: "Tindakan Proteksi Cepat",
      feedbackTitle: "Keputusan Keamanan Mandiri",
      feedbackText: "Langkah yang sangat tepat jika Anda merasa tidak aman, terintimidasi, atau tidak ingin berdebat. Anda sama sekali tidak berutang penjelasan kepada siapapun yang melanggar kenyamanan Anda.",
      safetyTip: "💡 Pastikan selalu mengamankan screenshot yang mencakup username, waktu, dan isi pesan sebelum menekan tombol block."
    },
    {
      id: "opt-4",
      choice: "Bercerita ke teman dekat atau pengurus organisasi untuk mediasi",
      badge: "Mencari Dukungan (Upstander Support)",
      feedbackTitle: "Membangun Ruang Aman Bersama",
      feedbackText: "Luar biasa. Membicarakan ini dengan pihak berwenang di organisasi membantu melindungi orang lain agar tidak menjadi target berikutnya dari orang yang sama.",
      safetyTip: "💡 Anda berhak mendapatkan lingkungan organisasi yang bebas dari intimidasi dan pelecehan digital."
    }
  ]
};

export const ACTION_GUIDE = {
  victim: [
    {
      step: "01",
      title: "Recognize Your Boundary",
      desc: "Validasi perasaan Anda. Jika Anda merasa risih, cemas, malu, atau tertekan, itu adalah sinyal valid bahwa batas privasi Anda sedang dilanggar.",
      icon: "Sparkles"
    },
    {
      step: "02",
      title: "Save the Evidence First",
      desc: "Ambil tangkapan layar (screenshot) lengkap: username akun, tanggal & jam pesan, link profil, dan konteks percakapan sebelum memblokir pelaku.",
      icon: "Camera"
    },
    {
      step: "03",
      title: "Set a Clear Boundary (If Safe)",
      desc: "Jika Anda merasa aman, sampaikan penolakan satu kali secara lugas: 'Saya tidak mengizinkan hal ini. Tolong hapus/hentikan sekarang.'",
      icon: "ShieldAlert"
    },
    {
      step: "04",
      title: "Block & Restrict Interaction",
      desc: "Gunakan fitur Block, Restrict, atau Mute di platform sosial media. Anda tidak wajib meladeni debat atau ancaman pelaku.",
      icon: "UserX"
    },
    {
      step: "05",
      title: "Report to Platform & Authorities",
      desc: "Laporkan konten ke platform (Instagram, X, TikTok, WhatsApp) dan hubungi Satgas PPKS kampus jika melibatkan sesama civitas akademika.",
      icon: "Flag"
    },
    {
      step: "06",
      title: "Talk to Someone You Trust",
      desc: "Ceritakan pada sahabat, keluarga, konselor, atau lembaga pendamping. Mengatasi ini sendirian terasa berat, Anda berhak didengar.",
      icon: "HeartHandshake"
    }
  ],
  bystander: [
    {
      step: "01",
      title: "Don't Participate",
      desc: "Jangan memberikan like, komentar tertawa, repost, atau bahan bakar pada lelucon yang merendahkan martabat orang lain.",
      icon: "Hand"
    },
    {
      step: "02",
      title: "Don't Spread the Content",
      desc: "Hentikan rantai penyebaran. Jangan meneruskan screenshot atau link postingan memalukan ke grup lain meski dengan alasan 'sekadar info'.",
      icon: "XCircle"
    },
    {
      step: "03",
      title: "Don't Blame the Person",
      desc: "Hindari ucapan 'Makanya jangan posting foto gitu'. Fokuslah pada perilaku pelaku yang melanggar batas, bukan menyalahkan korban.",
      icon: "Shield"
    },
    {
      step: "04",
      title: "Offer Direct Support",
      desc: "Kirim pesan privat ke korban: 'Hai, aku melihat komentar tadi. Aku tahu itu tidak pantas. Kamu baik-baik saja? Aku ada di sini jika butuh teman cerita.'",
      icon: "MessageCircleHeart"
    },
    {
      step: "05",
      title: "Help Preserve Evidence",
      desc: "Bantu ambil screenshot postingan atau komentar sebelum dihapus pelaku, dan serahkan ke korban untuk arsip pelaporan bila diperlukan.",
      icon: "FileCheck"
    },
    {
      step: "06",
      title: "Encourage Seeking Help",
      desc: "Temani korban jika mereka ingin melapor ke layanan konseling kampus, Satgas PPKS, atau lembaga bantuan resmi seperti SAPA 129.",
      icon: "Users"
    }
  ],
  boundaryTemplates: [
    {
      title: "Menolak Komentar Fisik / Candaan Keterlaluan",
      template: "“Terima kasih komentarnya, tapi saya merasa tidak nyaman dengan candaan tentang fisik/pribadi seperti ini. Tolong jangan diulang ya.”"
    },
    {
      title: "Menolak Permintaan Foto / Chat Tak Senonoh di DM",
      template: "“Maaf, komunikasi kita di sini cukup untuk urusan pekerjaan/tugas saja. Saya tidak nyaman dengan obrolan personal di luar konteks tersebut.”"
    },
    {
      title: "Menolak Penyebaran Screenshot / Konten Privat",
      template: "“Percakapan tersebut bersifat pribadi. Tolong segera hapus dan jangan sebarkan ke siapapun tanpa persetujuan saya.”"
    }
  ]
};

export const HELP_RESOURCES = [
  {
    name: "SAPA 129 (KemenPPPA)",
    tag: "Layanan Resmi Pemerintah",
    description: "Layanan Sahabat Perempuan dan Anak dari Kementerian Pemberdayaan Perempuan dan Perlindungan Anak untuk pengaduan kekerasan dan KBGO.",
    hotline: "Hotline: 129",
    whatsapp: "WhatsApp: 08111-129-129",
    website: "https://www.kemenpppa.go.id",
    useCase: "Gunakan ketika membutuhkan rujukan penanganan kasus, pendampingan hukum darurat, dan perlindungan korban kekerasan seksual/digital."
  },
  {
    name: "Yayasan Pulih",
    tag: "Konseling & Trauma Recovery",
    description: "Lembaga swadaya masyarakat yang berfokus pada pemulihan psikologis, trauma akibat kekerasan berbasis gender, dan pendampingan mental.",
    hotline: "Telepon: (021) 788-42580",
    whatsapp: "WhatsApp: 0811-8436-633",
    website: "https://yayasanpulih.org",
    useCase: "Gunakan saat Anda merasakan beban psikologis berat, trauma mendalam, atau kecemasan ekstrem pasca insiden pelecehan digital."
  },
  {
    name: "Komnas Perempuan",
    tag: "Lembaga Nasional HAM",
    description: "Komisi Nasional Anti Kekerasan terhadap Perempuan untuk pemantauan kasus dan rujukan bantuan hukum kekerasan berbasis gender siber (KBGO).",
    hotline: "Telepon: (021) 390-3963",
    whatsapp: "Email: pengaduan@komnasperempuan.go.id",
    website: "https://komnasperempuan.go.id",
    useCase: "Gunakan untuk konsultasi pelaporan kekerasan sistemik dan dokumentasi pelanggaran hak asasi perempuan di ruang siber."
  },
  {
    name: "LBH APIK (Asosiasi Perempuan Indonesia untuk Keadilan)",
    tag: "Bantuan Hukum Gratis",
    description: "Lembaga bantuan hukum yang memberikan pendampingan hukum dan konsultasi perkara hukum pidana/ITE bagi korban kekerasan gender.",
    hotline: "Pengaduan: (021) 877-97289",
    whatsapp: "WhatsApp: 0813-8882-2669",
    website: "https://lbhapik.or.id",
    useCase: "Gunakan bila Anda memerlukan kuasa hukum atau ingin melaporkan tindak pidana penyebaran konten intim non-konsensual (UU TPKS/UU ITE)."
  },
  {
    name: "Sejiwa (HIMPSI)",
    tag: "Dukungan Psikologis Cepat",
    description: "Layanan dukungan psikososial dan kesehatan mental yang dikelola oleh Himpunan Psikologi Indonesia bersama Kemenkes RI.",
    hotline: "Hotline: 119 Ext 8",
    whatsapp: "Layanan Nasional Bebas Pulsa",
    website: "https://himpsi.or.id",
    useCase: "Gunakan saat butuh pertolongan pertama pada krisis mental mendesak, depresi, atau kebingungan emosional."
  }
];
