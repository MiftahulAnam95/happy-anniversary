# 365 Hari Bersama Kamu ❤️

Website interaktif untuk merayakan **1st Anniversary** — dimulai dengan PIN tanggal jadian, lalu membuka surat cinta dan cerita kalian. Bagian Photos punya album lengkap dengan tampilan khusus di dalam halaman yang sama.

- 100% **HTML + CSS + Vanilla JavaScript** (tanpa framework, tanpa backend, tanpa API key)
- **Mobile-first** (360–412 px dulu, baru tablet & desktop)
- Bisa langsung dihosting di **GitHub Pages**
- Konten cerita ada di `anniversaryData` pada `script.js`; daftar foto dan caption bersama ada di `gallery-data.js`

---

## 1. Struktur folder

```
/
├── index.html          ← struktur halaman
├── style.css           ← semua tampilan (mobile-first)
├── script.js           ← DATA (bagian 1) + logika (bagian 2)
├── gallery.html        ← halaman album foto lengkap
├── gallery.css         ← tampilan album foto
├── gallery.js          ← grid, lightbox, keyboard, dan swipe album
├── gallery-data.js     ← daftar foto/caption bersama untuk dua halaman
├── photo-src.js        ← penentu path foto + pemulihan kalau foto tidak ketemu
├── README.md
└── assets/             ← SEJAJAR dengan index.html (ini yang dibaca GitHub Pages)
    ├── photos/
    │   ├── photo-01.jpg
    │   ├── photo-02.jpg
    │   ├── photo-03.jpg
    │   └── ...            (photo-08.jpg dst.)
    └── music/
        └── anniversary.mp3   ← (opsional) musik latar
```

> Penting: folder `assets/` harus **sejajar dengan `index.html`**, bukan di dalam `public/`.
> Semua path di kode relatif (`assets/photos/photo-01.jpg`) tanpa garis miring di depan, jadi
> tetap jalan baik di `https://USERNAME.github.io/NAMA-REPO/` maupun di server lokal.

Foto yang ada sekarang hanyalah **ilustrasi placeholder** — ganti dengan foto kalian sendiri.

> Catatan teknis: hasil `npm run build` berupa satu file `dist/index.html` yang mandiri
> (semua foto ikut ditanam sebagai data URI), jadi file itu tetap menampilkan foto walau
> dibuka sendirian. Untuk GitHub Pages cukup pakai file di root repo seperti biasa.

---

## 2. Cara memasukkan foto

1. Siapkan foto (disarankan sudah dikompres, lebar ± 1200 px, format `.jpg` atau `.webp`).
2. Masukkan ke folder `assets/photos/`.
3. Beri nama berurutan:
   ```
   photo-01.jpg
   photo-02.jpg
   photo-03.jpg
   ...
   ```
4. Buka `gallery-data.js`, lalu sesuaikan `src` dan `caption` untuk foto yang ingin ditampilkan. Nama file harus sama persis (huruf besar/kecil berpengaruh di GitHub Pages).
5. Selesai — website otomatis membacanya.

Foto dan caption di `gallery-data.js` dipakai bersama oleh preview Photos, album lengkap di halaman utama, dan halaman standalone `gallery.html`, jadi cukup edit satu daftar.

### Halaman album lengkap

Tombol **"Lihat semua foto"** di bagian Photos membuka album lengkap sebagai tampilan penuh di dalam `index.html`. Tidak ada navigasi ke `/gallery.html`, sehingga CTA tetap bekerja pada preview/build yang hanya menerbitkan satu file HTML dan tidak menampilkan 404. Album menampilkan seluruh foto dalam grid responsif dengan lazy-loading dan lightbox fullscreen. Lightbox mendukung tombol sebelumnya/berikutnya, keyboard, serta swipe di HP. Tombol kembali atau tombol back browser membawa pengunjung ke posisi Photos semula.

