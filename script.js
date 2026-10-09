import { galleryPhotos } from "./gallery-data.js";
import { resolvePhotoSrc, setPhotoSrc } from "./photo-src.js";

/* ============================================================
   365 HARI BERSAMA KAMU ❤️ — script.js

   ┌──────────────────────────────────────────────────────────┐
   │  BAGIAN 1: DATA                                          │
   │  Cukup ganti isi objek `anniversaryData` di bawah ini.   │
   │  Tidak perlu menyentuh kode di bagian 2 ke bawah.        │
   └──────────────────────────────────────────────────────────┘
============================================================ */

const anniversaryData = {
  /* --- Identitas --- */
  myName: "Miftahul Anam", // dipakai di surat & tanda tangan
  shortName: "ANAM", // dipakai di navbar, hero, dan footer
  partnerName: "B U N G A",
  anniversaryDate: "12 Oktober 2025",

  /* --- Password pembuka: tanggal jadian. Terima format 12-10-2025 / 12/10/2025 / 12102025 --- */
  password: "12-10-2025",
  passwordHint: "clue-nya: tanggal jadian kita, pakai format dd-mm-yyyy ya",
  passwordWrong: "Hmm, bukan itu... coba inget-inget lagi ya 💭",
  passwordRight: "Nah, bener! Selamat datang, sayang ❤️",

  /* --- Angka-angka --- */
  daysTogether: 365,
  monthsTogether: 12,

  /* --- Musik latar (opsional). Kosongkan "" kalau tidak pakai musik. --- */
  music: {
    provider: "youtube",
    videoId: "fOqtsiuKVmM", // https://www.youtube.com/watch?v=fOqtsiuKVmM
    volume: 45, // 0–100
    fallback: "", // opsional: "assets/music/anniversary.mp3" jika ingin fallback lokal
  },

  /* --- Hero --- */
  hero: {
    eyebrow: "ANAM × B U N G A · 365 hari",
    title: "ANAM <em>&</em><br>B U N G A", // <em> = aksen italic berwarna
    tagline: "Happy 1st anniversary. 365 hari, dan aku masih memilih kamu.",
    subtext:
      "Terima kasih sayang, sudah menjadi bagian dari satu tahun paling berharga dalam hidupku.",
    photo: {
      src: "assets/photos/photo-01.jpg",
      alt: "Foto kita berdua",
      caption: "kita ❤️",
    },
  },

  /* --- Counter kecil di bawah hero --- */
  counter: [
    { number: "365", label: "hari bersama", note: "dan terus bertambah" },
    { number: "12", label: "bulan", note: "banyak cerita" },
    { number: "∞", label: "kenangan", note: "yang ingin terus bertambah" },
  ],

  /* --- Surat cinta --- */
  letter: {
    greeting: "Sayang,",
    paragraphs: [
      "nggak terasa, perjalanan kita sudah sampai di satu tahun. Dari semua hal baik yang pernah datang dalam hidupku, kamu adalah salah satu yang paling aku syukuri.",
      "Terima kasih karena sudah hadir dengan caramu yang sederhana, tapi selalu berhasil membuat hari-hariku terasa lebih hangat. Bersamamu, hal kecil pun bisa berubah jadi kenangan yang ingin aku simpan lama-lama.",
      "Aku mungkin tidak selalu pandai merangkai kata, tapi satu hal yang selalu aku tahu: aku bahagia punya kamu. Kamu membuat aku percaya bahwa dicintai dengan tulus adalah hal yang sangat indah.",
      "Semoga kita tetap saling menggenggam, saling menguatkan, dan terus memilih satu sama lain. Terima kasih sudah menjadi rumah yang paling aku rindukan.",
    ],
    closing: "Miftahul Anam",
  },

  /* --- Timeline perjalanan --- */
  timeline: [
    {
      icon: "💬",
      date: "Awal mula",
      // &nbsp; dipakai di "CGV BCP" supaya nama tempatnya tidak pernah terbelah dua baris.
      title: "Dari LINE ke CGV&nbsp;BCP",
      description: [
        "Semuanya dimulai dari obrolan ringan di LINE: soal hal-hal receh, cerita sehari-hari, sampai akhirnya kita memutuskan buat ketemu dan jalan bareng.",
        "First date kita pun sesederhana itu: nonton <em>Chainsaw&nbsp;Man – The&nbsp;Movie: Reze&nbsp;Arc</em> di <strong>CGV&nbsp;BCP</strong>. 🎬",
        "Tapi bukannya fokus sama filmnya, kita malah kaget bareng gara-gara satu adegan “sus” yang sampai sekarang masih bikin ketawa. 😂",
        "Lucu ya kalau diingat lagi. Semua ini berawal dari obrolan itu, dan ternyata kita bisa sampai sejauh ini. ❤️",
      ],
      // Ilustrasi mengikuti isi bab: kursi bioskop + popcorn + gelembung chat
      // (cerita bermula dari LINE, lanjut first date nonton di CGV).
      image: "assets/photos/story-01.jpg",
    },
    {
      icon: "💙",
      date: "12 Oktober 2025",
      title: "Hari Jadian di Kaizen",
      featured: true,
      badge: "hari jadian kita", // label di pojok foto (khusus bab unggulan)
      description: [
        "Hari jadian kita, 12 Oktober 2025, di Kaizen. Kita berdua datang pakai baju biru — sampai sekarang aku masih ingat jelas warna birunya. 💙",
        "Tempatnya sederhana, tapi justru di situ status kita resmi jadi kita — obrolan yang nggak mau selesai, ketawa yang susah berhenti, dan satu kalimat yang sampai sekarang masih sering kita ucapkan:",
      ],
      highlight: "“Oke Gas Oke Gass.” 😂",
      highlightAfter: 1, // kutipan tepat setelah kalimat yang mengantarkannya (paragraf terakhir)
      // Ilustrasi mengikuti isi bab: keduanya pakai baju biru di meja kafe
      // sederhana, sesuai cerita hari jadian di Kaizen.
      image: "assets/photos/story-02.jpg",
    },
    {
      icon: "😂",
      date: "Kebiasaan kita",
      title: "Hal-hal Random tentang Kita",
      // Angka di sini sengaja mengikuti bagian Fun Facts & Quiz di halaman ini
      // (17 film, 1000+ kali bilang kangen) supaya ceritanya tetap konsisten.
      description: [
        "Yang paling sering aku ingat justru hal-hal kecilnya: 17 film yang kita tonton sampai habis, makan bareng tanpa rencana, dan “kangen” yang sudah kita ucapkan ribuan kali. 😂",
        "Termasuk pertanyaan “kamu sayang aku nggak?” yang nggak pernah berhenti — padahal jawabannya selalu sama. ❤️",
      ],
      // Ilustrasi mengikuti isi bab: movie night di rumah + makan bareng +
      // pesan "kangen" di HP, mewakili hal-hal random kita.
      image: "assets/photos/story-03.jpg",
    },
    {
      icon: "💝",
      date: "Momen sederhana",
      title: "Momen Favorit Kita",
      description: [
        "Ada momen yang nggak butuh apa-apa: cuma duduk berdua, ngobrol pelan, dan nggak ada yang buru-buru pulang.",
        "Dari semua yang pernah kita lakukan, justru momen seperti ini yang paling aku simpan — sederhana, tenang, dan ada kamu di dalamnya. ❤️",
      ],
      // Ilustrasi baru dengan gaya yang konsisten dengan bab Our Story lainnya.
      // Foto asli photo-06 tetap dipakai di album foto dan carousel momen.
      image: "assets/photos/story-04.jpg",
    },
    {
      icon: "🎉",
      date: "Hari ini",
      title: "1st Anniversary",
      description: [
        "Nggak kerasa, satu tahun sudah kita lewati. Terima kasih sudah jadi bagian dari tahun paling berwarna dalam hidupku. ❤️",
        "Dan kalau boleh minta satu hal: aku mau terus menambah bab di cerita ini, sama kamu. 🌷",
      ],
      // Ilustrasi mengikuti isi bab: kue kecil dengan lilin angka satu,
      // confetti, dan tulip untuk perayaan 1st anniversary.
      image: "assets/photos/story-05.jpg",
    },
  ],

  /* --- Galeri foto (scrapbook). Tambah/kurangi sesuka hati. --- */
  photos: galleryPhotos,

  /* --- 10 alasan --- */
  reasonsTitle: "10 alasan kenapa aku sayang kamu",
  reasons: [
    "Karena senyummu selalu bisa memperbaiki hariku.",
    "Karena cara kamu perhatian sama hal-hal kecil yang bahkan aku sendiri nggak sadar.",
    "Karena sama kamu, aku bisa jadi diri sendiri tanpa harus pura-pura.",
    "Karena cara kamu bercanda yang kadang garing, tapi tetap bikin aku ketawa.",
    "Karena kamu selalu ada. Bukan cuma di hari baik, tapi juga di hari yang berat.",
    "Karena hal-hal kecil yang kamu lakukan tanpa diminta.",
    "Karena cara kamu melihat aku, seolah aku orang paling berharga di dunia.",
    "Karena kamu sabar menghadapi aku, bahkan saat aku sendiri nggak sabar sama diriku.",
    "Karena kamu membuat hari biasa terasa spesial.",
    "Karena kamu adalah kamu. Dan itu sudah lebih dari cukup.",
  ],

  /* --- Fun facts --- */
  facts: [
    { icon: "📅", number: "365", label: "hari bersama" },
    { icon: "📸", number: "100+", label: "foto bersama" },
    { icon: "😂", number: "∞", label: "jumlah tawa" },
    { icon: "🤔", number: "???", label: 'jumlah "kamu sayang aku nggak?"' },
    { icon: "🍜", number: "∞", label: "makan bareng" },
    { icon: "🎬", number: "17", label: "film yang kita tonton" },
    { icon: "🎞️", number: "Agak Laen", label: "film favorit: Menyala Pantiku!" },
    { icon: "💬", number: "1000+", label: 'kali bilang "kangen"' },
  ],

  /* --- Mini quiz. `answer` = index jawaban benar (dimulai dari 0). --- */
  quiz: [
    {
      question: "Siapa yang selalu membuat hari biasa terasa lebih spesial?",
      options: ["B U N G A", "ANAM", "Kita berdua"],
      answer: 2,
    },
    {
      question: "Film favorit kita adalah...",
      options: ["Jumbo", "Agak Laen: Menyala Pantiku!", "KKN di Desa Penari"],
      answer: 1,
    },
    {
      question: "Berapa film yang sudah kita tonton bersama?",
      options: ["12 film", "17 film", "25 film"],
      answer: 1,
    },
    {
      question: "Apa yang paling ingin terus kita lakukan dalam hubungan ini?",
      options: ["Saling memilih setiap hari", "Berhenti membuat kenangan", "Saling cuek"],
      answer: 0,
    },
    {
      question: "Kapan tanggal jadian kita?",
      options: ["12 Oktober 2024", "12 Oktober 2025", "12 November 2025"],
      answer: 1,
    },
  ],
  quizMessages: {
    perfect: "Kayaknya kamu memang orang yang tepat. ❤️",
    good: "Hampir sempurna! Tapi tenang, aku tetap sayang kamu.",
    low: "Hmm... kayaknya kita perlu lebih banyak quality time. 😌",
  },

  /* --- Carousel momen favorit (bisa di-flip: depan foto, belakang cerita) ---
     Cara isi tiap momen:
       src     = foto
       date    = bebas: tanggal aslinya ("12 Oktober 2025") atau label pendek
       mood    = emoji kecil di pojok foto (boleh dihapus)
       title   = judul momen (huruf besar)
       caption = satu kalimat di bawah judul
       story   = cerita di balik foto (muncul setelah kartu di-tap)
       detail  = detail kecil yang paling diingat (baris paling bawah di belakang kartu)
     Jumlah momen bebas — nomor, titik navigasi, dan hitungan "01 / 06" ikut menyesuaikan. */
  moments: [
    {
      src: "assets/photos/photo-02.jpg",
      date: "Foto pertama kita",
      mood: "📸",
      title: "Foto pertama kita",
      caption: "Gaya masih kaku, senyum masih ditahan.",
      story:
        "Kita berdiri agak jauh, nggak tahu harus gimana, dan hasilnya... ya gitu deh. Tapi justru karena itu, foto ini selalu jadi favoritku.",
      detail: "Kamu nggak berhenti bilang “hapus aja, jelek” — sampai sekarang nggak pernah aku hapus.",
    },
    {
      src: "assets/photos/photo-03.jpg",
      date: "Awal mula",
      mood: "🌱",
      title: "Awal dari semuanya",
      caption: "Waktu kita belum tahu ini akan ke mana.",
      story:
        "Obrolan receh, balasan yang ditunggu-tunggu, dan keberanian kecil buat ketemu. Nggak ada yang pernah bilang semua ini bakal sejauh sekarang.",
      detail: "Aku pulang dengan satu perasaan: “kayaknya aku mau ketemu dia lagi.”",
    },
    {
      src: "assets/photos/photo-05.jpg",
      date: "Sore tanpa rencana",
      mood: "🌿",
      title: "Piknik dadakan",
      caption: "Hari itu kita piknik tanpa rencana.",
      story:
        "Nggak ada itinerary, nggak ada reservasi. Kita bawa yang ada, duduk di tempat yang kebetulan kosong, dan sisanya kita jalani apa adanya.",
      detail: "Kamu bilang “ini udah enak banget” — padahal yang kita punya cuma tikar dan camilan seadanya.",
    },
    {
      src: "assets/photos/photo-06.jpg",
      date: "Kafe kecil itu",
      mood: "🍟",
      title: "Satu porsi, berdua",
      caption: "Saling berbagi kentang goreng di kafe.",
      story:
        "Satu porsi kentang, dua gelas, dan obrolan yang nggak ada habisnya. Kita duduk lama sampai pelayannya mulai beres-beres meja.",
      detail: "Kamu selalu ngasih potongan yang paling garing ke aku.",
    },
    {
      src: "assets/photos/photo-07.jpg",
      date: "Jalan sore",
      mood: "🌇",
      title: "Muter-muter nggak jelas",
      caption: "Muter-muter nggak jelas, tapi seru.",
      story:
        "Nggak ada tujuan yang jelas. Kita jalan, belok, jalan lagi — yang penting bareng, dan nggak ada yang buru-buru pulang.",
      detail: "Kamu yang pegang arah, tapi tiap sepuluh menit tetap nanya “kita mau ke mana?” 😂",
    },
    {
      src: "assets/photos/photo-08.jpg",
      date: "Malam yang tenang",
      mood: "🌙",
      title: "Malam yang nggak mau selesai",
      caption: "Malam yang tenang, cuma kita berdua.",
      story:
        "Nggak ada yang harus dibicarakan, tapi juga nggak ada yang mau duluan bilang “udah, pulang yuk”.",
      detail: "Diamnya nggak pernah terasa canggung.",
    },
  ],

  /* --- Surprise --- */
  surprise: {
    steps: [
      { note: "", button: "Jangan dibuka" },
      { note: "Katanya jangan dibuka...", button: "Beneran mau buka?" },
      { note: "Yaudah kalau kamu maksa...", button: "Oke, buka deh" },
    ],
    title: "Happy 1st Anniversary, Sayang.",
    messages: [
      "Semoga ini bukan menjadi satu-satunya tahun yang kita rayakan.",
      "Masih banyak cerita yang ingin aku tulis bersama kamu.",
      "Terima kasih sudah jadi rumah untukku selama 365 hari ini.",
    ],
  },

  /* --- Pesan terakhir --- */
  finalMessage: {
    photo: { src: "assets/photos/photo-04.jpg", alt: "[FOTO FAVORIT]" },
    lines: [
      "365 hari sudah kita lewati.",
      "Dan kalau aku diberi kesempatan untuk mengulang semuanya...",
    ],
    highlight: "aku tetap akan memilih kamu. ❤️",
    closing: "Happy 1st Anniversary.",
  },

  /* --- Easter eggs --- */
  easterEggs: {
    tripleTap: "Eh kok diklik terus? 😂",
    hidden: "👀 Kamu nemu rahasia.",
    name: "I love you ❤️",
  },
};

