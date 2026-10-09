/* ============================================================
   PHOTO SOURCE HELPER — dipakai index.html & gallery.html

   Kenapa file ini ada:
   Foto disimpan di folder `assets/` yang SEJAJAR dengan index.html,
   jadi GitHub Pages (yang menyajikan isi repo apa adanya) bisa
   membacanya lewat path relatif `assets/photos/photo-01.jpg`.

   Versi lama project ini menyimpan foto di `public/assets/` sehingga
   path `assets/...` menghasilkan 404 dan foto tidak muncul sama sekali.
   Supaya salinan/zip versi lama tetap hidup, helper ini:
     1. otomatis mencoba lokasi cadangan (`public/assets/...`) kalau
        foto gagal dimuat, dan
     2. menandai foto yang benar-benar hilang agar halaman menampilkan
        placeholder "foto kita di sini" alih-alih kotak rusak.
============================================================ */

const ASSETS_DIR = "assets/";
const LEGACY_DIR = "public/assets/";

/* Saat `npm run build`, Vite mengganti penanda di bawah dengan peta
   path → data URI supaya hasil build satu file tetap mandiri (fotonya
   ikut tertanam di dalam HTML). Di repo ini nilainya tetap kosong. */
const inlinePhotos = /* __INLINE_PHOTOS__ */ {};

const failHandlers = [];
const hasScheme = (value) => /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//");

function normalize(src) {
  return String(src ?? "").trim().replace(/^\.\//, "");
}

/** Daftar kandidat URL untuk satu path foto, urut dari yang paling utama. */
export function photoCandidates(src) {
  const clean = normalize(src);
  if (!clean) return [];
  if (hasScheme(clean) || clean.startsWith("/")) return [clean];

  const list = [clean];
  if (clean.startsWith(ASSETS_DIR)) {
    list.push(LEGACY_DIR + clean.slice(ASSETS_DIR.length));
  } else if (clean.startsWith(LEGACY_DIR)) {
    list.push(clean.slice("public/".length));
  }
  return list;
}

/** Path foto yang siap dipasang ke atribut `src` (berupa data URI saat build). */
export function resolvePhotoSrc(src) {
  const clean = normalize(src);
  return inlinePhotos[clean] || clean;
}

/** Ganti isi photo tanpa memutus mekanisme pemulihan (dipakai lightbox). */
export function setPhotoSrc(img, src) {
  if (!img) return img;
  delete img.dataset.photoSource;
  delete img.dataset.photoAttempt;
  img.classList.remove("photo-failed");
  img.src = resolvePhotoSrc(src);
  return img;
}

/** Daftarkan callback untuk foto yang gagal total (semua kandidat habis). */
export function onPhotoFailed(handler) {
  if (typeof handler === "function") failHandlers.push(handler);
}

/**
 * Pemulihan otomatis: kalau sebuah foto gagal dimuat, `src` dicoba ke
 * kandidat berikutnya (mis. `assets/...` → `public/assets/...`).
 * Dipasang otomatis saat modul ini di-import.
 */
export function installPhotoFallback() {
  if (typeof document === "undefined" || document.__photoFallbackReady) return;
  document.__photoFallbackReady = true;

  document.addEventListener(
    "load",
    (event) => {
      if (event.target instanceof HTMLImageElement) event.target.classList.remove("photo-failed");
    },
    true,
  );

  document.addEventListener(
    "error",
    (event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;

      const current = String(img.getAttribute("src") || "");
      if (!img.dataset.photoSource) img.dataset.photoSource = current;

      const candidates = photoCandidates(img.dataset.photoSource);
      const attempt = Number(img.dataset.photoAttempt || "0");
      const next = candidates[attempt + 1];

      if (next) {
        img.dataset.photoAttempt = String(attempt + 1);
        img.classList.remove("photo-failed");
        // Tahan dulu: jangan tampilkan placeholder selagi kandidat lain dicoba.
        event.stopPropagation();
        img.src = next;
        return;
      }

      img.classList.add("photo-failed");
      failHandlers.forEach((handler) => handler(img));
    },
    true,
  );
}

installPhotoFallback();