`gallery.html` juga tersedia sebagai halaman standalone jika semua file sumber di-upload langsung ke root GitHub Pages. CTA utama tidak bergantung pada halaman terpisah ini.

Kalau sebuah foto tidak ditemukan, website **tidak rusak**: kotak foto akan menampilkan tulisan kecil *"📷 foto kamu di sini"*.

Foto dipakai di:
| Bagian | Sumber data |
|---|---|
| Hero (polaroid) | `hero.photo.src` |
| Timeline | `timeline[].image` |
| Gallery homepage / album lengkap | `gallery-data.js` (`galleryPhotos[]`) |
| Carousel momen | `moments[].src` |
| Pesan terakhir | `finalMessage.photo.src` |

---

## 3. Cara mengganti nama

Buka `script.js`, bagian paling atas:

```js
myName: "[NAMA SAYA]",
partnerName: "[NAMA PACAR]",
```

Nama kamu muncul di tanda tangan surat, pesan terakhir, dan footer.
(Tip: tanda tangan di bagian akhir bisa di-tap → easter egg "I love you ❤️".)

---

## 4. Cara mengganti tanggal & angka

```js
anniversaryDate: "[TANGGAL JADIAN]",   // contoh: "14 Februari 2025"
daysTogether: 365,
monthsTogether: 12,

counter: [
  { number: "365", label: "hari bersama", note: "dan terus bertambah" },
  { number: "12",  label: "bulan",        note: "banyak cerita" },
  { number: "∞",   label: "kenangan",     note: "yang ingin terus bertambah" },
],
```

Tanggal per-momen diisi langsung di masing-masing item `timeline` dan `moments`.

---

## 5. Cara mengganti pesan

**Hero:**
```js
hero: {
  title: "Happy 1st Anniversary ❤️",
  tagline: "365 hari, dan aku masih memilih kamu.",
  subtext: "Terima kasih sudah menjadi bagian dari ...",
}
```

**Surat cinta** (setiap item = satu paragraf, akan muncul dengan efek mengetik):
```js
letter: {
  greeting: "Sayang,",
  paragraphs: [
    "paragraf pertama...",
    "paragraf kedua...",
  ],
  closing: "— dengan sayang, [NAMA SAYA]",
}
```

**Surprise** dan **pesan terakhir:**
```js
surprise: { title: "...", messages: ["...", "...", "..."] },
finalMessage: { lines: ["...", "..."], highlight: "aku tetap akan memilih kamu. ❤️", closing: "Happy 1st Anniversary." },
```

---

## 6. Cara mengganti timeline

Setiap item = satu titik di perjalanan. Tambah/kurangi sesuka hati.

```js
timeline: [
  {
    icon: "📍",
    date: "[TANGGAL PERTAMA BERTEMU]",
    title: "First Meet",
    description: "Pertama kali kita bertemu...",
    image: "assets/photos/photo-02.jpg",   // boleh dihapus kalau tidak ada foto
  },
]
```

---

## 7. Cara mengganti alasan ("10 alasan kenapa aku sayang kamu")

```js
reasonsTitle: "10 alasan kenapa aku sayang kamu ❤️",
reasons: [
  "Alasan pertama...",
  "Alasan kedua...",
],
```

Jumlah kartu mengikuti jumlah alasan (disarankan 8–10 agar grid rapi).

---

## 8. Cara mengganti quiz

```js
quiz: [
  {
    question: "Apa makanan favoritku?",
    options: ["Bakso", "Mie ayam", "Sushi"],
    answer: 1,   // index jawaban benar, dimulai dari 0 → "Mie ayam"
  },
],
quizMessages: {
  perfect: "Kayaknya kamu memang orang yang tepat. ❤️",
  good: "Hampir sempurna!...",
  low: "Hmm... kayaknya kita perlu lebih banyak quality time.",
},
```

Boleh 3–4 pilihan per soal, dan jumlah soal bebas (progress "Question 2 / 5" menyesuaikan).

---

## 9. Cara memasukkan musik (opsional)