/* ============================================================
   BAGIAN 2: LOGIKA WEBSITE
   (tidak perlu diubah kecuali ingin mengganti perilaku)
============================================================ */

const D = anniversaryData;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Util: elemen foto dengan fallback ---------- */
function fillPhoto(container, src, alt, lazy = true) {
  container.innerHTML = "";
  container.classList.remove("photo--missing");
  const img = document.createElement("img");
  img.alt = alt || "";
  if (lazy) img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => container.classList.add("photo--missing"), { once: true });
  img.src = resolvePhotoSrc(src);
  container.appendChild(img);
  return img;
}

function createPhoto(src, alt, variant = "photo--wide", lazy = true) {
  const box = document.createElement("div");
  box.className = `photo ${variant}`;
  fillPhoto(box, src, alt, lazy);
  return box;
}

/* ---------- Util: toast ---------- */
let toastTimer;
function showToast(message, duration = 2200) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), duration);
}

/* ---------- Util: confetti ringan (satu canvas + requestAnimationFrame) ----------
   Versi sebelumnya membuat 50-70 elemen DOM yang masing-masing dianimasikan.
   Saat PIN benar, itu memakan hampir separuh waktu browser dan membuat halaman
   tersendat. Sekarang semua potongan digambar di satu canvas. Canvas memakai
   1 piksel per px CSS (cukup untuk potongan kecil) agar upload per frame ringan. */