Website ini sudah disetel memakai backsound YouTube yang diberikan:
`https://www.youtube.com/watch?v=fOqtsiuKVmM`

```js
music: {
  provider: "youtube",
  videoId: "fOqtsiuKVmM",
  volume: 45, // 0-100
  fallback: "", // opsional: "assets/music/anniversary.mp3"
},
```

1. Musik diputar melalui **YouTube IFrame Player API**; tidak ada file lagu YouTube yang diunduh atau disalin ke repository.
2. Musik baru dicoba diputar setelah tombol **"Buka suratnya"** ditekan. Bila browser HP memblokirnya, gunakan tombol 🎵 floating di kanan bawah untuk play/pause.
3. Embed YouTube membutuhkan koneksi internet. Jika video tidak dapat di-embed, diblokir, atau dihapus, website tetap berfungsi normal dan tombol musik disembunyikan.
4. Untuk fallback lokal, simpan MP3 di `assets/music/anniversary.mp3`, lalu isi `fallback: "assets/music/anniversary.mp3"`.
5. Untuk memakai MP3 lokal saja, gunakan format ini:
   ```js
   music: "assets/music/anniversary.mp3",
   ```
6. Tidak ingin musik? Ubah menjadi `music: ""`.

---

## 10. Deploy ke GitHub Pages

Website ini **tidak membutuhkan server** (tanpa Node.js, PHP, database, API key). Cukup file statis.

1. Buat repository baru di GitHub (misalnya `anniversary`).
2. Upload file berikut ke repository (drag & drop di halaman repo → *Add file → Upload files*):
   ```
   index.html
   style.css
   script.js
   gallery.html
   gallery.css
   gallery.js
   gallery-data.js
   photo-src.js
   README.md
   assets/            ← folder assets apa adanya dari root repo (photos, music)
   ```
   Pastikan `assets/` **sejajar** dengan `index.html`, bukan di dalam `public/`.
3. Masuk ke **Settings** repository.
4. Pilih menu **Pages** di sidebar kiri.
5. Pada *Build and deployment → Source*, pilih **Deploy from a branch**.
6. Branch: **`main`**, folder: **`/ (root)`**.
7. Klik **Save**.
8. Tunggu ± 1 menit, lalu buka URL yang muncul:
   `https://USERNAME.github.io/NAMA-REPO/`

Kirim link itu ke pacar kamu. 💌

> Semua path memakai relative path (`assets/...`, bukan `/assets/...`) sehingga kompatibel dengan sub-folder GitHub Pages.

### Tes di komputer sebelum upload
Karena `script.js` dimuat sebagai `type="module"`, buka lewat server lokal (bukan dobel-klik file):
- VS Code → extension **Live Server** → *Open with Live Server*, atau
- `python -m http.server` lalu buka `http://localhost:8000`, atau
- di project ini: `npm run dev` (Vite).

### Kalau foto tidak tampil 😕

Cek berurutan:

1. **Pastikan `assets/` sejajar dengan `index.html`.** Buka `https://USERNAME.github.io/NAMA-REPO/assets/photos/photo-01.jpg`
   di browser — kalau muncul 404, berarti folder/fotonya belum ikut ter-upload.
2. **Nama file harus sama persis** dengan `src` di `gallery-data.js` dan `script.js`
   (`data/photos/...` peka huruf besar/kecil, dan GitHub Pages peka spasi).
3. **Jangan taruh `assets/` di dalam `public/`.** `public/` khusus untuk pengembangan Vite
   dan tidak ikut terbit di GitHub Pages. (Kalau kamu masih menyimpan salinan lama di
   `public/assets/`, `photo-src.js` otomatis mengarahkan ke sana, jadi tetap tampil.)
4. **Buka lewat server** (Live Server / `python -m http.server` / `npm run dev`), bukan
   dobel-klik `index.html`, karena halaman memakai `type="module"`.
5. Cache browser: tekan reload keras (Ctrl/Cmd + Shift + R) setelah mengganti foto.
6. Kalau foto benar-benar tidak ketemu, website tetap rapi: kotak foto akan menampilkan
   tulisan kecil *"foto kita di sini 📷"* — bukan ikon gambar rusak.

---

## 11. Easter eggs 🥚

| Aksi | Hasil |
|---|---|
| Tap angka **365** (kartu pertama di counter) 3× cepat | "Eh kok diklik terus? 😂" |
| Tap **❤️** di footer ("Made with ❤️") | "👀 Kamu nemu rahasia." |
| Tap **nama kamu** di tanda tangan pesan terakhir | "I love you ❤️" |
| Buka semua kartu alasan | confetti kecil |
| Skor quiz sempurna | confetti |

Teks easter egg bisa diubah di `easterEggs` pada `script.js`.

---

## 12. Fitur & catatan teknis

- **Mobile-first**: base CSS untuk 0–767 px, lalu `@media (min-width: 768px)` tablet dan `1024px` desktop; unit fluid (`clamp()`, `min()`, `%`, `rem`).
- **Safe area**: `env(safe-area-inset-*)` untuk notch/punch-hole dan browser UI.
- **Touch target** minimal ± 44 × 44 px; semua interaksi berbasis **tap / swipe / scroll** (tidak bergantung hover).
- **Lightbox**: fullscreen pada preview dan album, tombol close/prev/next besar, swipe kiri-kanan, keyboard (← → Esc).
- **Carousel**: scroll-snap native (swipe), tombol ← → dan dots.
- **Animasi**: CSS `transform`/`opacity`, `IntersectionObserver` untuk scroll reveal, confetti DOM ringan tanpa library. Menghormati `prefers-reduced-motion`.
- **Aksesibilitas**: alt text, `aria-label`, `aria-expanded`, `aria-live`, fokus keyboard, modal bisa ditutup dengan Esc.
- **Performa**: `loading="lazy"` untuk galeri, tanpa library eksternal (hanya Google Fonts: *Fraunces* untuk judul & aksen romantis, serta *Plus Jakarta Sans* untuk body).
- **Desain hangat & romantis**: latar blush lembut dengan tekstur titik halus, foto berpita selotip seperti scrapbook, stempel bulat "365", hati kecil melayang, kartu membulat dengan bayangan lembut, dan satu aksen coral/rose yang konsisten.
- **Password pembuka**: layar pertama berupa panel PIN dengan keypad angka, seperti membuka kunci HP. Password default adalah tanggal jadian `12-10-2025`. Ganti di `script.js`:
  ```js
  password: "12-10-2025",
  passwordHint: "clue-nya: tanggal jadian kita, pakai format dd-mm-yyyy ya",
  passwordWrong: "Hmm, bukan itu... coba inget-inget lagi ya 💭",
  passwordRight: "Nah, bener! Selamat datang, sayang ❤️",
  ```
  Format yang diterima: `12-10-2025`, `12/10/2025`, atau `12102025` (angkanya harus sama).
- **Opening personal**: animasi amplop dimulai setelah PIN benar; stempel `A ❤️ B` muncul di surat yang terangkat dari amplop.
- **Album lengkap**: tampilan satu halaman di dalam `index.html`, memakai sumber foto bersama `gallery-data.js`. Tersedia juga `gallery.html` sebagai alternatif standalone pada hosting root yang menyajikan semua file.

---

## 13. Checklist sebelum dikirim 💌

- [ ] Semua `[PLACEHOLDER]` di `script.js` sudah diganti
- [ ] Foto sudah di `assets/photos/` dengan nama yang cocok
- [ ] Jawaban quiz (`answer`) sudah benar
- [ ] Musik ada (atau `music: ""`)
- [ ] Dicek di HP: tidak ada scroll horizontal, semua tombol bisa ditekan
- [ ] Sudah dibaca ulang surat dan pesan terakhirnya — ini bagian yang paling penting ❤️

Made with ❤️, specifically for you.