const CONFETTI_COLORS = ["#e8717e", "#c44f62", "#e2ac4c", "#fff8f4", "#e7dff3"];
const confettiFx = { canvas: null, ctx: null, parts: [], raf: 0, width: 0, height: 0, hearts: {} };

function confettiHeartSprite(color) {
  // Glyph hati dirender sekali per warna, lalu ditempel dengan drawImage.
  if (!confettiFx.hearts[color]) {
    const sprite = document.createElement("canvas");
    sprite.width = 24;
    sprite.height = 24;
    const sctx = sprite.getContext("2d");
    sctx.fillStyle = color;
    sctx.font = '17px "Plus Jakarta Sans", system-ui, sans-serif';
    sctx.textAlign = "center";
    sctx.textBaseline = "middle";
    sctx.fillText("❤", 12, 12);
    confettiFx.hearts[color] = sprite;
  }
  return confettiFx.hearts[color];
}

function setupConfettiCanvas() {
  if (confettiFx.canvas) return;
  const canvas = document.createElement("canvas");
  canvas.className = "confetti__canvas";
  canvas.hidden = true;
  $("#confetti").appendChild(canvas);
  confettiFx.canvas = canvas;
  confettiFx.ctx = canvas.getContext("2d");

  const resize = () => {
    confettiFx.width = window.innerWidth;
    confettiFx.height = window.innerHeight;
    canvas.width = confettiFx.width;
    canvas.height = confettiFx.height;
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });
}

function drawConfetti(now) {
  const { canvas, ctx, width, height } = confettiFx;
  ctx.clearRect(0, 0, width, height);
  ctx.globalAlpha = 0.95;

  confettiFx.parts = confettiFx.parts.filter((p) => {
    const t = (now - p.start - p.delay) / p.dur;
    if (t >= 1) return false; // sudah lewat bagian bawah layar
    if (t < 0) return true; // belum giliran (delay)
    const eased = t * t; // ease-in, mirip animasi CSS sebelumnya
    ctx.save();
    ctx.translate(p.x, height * (-0.03 + 1.05 * eased));
    ctx.rotate(p.spin * eased);
    if (p.heart) {
      ctx.drawImage(confettiHeartSprite(p.color), -12, -12);
    } else {
      ctx.fillStyle = p.color;
      ctx.fillRect(-4.4, -4.4, 8.8, 8.8);
    }
    ctx.restore();
    return true;
  });

  if (confettiFx.parts.length) {
    confettiFx.raf = requestAnimationFrame(drawConfetti);
  } else {
    confettiFx.raf = 0;
    ctx.clearRect(0, 0, width, height);
    canvas.hidden = true;
  }
}

function burstConfetti(count = 40) {
  if (reducedMotion) return;
  setupConfettiCanvas();
  const now = performance.now();
  for (let i = 0; i < count; i++) {
    confettiFx.parts.push({
      heart: Math.random() < 0.3,
      x: Math.random() * confettiFx.width,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      start: now,
      delay: Math.random() * 500,
      dur: 2400 + Math.random() * 1800,
      spin: (360 + Math.random() * 540) * (Math.PI / 180),
    });
  }
  if (!confettiFx.raf) {
    confettiFx.canvas.hidden = false;
    confettiFx.raf = requestAnimationFrame(drawConfetti);
  }
}

/* ---------- Util: hati melayang di dalam sebuah section ---------- */
function floatHearts(container, count = 10) {
  if (reducedMotion) return;
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "float-heart";
    h.textContent = ["❤️", "🤍", "💕"][i % 3];
    h.style.left = `${5 + Math.random() * 90}%`;
    h.style.animationDelay = `${Math.random() * 2}s`;
    h.style.fontSize = `${0.9 + Math.random() * 0.9}rem`;
    container.appendChild(h);
    setTimeout(() => h.remove(), 8500);
  }
}

/* ---------- Util: scroll reveal ---------- */
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window) || reducedMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ============================================================
   PASSWORD GATE — kunci pembuka berupa tanggal jadian
============================================================ */
function initGate() {
  const gate = $("#gate");
  const form = $("#gate-form");
  const input = $("#gate-input");
  const note = $("#gate-note");
  const clueBtn = $("#gate-clue");
  if (!gate) return;

  document.body.classList.add("is-locked");

  // Di perangkat sentuh, input hanya menjadi layar PIN; keypad di halaman yang dipakai.
  // `readonly` juga menutup fallback keyboard pada browser yang mengabaikan inputmode="none".
  const hasTouchKeypad = window.matchMedia("(pointer: coarse)").matches
    || navigator.maxTouchPoints > 0;
  if (hasTouchKeypad) input.readOnly = true;
  if (!input.readOnly) setTimeout(() => input.focus({ preventScroll: true }), 500);

  // Angka yang diharapkan, contoh "12-10-2025" -> "12102025"
  const digitsOf = (value) => String(value).replace(/\D/g, "");
  const expected = digitsOf(D.password);

  // Ketikan otomatis jadi dd-mm-yyyy
  input.addEventListener("input", () => {
    const digits = digitsOf(input.value).slice(0, 8);
    let formatted = digits;
    if (digits.length > 4) formatted = `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
    else if (digits.length > 2) formatted = `${digits.slice(0, 2)}-${digits.slice(2)}`;
    input.value = formatted;
    if (note.textContent) note.textContent = "";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const ok = digitsOf(input.value) === expected && digitsOf(input.value).length > 0;

    if (!ok) {
      note.textContent = D.passwordWrong;
      gate.classList.remove("is-shaking");
      void gate.offsetWidth; // restart animasi
      gate.classList.add("is-shaking");
      if (!input.readOnly) input.select();
      return;
    }

    note.textContent = D.passwordRight;
    burstConfetti(55);
    tryPlayMusic(true);
    const opening = $("#opening");
    try {
      sessionStorage.setItem("anniversary-unlocked", "yes");
    } catch {
      // The main page remains usable even if session storage is unavailable.
    }

    setTimeout(() => {
      gate.classList.add("is-leaving");
      setTimeout(() => {
        gate.remove();
        // Start the envelope reveal only after the PIN is accepted.
        opening?.classList.add("is-ready");
      }, 750);
    }, 750);
  });

  clueBtn.addEventListener("click", () => {
    note.textContent = D.passwordHint;
    if (!input.readOnly) input.focus({ preventScroll: true });
  });
}

/* ============================================================
   KEYPAD PIN — tombol angka seperti PIN di HP
============================================================ */
function initKeypad() {
  const keypad = $("#keypad");
  const input = $("#gate-input");
  const form = $("#gate-form");
  if (!keypad || !input) return;

  const digitsOf = (value) => String(value).replace(/\D/g, "");
  const sync = () => input.dispatchEvent(new Event("input", { bubbles: true }));

  keypad.addEventListener("click", (event) => {
    const key = event.target.closest("[data-key]");
    if (!key) return;

    const value = key.dataset.key;
    const digits = digitsOf(input.value);

    if (/^\d$/.test(value)) {
      if (digits.length >= 8) return;
      input.value = digits + value;
    } else if (value === "clear") {
      input.value = "";
    } else if (value === "back") {
      input.value = digits.slice(0, -1);
    } else if (value === "enter") {
      if (typeof form.requestSubmit === "function") form.requestSubmit();
      else form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      return;
    }

    sync();
    if (!input.readOnly) input.focus({ preventScroll: true });
  });
}

/* ============================================================
   OPENING
============================================================ */
function initOpening() {
  const opening = $("#opening");
  const site = $("#site");
  const btn = $("#open-gift");
  document.body.classList.add("is-locked");

  btn.addEventListener("click", () => {
    burstConfetti(50);
    opening.classList.add("is-leaving");
    site.classList.add("is-open");
    site.setAttribute("aria-hidden", "false");
    document.body.classList.remove("is-locked");

    // Musik hanya dimulai setelah interaksi user (aman untuk browser HP).
    tryPlayMusic(true);

    setTimeout(() => opening.remove(), 900);
    // Pastikan reveal di viewport awal terpicu
    setTimeout(initReveal, 150);
  }, { once: true });
}

/* ============================================================
   NAVBAR
============================================================ */
function initNav() {
  const nav = $("#nav");
  const toggle = $("#nav-toggle");
  const menu = $("#mobile-menu");
  $("#nav-brand-text").textContent = `${D.daysTogether} hari`;

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    menu.hidden = true;
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka menu");
  };
  const openMenu = () => {
    menu.hidden = false;
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Tutup menu");
  };

  toggle.addEventListener("click", () => (menu.hidden ? openMenu() : closeMenu()));
  $$("a", menu).forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !nav.contains(e.target)) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) closeMenu();
  });

  // Highlight link aktif (desktop)
  const links = $$(".nav__links a");
  const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) =>
            a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`)
          );
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
  }
}

/* ============================================================
   HERO
============================================================ */
function renderHero() {
  $("#hero-eyebrow").textContent = D.hero.eyebrow;
  // Judul boleh memakai <em>...</em> untuk aksen italic berwarna
  $("#hero-title").innerHTML = D.hero.title;
  $("#hero-tagline").textContent = D.hero.tagline;
  $("#hero-sub").textContent = D.hero.subtext;
  $("#hero-photo-caption").textContent = D.hero.photo.caption;
  fillPhoto($("#hero-photo"), D.hero.photo.src, D.hero.photo.alt, false);

  // Stagger animasi teks hero
  $$(".hero__text .reveal").forEach((el, i) => el.style.setProperty("--delay", `${120 * i}ms`));
}

/* ============================================================
   COUNTER + easter egg (tap "365" 3x)
============================================================ */
function renderCounter() {
  const grid = $("#counter-grid");
  grid.innerHTML = "";
  D.counter.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "stat reveal";
    card.style.setProperty("--delay", `${i * 100}ms`);
    card.innerHTML = `
      <button class="stat__num" type="button" aria-label="${item.number} ${item.label}">${item.number}</button>
      <p class="stat__label">${item.label}</p>
      <p class="stat__note">${item.note}</p>`;
    grid.appendChild(card);
  });

  // Easter egg: angka pertama ditekan 3 kali
  const first = $(".stat__num", grid);
  let taps = 0;
  let timer;
  first.addEventListener("click", () => {
    taps++;
    clearTimeout(timer);
    timer = setTimeout(() => (taps = 0), 1500);
    if (taps === 3) {
      taps = 0;
      showToast(D.easterEggs.tripleTap);
      burstConfetti(14);
    }
  });
}

/* ============================================================
   LOVE LETTER (typing effect)
============================================================ */
function initLetter() {
  $("#letter-greeting").textContent = D.letter.greeting;
  const body = $("#letter-body");
  const closing = $("#letter-closing");
  const skip = $("#letter-skip");
  closing.textContent = D.letter.closing;

  let done = false;
  let started = false;
  let cancelled = false;

  const finish = () => {
    if (done) return;
    done = true;
    cancelled = true;
    body.innerHTML = D.letter.paragraphs.map((p) => `<p>${p}</p>`).join("");
    closing.classList.add("is-visible");
    skip.hidden = true;
  };

  const type = async () => {
    started = true;
    for (const text of D.letter.paragraphs) {
      if (cancelled) return;
      const p = document.createElement("p");
      p.classList.add("typing-cursor");
      body.appendChild(p);
      for (let i = 0; i < text.length; i++) {
        if (cancelled) return;
        p.textContent = text.slice(0, i + 1);
        // Jeda sedikit lebih lama setelah tanda baca, agar terasa natural
        const ch = text[i];
        const delay = ",.!?".includes(ch) ? 120 : 14;
        await new Promise((r) => setTimeout(r, delay));
      }
      p.classList.remove("typing-cursor");
    }
    finish();
  };

  skip.addEventListener("click", finish);
  body.addEventListener("click", () => started && finish());

  if (reducedMotion || !("IntersectionObserver" in window)) {
    finish();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting) && !started) {
        io.disconnect();
        type();
      }
    },
    { threshold: 0.3 }
  );
  io.observe($("#letter-paper"));
}

/* ============================================================
   TIMELINE — bagian "Our Story"

   Satu item = satu bab perjalanan:
   nomor bab menempel di rel (kiri), lalu kartu berisi foto + ceritanya.
============================================================ */
function renderTimeline() {
  const list = $("#timeline");
  list.innerHTML = "";
  D.timeline.forEach((item, i) => {
    const num = String(i + 1).padStart(2, "0");
    const descriptionParagraphs = Array.isArray(item.description)
      ? item.description
      : [item.description || ""];

    const li = document.createElement("li");
    li.className = `tl-item reveal${item.featured ? " tl-item--featured" : ""}`;
    li.style.setProperty("--delay", `${(i % 2) * 90}ms`);

    // Nomor bab di rel. Murni dekoratif — urutannya sudah dibawa oleh <ol>.
    const step = document.createElement("span");
    step.className = "tl-item__step";
    step.setAttribute("aria-hidden", "true");
    step.textContent = num;

    const card = document.createElement("article");
    card.className = `tl-card${item.featured ? " tl-card--featured" : ""}`;

    if (item.image) {
      const media = document.createElement("figure");
      media.className = "tl-card__media";
      media.appendChild(createPhoto(item.image, item.title, ""));
      if (item.featured) {
        const flag = document.createElement("span");
        flag.className = "tl-card__flag";
        flag.textContent = item.badge || "momen favorit";
        media.appendChild(flag);
      }
      card.appendChild(media);
    }

    // Kutipan biasanya menutup paragraf pertama, tapi bisa diatur lewat
    // `highlightAfter` supaya jatuh tepat di momen yang dituju.
    const highlightAfter = Math.min(
      Math.max(Number.isInteger(item.highlightAfter) ? item.highlightAfter : 0, 0),
      descriptionParagraphs.length - 1
    );

    const bodyEl = document.createElement("div");
    bodyEl.className = "tl-card__body";
    bodyEl.innerHTML = `
      <p class="tl-card__meta">
        ${item.icon ? `<span class="tl-card__icon" aria-hidden="true">${item.icon}</span>` : ""}
        <span class="tl-card__date">${item.date || ""}</span>
      </p>
      <h3 class="tl-card__title">${item.title}</h3>
      <div class="tl-card__text">${descriptionParagraphs
        .map((paragraph, index) => {
          const highlight = item.highlight && index === highlightAfter
            ? `<p class="tl-card__highlight"><span aria-hidden="true">✦</span> ${item.highlight}</p>`
            : "";
          return `<p>${paragraph}</p>${highlight}`;
        })
        .join("")}</div>`;
    card.appendChild(bodyEl);

    li.append(step, card);
    list.appendChild(li);
  });
}

/* ============================================================
   GALLERY + LIGHTBOX
============================================================ */
function renderGallery() {
  const wrap = $("#scrapbook");
  wrap.innerHTML = "";
  const previewPhotos = D.photos.slice(0, 4);
  $("#gallery-photo-total").textContent = `${D.photos.length} foto`;
  renderGalleryPreview();

  previewPhotos.forEach((photo, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "scrap";
    btn.setAttribute("aria-label", `Buka foto: ${photo.caption}`);
    btn.appendChild(createPhoto(photo.src, photo.caption, ""));
    const cap = document.createElement("span");
    cap.className = "scrap__caption";
    cap.textContent = photo.caption;
    btn.appendChild(cap);
    btn.addEventListener("click", () => openLightbox(i));
    wrap.appendChild(btn);
  });

  renderFullAlbum();
}

/* Thumbnail kecil di tombol "Lihat semua foto", diambil dari daftar foto yang sama. */
function renderGalleryPreview() {
  const preview = $("#gallery-cta-preview");
  if (!preview) return;

  preview.replaceChildren();
  [0, 3, 5]
    .map((index) => D.photos[index])
    .filter(Boolean)
    .slice(0, 3)
    .forEach((photo) => {
      const img = document.createElement("img");
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = resolvePhotoSrc(photo.src);
      preview.appendChild(img);
    });

  const more = document.createElement("span");
  more.textContent = "+";
  preview.appendChild(more);
}

function renderFullAlbum() {
  const grid = $("#album-grid");
  if (!grid) return;
  grid.replaceChildren();
  $("#album-count").textContent = `${D.photos.length} foto tersimpan`;

  D.photos.forEach((photo, i) => {
    const figure = document.createElement("figure");
    figure.className = "album-photo";
    figure.style.setProperty("--album-delay", `${Math.min(i * 45, 360)}ms`);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "album-photo__open";
    button.setAttribute("aria-label", `Buka foto ${i + 1}: ${photo.caption}`);
    button.appendChild(createPhoto(photo.src, photo.caption, "", true));
    button.addEventListener("click", () => openLightbox(i));

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;

    const number = document.createElement("span");
    number.className = "album-photo__index";
    number.textContent = String(i + 1).padStart(2, "0");

    figure.append(button, caption, number);
    grid.appendChild(figure);
  });
}

function initAlbumNavigation() {
  const site = $("#site");
  const view = $("#album-view");
  const cta = $("#gallery-cta");
  const back = $("#album-back");
  if (!site || !view || !cta || !back) return;

  let returnScrollY = 0;

  const showAlbum = (pushHistory = false) => {
    if (!view.hidden) return;
    returnScrollY = window.scrollY;
    view.hidden = false;
    site.classList.add("is-gallery-view");
    document.title = `Album Kita · ${D.shortName} × ${D.partnerName}`;
    window.scrollTo({ top: 0, behavior: "auto" });

    if (pushHistory) {
      history.pushState({ anniversaryGallery: true }, "", `${location.pathname}${location.search}#all-photos`);
    }
  };

  const hideAlbum = () => {
    if (view.hidden) return;
    view.hidden = true;
    site.classList.remove("is-gallery-view");
    document.title = `${D.daysTogether} Hari Bersama Kamu ❤️`;
    window.scrollTo({ top: returnScrollY, behavior: "auto" });
    cta.focus({ preventScroll: true });
  };

  cta.addEventListener("click", () => showAlbum(true));
  back.addEventListener("click", () => {
    if (location.hash === "#all-photos") {
      history.back();
      // Fallback for preview shells that do not dispatch popstate consistently.
      setTimeout(hideAlbum, 300);
    } else {
      hideAlbum();
    }
  });

  window.addEventListener("popstate", () => {
    if (location.hash === "#all-photos") showAlbum(false);
    else hideAlbum();
  });
}

const lightbox = {
  index: 0,
  el: null,
  lastFocus: null,
};

function openLightbox(index) {
  lightbox.el = $("#lightbox");
  lightbox.lastFocus = document.activeElement;
  lightbox.index = index;
  updateLightbox();
  lightbox.el.hidden = false;
  document.body.classList.add("is-locked");
  $("#lightbox-close").focus();
}

function closeLightbox() {
  lightbox.el.hidden = true;
  document.body.classList.remove("is-locked");
  if (lightbox.lastFocus) lightbox.lastFocus.focus();
}

function stepLightbox(dir) {
  const n = D.photos.length;
  lightbox.index = (lightbox.index + dir + n) % n;
  updateLightbox();
}

function updateLightbox() {
  const photo = D.photos[lightbox.index];
  const img = $("#lightbox-img");
  img.style.opacity = "0";
  img.onload = () => (img.style.opacity = "1");
  img.onerror = () => (img.style.opacity = "1");
  setPhotoSrc(img, photo.src);
  img.alt = photo.caption;
  $("#lightbox-caption").textContent = photo.caption;
  $("#lightbox-count").textContent = `${lightbox.index + 1} / ${D.photos.length}`;
}

function initLightbox() {
  const el = $("#lightbox");
  $("#lightbox-close").addEventListener("click", closeLightbox);
  $("#lightbox-prev").addEventListener("click", () => stepLightbox(-1));
  $("#lightbox-next").addEventListener("click", () => stepLightbox(1));
  el.addEventListener("click", (e) => {
    if (e.target === el || e.target.id === "lightbox-stage") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (el.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  // Swipe kiri/kanan
  let startX = 0;
  let startY = 0;
  el.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  el.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) stepLightbox(dx < 0 ? 1 : -1);
  }, { passive: true });
}

/* ============================================================
   REASONS (flip cards)
============================================================ */
function renderReasons() {
  $("#reasons-title").textContent = D.reasonsTitle;
  const grid = $("#reasons-grid");
  const progress = $("#reasons-progress");
  grid.innerHTML = "";
  let opened = 0;

  const updateProgress = () => {
    const total = D.reasons.length;
    if (opened === 0) progress.textContent = "";
    else if (opened < total) progress.textContent = `${opened} dari ${total} sudah kamu buka ❤️`;
    else progress.textContent = "Semua sudah kamu buka. Dan masih banyak lagi yang nggak muat di sini. ❤️";
  };

  D.reasons.forEach((reason, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "flip reveal";
    card.style.setProperty("--delay", `${(i % 4) * 70}ms`);
    card.setAttribute("aria-label", `Alasan ke-${i + 1}, tap untuk membuka`);
    card.setAttribute("aria-expanded", "false");
    card.innerHTML = `
      <div class="flip__inner">
        <div class="flip__face flip__front">
          <span class="flip__front-icon" aria-hidden="true">💌</span>
          <span class="flip__front-label">Buka aku</span>
          <span class="flip__front-num">#${String(i + 1).padStart(2, "0")}</span>
        </div>
        <div class="flip__face flip__back">${reason}</div>
      </div>`;
    card.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", String(isOpen));
      if (isOpen && !card.dataset.counted) {
        card.dataset.counted = "1";
        opened++;
        updateProgress();
        if (opened === D.reasons.length) burstConfetti(30);
      }
    });
    grid.appendChild(card);
  });
  updateProgress();
}

/* ============================================================
   FUN FACTS
============================================================ */
function renderFacts() {
  const grid = $("#facts-grid");
  grid.innerHTML = "";
  D.facts.forEach((f, i) => {
    const el = document.createElement("div");
    el.className = "fact reveal";
    el.style.setProperty("--delay", `${(i % 4) * 70}ms`);
    // Angka yang berupa teks panjang (mis. judul film) dipakai ukuran lebih kecil
    const isLongText = String(f.number).length > 4;
    el.innerHTML = `
      <div class="fact__icon" aria-hidden="true">${f.icon}</div>
      <p class="fact__num${isLongText ? " fact__num--text" : ""}">${f.number}</p>
      <p class="fact__label">${f.label}</p>`;
    grid.appendChild(el);
  });
}

/* ============================================================
   QUIZ
============================================================ */
function initQuiz() {
  const card = $("#quiz-card");
  const total = D.quiz.length;
  let current = 0;
  let score = 0;
  let locked = false;

  const renderStart = () => {
    card.innerHTML = `
      <div class="quiz__start">
        <p>${total} pertanyaan singkat. Jawab jujur ya, nggak boleh nyontek. 😌</p>
        <button class="btn btn--primary" type="button" id="quiz-start">Mulai ❤️</button>
      </div>`;
    $("#quiz-start").addEventListener("click", () => {
      current = 0;
      score = 0;
      renderQuestion();
    });
  };

  const renderQuestion = () => {
    locked = false;
    const q = D.quiz[current];
    const pct = (current / total) * 100;
    card.innerHTML = `
      <div class="quiz__progress">
        <span>Question ${current + 1} / ${total}</span>
        <span>❤️ ${score}</span>
      </div>
      <div class="quiz__bar"><span style="width:${pct}%"></span></div>
      <p class="quiz__question">${q.question}</p>
      <div class="quiz__options" role="group" aria-label="Pilihan jawaban">
        ${q.options
          .map((opt, i) => `<button class="quiz__option" type="button" data-index="${i}">${opt}</button>`)
          .join("")}
      </div>
      <p class="quiz__feedback" aria-live="polite"></p>`;

    $$(".quiz__option", card).forEach((btn) => {
      btn.addEventListener("click", () => {
        if (locked) return;
        locked = true;
        const chosen = Number(btn.dataset.index);
        const correct = chosen === q.answer;
        if (correct) score++;
        $$(".quiz__option", card).forEach((b) => {
          b.disabled = true;
          const idx = Number(b.dataset.index);
          if (idx === q.answer) b.classList.add("is-correct");
          else if (idx === chosen) b.classList.add("is-wrong");
        });
        $(".quiz__feedback", card).textContent = correct
          ? ["Betul! ❤️", "Tuh kan, kamu tau. 🥰", "Yess, bener!"][current % 3]
          : "Hmm, bukan itu... tapi nggak apa-apa 😌";
        setTimeout(() => {
          current++;
          current < total ? renderQuestion() : renderResult();
        }, 1000);
      });
    });
  };

  const renderResult = () => {
    const hearts = "❤️".repeat(score) + "🤍".repeat(total - score);
    const msg =
      score === total ? D.quizMessages.perfect : score >= Math.ceil(total / 2) ? D.quizMessages.good : D.quizMessages.low;
    card.innerHTML = `
      <div class="quiz__result">
        <p class="eyebrow">Hasil</p>
        <p class="quiz__hearts" aria-hidden="true">${hearts}</p>
        <p class="quiz__score">Score kamu: ❤️ ${score}/${total}</p>
        <p class="quiz__message">${msg}</p>
        <button class="btn btn--soft" type="button" id="quiz-retry">Main lagi</button>
      </div>`;
    if (score === total) burstConfetti(40);
    $("#quiz-retry").addEventListener("click", renderStart);
  };

  renderStart();
}

/* ============================================================
   CAROUSEL (momen favorit)
   Geser/swipe + drag mouse + tombol + autoplay halus.
   Kartu yang sedang aktif bisa di-tap: depan = foto, belakang = ceritanya.
============================================================ */
function initCarousel() {
  const track = $("#carousel-track");
  if (!track) return;

  const root = track.closest(".carousel");
  const segs = $("#carousel-segments");
  const prev = $("#carousel-prev");
  const next = $("#carousel-next");
  const countEl = $("#carousel-count");
  const hint = $("#carousel-hint");

  const AUTOPLAY_MS = 6000;
  const pad = (n) => String(n).padStart(2, "0");
  const total = D.moments.length;

  track.innerHTML = "";
  if (segs) segs.innerHTML = "";
  if (countEl) countEl.textContent = `01 / ${pad(total)}`;

  /* ---------- Susun kartu ---------- */
  D.moments.forEach((m, i) => {
    const title = m.title || m.caption || `Momen ${i + 1}`;
    const hasStory = Boolean(m.story || m.detail);

    const slide = document.createElement("article");
    slide.className = "mslide";
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} dari ${total}: ${title}`);
    slide.innerHTML = `
      <div class="mslide__inner">
        <div class="mslide__face mslide__face--front" role="button" tabindex="0" aria-expanded="false">
          <div class="mslide__photo-slot"></div>
          <span class="mslide__num" aria-hidden="true">${pad(i + 1)}</span>
          ${m.mood ? `<span class="mslide__mood" aria-hidden="true">${m.mood}</span>` : ""}
          <div class="mslide__body">
            ${m.date ? `<p class="mslide__date">${m.date}</p>` : ""}
            <h3 class="mslide__title">${title}</h3>
            ${m.caption ? `<p class="mslide__caption">${m.caption}</p>` : ""}
            ${hasStory ? `<p class="mslide__more"><span>tap buat ceritanya</span><i aria-hidden="true">↻</i></p>` : ""}
          </div>
        </div>
        <div class="mslide__face mslide__face--back">
          <p class="mslide__kicker">yang paling aku ingat</p>
          ${m.story ? `<p class="mslide__story">${m.story}</p>` : ""}
          ${m.detail ? `<p class="mslide__detail"><i aria-hidden="true">❤</i>${m.detail}</p>` : ""}
          <button class="mslide__close" type="button">tutup</button>
        </div>
      </div>`;

    slide.dataset.story = hasStory ? "1" : "0";

    // Foto lewat helper supaya tetap ada fallback kalau file-nya belum ada.
    const photo = createPhoto(m.src, m.caption || title, "photo--moment", i > 0);
    slide.querySelector(".mslide__photo-slot").replaceWith(photo);
    track.appendChild(slide);

    if (segs) {
      const seg = document.createElement("button");
      seg.type = "button";
      seg.className = "carousel__seg";
      seg.setAttribute("aria-label", `Ke momen ${i + 1}: ${title}`);
      seg.addEventListener("click", () => {
        goTo(i);
        restart();
        markInteracted();
      });
      segs.appendChild(seg);
    }
  });

  const slides = $$(".mslide", track);
  let index = 0;

  /* ---------- Ukuran kartu: sisakan sedikit bagian kartu sebelahnya ---------- */
  const measure = () => {
    const cw = track.clientWidth;
    if (!cw) return;
    const w = Math.max(190, Math.min(400, Math.round(cw * 0.82)));
    track.style.setProperty("--slide-w", `${w}px`);
  };

  const nearest = () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  };

  /* ---------- Autoplay (berhenti saat disentuh, dibaca, atau keluar layar) ---------- */
  let timer = 0;
  const holds = new Set();
  const stop = () => {
    clearInterval(timer);
    timer = 0;
  };
  const start = () => {
    stop();
    if (reducedMotion || total < 2 || holds.size) return;
    timer = setInterval(() => {
      if (!document.hidden) goTo(index + 1);
    }, AUTOPLAY_MS);
  };
  const hold = (key) => {
    holds.add(key);
    stop();
  };
  const release = (key) => {
    if (holds.delete(key) && !holds.size) start();
  };
  const restart = () => start();

  const markInteracted = () => hint && hint.classList.add("is-gone");

  /* ---------- Status kartu ---------- */
  const setFlipped = (i, on) => {
    const s = slides[i];
    if (!s) return;
    s.classList.toggle("is-flipped", on);
    $(".mslide__face--front", s).setAttribute("aria-expanded", String(on));
    const close = $(".mslide__close", s);
    if (close) close.tabIndex = on ? 0 : -1;
    if (on) hold("flip");
    else release("flip");
  };

  const setActive = (i) => {
    index = i;
    slides.forEach((s, j) => {
      const active = j === i;
      s.classList.toggle("is-active", active);
      s.setAttribute("aria-hidden", String(!active));
      const front = $(".mslide__face--front", s);
      const close = $(".mslide__close", s);
      if (!active) {
        s.classList.remove("is-flipped");
        front.setAttribute("aria-expanded", "false");
      }
      // Kartu yang tidak aktif tidak boleh bisa di-tab (termasuk tombol "tutup"-nya).
      front.tabIndex = active ? 0 : -1;
      if (close) close.tabIndex = active && s.classList.contains("is-flipped") ? 0 : -1;
    });
    $$(".carousel__seg", segs).forEach((seg, j) => {
      seg.classList.toggle("is-active", j === i);
      seg.setAttribute("aria-current", j === i ? "true" : "false");
    });
    if (countEl) countEl.textContent = `${pad(i + 1)} / ${pad(total)}`;
  };

  const goTo = (i, instant = false) => {
    const n = slides.length;
    if (!n) return;
    const target = (i + n) % n;
    if (target !== index) setFlipped(index, false);
    const s = slides[target];
    // Scroll hanya di dalam track (tidak menggeser halaman secara vertikal)
    track.scrollTo({
      left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2,
      behavior: reducedMotion || instant ? "auto" : "smooth",
    });
    setActive(target);
  };

  /* ---------- Tombol & keyboard ---------- */
  prev.addEventListener("click", () => {
    goTo(index - 1);
    restart();
    markInteracted();
  });
  next.addEventListener("click", () => {
    goTo(index + 1);
    restart();
    markInteracted();
  });

  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  });

  /* ---------- Tap kartu: kartu lain → pindah, kartu aktif → dibalik ---------- */
  slides.forEach((s, i) => {
    const front = $(".mslide__face--front", s);
    const back = $(".mslide__face--back", s);
    const close = $(".mslide__close", s);

    const toggle = () => {
      if (i !== index) {
        goTo(i);
        restart();
        markInteracted();
        return;
      }
      if (s.dataset.story !== "1") return;
      setFlipped(i, !s.classList.contains("is-flipped"));
      markInteracted();
    };

    front.addEventListener("click", toggle);
    front.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        toggle();
      }
    });
    back.addEventListener("click", () => {
      setFlipped(i, false);
      markInteracted();
    });
    close.addEventListener("click", (e) => {
      e.stopPropagation();
      setFlipped(i, false);
      markInteracted();
    });
  });

  /* ---------- Update hitungan saat user swipe ---------- */
  let raf;
  track.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const near = nearest();
        if (near !== index) {
          if (slides[index]) {
            slides[index].classList.remove("is-flipped");
            $(".mslide__face--front", slides[index]).setAttribute("aria-expanded", "false");
          }
          release("flip");
          setActive(near);
        }
      });
    },
    { passive: true }
  );

  /* ---------- Drag dengan mouse (geser tetap native di HP) ---------- */
  let drag = null;
  let suppressClick = false;

  track.addEventListener("dragstart", (e) => e.preventDefault());

  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    suppressClick = false;
    drag = { x: e.clientX, left: track.scrollLeft, moved: false, id: e.pointerId };
  });

  track.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved) {
      if (Math.abs(dx) < 6) return;
      drag.moved = true;
      track.classList.add("is-dragging");
      hold("drag");
      try {
        track.setPointerCapture(drag.id);
      } catch (_) {
        /* browser lama tanpa pointer capture: lewati saja */
      }
    }
    track.scrollLeft = drag.left - dx;
  });

  const endDrag = () => {
    if (!drag) return;
    const moved = drag.moved;
    drag = null;
    if (!moved) return;
    track.classList.remove("is-dragging");
    suppressClick = true;
    goTo(nearest(), true);
    release("drag");
    restart();
    markInteracted();
  };

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("lostpointercapture", endDrag);

  // Klik setelah drag tidak boleh membalik kartu.
  track.addEventListener(
    "click",
    (e) => {
      if (!suppressClick) return;
      suppressClick = false;
      e.preventDefault();
      e.stopPropagation();
    },
    true
  );

  /* ---------- Jeda otomatis ---------- */
  if (root) {
    root.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") hold("hover");
    });
    root.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse") release("hover");
    });
    root.addEventListener("focusin", () => hold("focus"));
    root.addEventListener("focusout", () => release("focus"));
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hold("hidden");
    else release("hidden");
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) release("offscreen");
          else hold("offscreen");
        });
      },
      { threshold: 0.25 }
    ).observe(track);
  }

  /* ---------- Ukuran ulang saat layar berubah ---------- */
  let resizeRaf;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      measure();
      goTo(index, true);
    });
  });

  if ("ResizeObserver" in window) {
    new ResizeObserver(() => {
      measure();
      goTo(index, true);
    }).observe(track);
  }

  measure();
  setActive(0);
  start();
}

/* ============================================================
   SURPRISE
============================================================ */
function initSurprise() {
  const stage = $("#surprise-stage");
  const note = $("#surprise-note");
  const btn = $("#surprise-btn");
  const revealWrap = $("#surprise-reveal");
  const card = $("#surprise-card");
  const section = $("#surprise");
  const steps = D.surprise.steps;
  let step = 0;

  btn.textContent = steps[0].button;

  btn.addEventListener("click", () => {
    step++;
    if (step < steps.length) {
      note.textContent = steps[step].note;
      btn.textContent = steps[step].button;
      if (!reducedMotion) {
        btn.classList.remove("is-shaking");
        void btn.offsetWidth; // restart animasi
        btn.classList.add("is-shaking");
      }
      return;
    }

    // Reveal
    stage.classList.add("is-hidden");
    card.innerHTML = `
      <h3>${D.surprise.title}</h3>
      ${D.surprise.messages.map((m) => `<p>${m}</p>`).join("")}`;
    revealWrap.hidden = false;
    burstConfetti(70);
    floatHearts(section, 12);
    setTimeout(() => burstConfetti(30), 1200);
  });
}

/* ============================================================
   FINAL MESSAGE + easter egg (tap nama)
============================================================ */
function renderFinal() {
  fillPhoto($("#final-photo"), D.finalMessage.photo.src, D.finalMessage.photo.alt);
  const wrap = $("#final-lines");
  wrap.innerHTML = "";
  let delay = 0;
  const add = (html, cls = "") => {
    const p = document.createElement("p");
    p.className = `reveal ${cls}`.trim();
    p.style.setProperty("--delay", `${delay}ms`);
    p.innerHTML = html;
    wrap.appendChild(p);
    delay += 250;
  };

  D.finalMessage.lines.forEach((line) => add(line));
  const gap = document.createElement("div");
  gap.className = "final__gap";
  wrap.appendChild(gap);
  delay += 400;
  add(D.finalMessage.highlight, "final__highlight");
  add(D.finalMessage.closing, "final__closing");
  add(`<button class="final__sign" id="final-sign" type="button">— ${D.myName}</button>`);

  $("#final-sign").addEventListener("click", () => {
    showToast(D.easterEggs.name);
    burstConfetti(20);
  });

  // Footer: "ANAM & B U N G A" lalu tanggal jadian di bawahnya
  $("#footer-names").textContent = `${D.shortName || D.myName} & ${D.partnerName}`;
  $("#footer-date").textContent = D.anniversaryDate;

  // Easter egg tersembunyi: tap ❤️ di footer
  $("#footer-heart").addEventListener("click", () => {
    showToast(D.easterEggs.hidden);
    floatHearts($(".footer"), 6);
  });
}

/* ============================================================
   MUSIK (YouTube IFrame Player API atau MP3 lokal)
   YouTube hanya dikendalikan setelah interaksi user, tidak autoplay paksa.
============================================================ */
const music = {
  audio: null,
  btn: null,
  player: null,
  config: null,
  mode: "",
  ready: false,
  playing: false,
  wantsPlayback: false,
  userRequested: false,
  silentRequest: true,
};

function setMusicState(playing) {
  music.playing = playing;
  music.btn.classList.toggle("is-playing", playing);
  music.btn.setAttribute("aria-pressed", String(playing));
  music.btn.setAttribute("aria-label", playing ? "Jeda musik" : "Putar musik");
  $(".music-btn__icon", music.btn).textContent = playing ? "🎵" : "🔇";
}

function initMusic() {
  music.audio = $("#bg-music");
  music.btn = $("#music-btn");
  if (!D.music) return;

  // Kompatibel dengan format lama: music: "assets/music/anniversary.mp3"
  music.config = typeof D.music === "string"
    ? { provider: "file", src: D.music, volume: 60 }
    : D.music;
  music.mode = music.config.provider === "youtube" ? "youtube" : "file";
  music.btn.hidden = false;
  setMusicState(false);

  music.audio.addEventListener("play", () => setMusicState(true));
  music.audio.addEventListener("pause", () => setMusicState(false));
  music.audio.addEventListener("error", () => handleMusicFailure("Musik belum tersedia."));

  music.btn.addEventListener("click", () => {
    music.userRequested = true;
    if (music.playing) pauseMusic();
    else tryPlayMusic(false);
  });

  if (music.mode === "youtube") initYouTubeMusic();
  else initFileMusic(music.config.src);
}

function initFileMusic(src) {
  if (!src) {
    handleMusicFailure("File musik belum ditambahkan.");
    return;
  }
  music.audio.src = src;
  music.audio.volume = Math.min(1, Math.max(0, (music.config.volume ?? 60) / 100));
}

function pauseMusic() {
  music.wantsPlayback = false;
  if (music.mode === "youtube" && music.player && music.ready) music.player.pauseVideo();
  else if (music.mode === "file") music.audio.pause();
  setMusicState(false);
}

function tryPlayMusic(silent = false) {
  if (!D.music) return;
  music.wantsPlayback = true;
  music.silentRequest = silent;

  if (music.mode === "youtube") {
    if (music.ready && music.player) {
      music.player.playVideo();
    } else {
      // Player dibuat saat musik benar-benar diminta (lazy), bukan saat halaman dibuka.
      ensureYouTubePlayer();
      if (!silent) showToast("Menyiapkan backsound... 🎵", 1600);
    }
    return;
  }

  const promise = music.audio.play();
  if (promise && typeof promise.catch === "function") {
    promise.catch(() => {
      if (!silent) showToast("Tap sekali lagi untuk memutar musik 🎵");
    });
  }
}

function handleMusicFailure(message) {
  setMusicState(false);

  // Bila YouTube diblokir atau tidak tersedia, MP3 lokal bisa menjadi fallback.
  if (music.mode === "youtube" && music.config.fallback) {
    music.mode = "file";
    initFileMusic(music.config.fallback);
    if (music.wantsPlayback) tryPlayMusic(music.silentRequest);
    return;
  }

  music.btn.hidden = true;
  if (music.userRequested) showToast(`${message} Tombol musik disembunyikan.`, 3000);
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  return new Promise((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    const timeout = window.setTimeout(() => reject(new Error("YouTube API timeout")), 15000);
    window.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timeout);
      if (typeof previousReady === "function") previousReady();
      resolve(window.YT);
    };

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      tag.onerror = () => reject(new Error("YouTube API gagal dimuat"));
      document.head.appendChild(tag);
    }
  });
}

/* Player YouTube TIDAK dibuat saat halaman dibuka. Skrip dan iframe YouTube
   itu berat; dulu ikut berjalan tepat ketika layar PIN baru muncul, sehingga
   website terasa lag sejak pertama dibuka. Sekarang dimuat saat musik diminta
   (PIN benar, tombol "Buka suratnya", atau tombol 🎵). */
function initYouTubeMusic() {
  if (!music.config.videoId) {
    handleMusicFailure("Video YouTube belum diatur.");
  }
}

let youtubePlayerStarted = false;

function ensureYouTubePlayer() {
  if (music.mode !== "youtube" || music.player || youtubePlayerStarted) return;
  if (!music.config.videoId) {
    handleMusicFailure("Video YouTube belum diatur.");
    return;
  }
  youtubePlayerStarted = true;

  loadYouTubeApi()
    .then((YT) => {
      music.player = new YT.Player("youtube-player", {
        width: "1",
        height: "1",
        videoId: music.config.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: music.config.videoId,
        },
        events: {
          onReady: (event) => {
            music.ready = true;
            event.target.setVolume(Math.min(100, Math.max(0, music.config.volume ?? 45)));
            event.target.setLoop?.(true);
            if (music.wantsPlayback) event.target.playVideo();
          },
          onStateChange: (event) => {
            const state = event.data;
            if (state === YT.PlayerState.PLAYING) setMusicState(true);
            if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED) setMusicState(false);
          },
          onAutoplayBlocked: () => {
            setMusicState(false);
            if (!music.silentRequest) showToast("Tap tombol musik sekali lagi ya 🎵");
          },
          onError: () => handleMusicFailure("Backsound YouTube tidak bisa diputar."),
        },
      });
    })
    .catch(() => handleMusicFailure("Backsound YouTube tidak bisa dimuat."));
}

/* ============================================================
   BOOT
============================================================ */
function init() {
  document.title = `${D.daysTogether} Hari Bersama Kamu ❤️`;

  renderHero();
  renderCounter();
  initLetter();
  renderTimeline();
  renderGallery();
  initAlbumNavigation();
  initLightbox();
  renderReasons();
  renderFacts();
  initQuiz();
  initCarousel();
  initSurprise();
  renderFinal();
  initMusic();
  initNav();
  initGate(); // kunci dulu: masukkan tanggal jadian
  initKeypad(); // tombol angka layar kunci
  initOpening(); // scroll-reveal dimulai setelah hadiah dibuka (lihat initOpening)
}

// The gallery page imports the shared data but has its own renderer.
export { anniversaryData };

if (document.querySelector("#site")) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}
