/* ============================================================
   PHOTO SOURCE HELPER — dipakai index.html & gallery.html

   Di mana fotonya disimpan:
   - Foto album   : `assets/photos/photo-01.jpg` s.d. `photo-30.jpg`
   - Ilustrasi bab: `assets/photos/story-01.jpg` s.d. `story-05.jpg`
   Folder `assets/` SEJAJAR dengan index.html, jadi GitHub Pages (yang
   menyajikan isi repo apa adanya) bisa membacanya lewat path relatif.

   Kenapa file ini ada:
   Versi lama project ini menyimpan foto di `public/assets/` sehingga path
   `assets/...` menghasilkan 404 dan foto tidak muncul sama sekali. Supaya
   salah taruh berkas tidak bikin halaman rusak, helper ini:
     1. mencoba lokasi cadangan untuk setiap foto — termasuk variasi huruf
        besar/kecil ekstensi (`photo-05.JPG`) dan berkas yang ter-upload
        langsung ke root repo (hasil tombol "Add files via upload" di GitHub),
     2. mengganti `src` ke kandidat berikutnya saat foto gagal dimuat, dan
     3. menandai foto yang benar-benar hilang agar halaman menampilkan
        placeholder "foto kita di sini" alih-alih kotak rusak.
============================================================ */

const ASSETS_DIR = "assets/";
const LEGACY_DIR = "public/assets/";
const ROOT_DIR = "";

/* Saat `npm run build`, Vite mengganti penanda di bawah dengan peta
   path → data URI supaya hasil build satu file tetap mandiri (fotonya
   ikut tertanam di dalam HTML). Di repo ini nilainya tetap kosong. */
const inlinePhotos = /* __INLINE_PHOTOS__ */ {};

const failHandlers = [];
const hasScheme = (value) => /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//");

function normalize(src) {
  return String(src ?? "").trim().replace(/^\.\//, "");
}

/** Pecah path jadi folder (dengan "/" di akhir) dan nama berkasnya. */
function splitPath(path) {
  const slash = path.lastIndexOf("/");
  return slash === -1
    ? { dir: "", file: path }
    : { dir: path.slice(0, slash + 1), file: path.slice(slash + 1) };
}

/**
 * Variasi nama berkas yang tetap mengarah ke foto yang sama.
 * GitHub Pages membedakan huruf besar/kecil, jadi `photo-05.jpg` di kode
 * tidak akan ketemu berkas `photo-05.JPG` hasil upload.
 */
function fileNameVariants(file) {
  const variants = [file];
  const dot = file.lastIndexOf(".");
  if (dot <= 0) return variants;

  const base = file.slice(0, dot);
  const ext = file.slice(dot + 1).toLowerCase();
  const extensions = ext === "jpg" || ext === "jpeg" ? ["jpg", "jpeg", "JPG", "JPEG"] : [ext, ext.toUpperCase()];

  extensions.forEach((candidate) => {
    const next = `${base}.${candidate}`;
    if (!variants.includes(next)) variants.push(next);
  });
  return variants;
}

/** Folder yang dicoba untuk sebuah path, urut dari yang paling utama. */
function directoryVariants(dir) {
  const dirs = [dir];
  if (dir.startsWith(ASSETS_DIR)) dirs.push(LEGACY_DIR + dir.slice(ASSETS_DIR.length));
  else if (dir.startsWith(LEGACY_DIR)) dirs.push(dir.slice("public/".length));
  // Nama berkas saja (tanpa folder) dianggap koleksi foto utama, lalu root repo
  // tempat berkas hasil "Add files via upload" di GitHub biasanya mendarat.
  else if (dir === ROOT_DIR) dirs.push("assets/photos/");
  if (dir !== ROOT_DIR) dirs.push(ROOT_DIR);
  return dirs;
}

/** Daftar kandidat URL untuk satu path foto, urut dari yang paling utama. */
export function photoCandidates(src) {
  const clean = normalize(src);
  if (!clean) return [];
  // URL lengkap atau path absolut (mis. dari data URI hasil build) dipakai apa adanya.
  if (hasScheme(clean) || clean.startsWith("/")) return [clean];

  const { dir, file } = splitPath(clean);
  const names = fileNameVariants(file);
  const list = [];

  directoryVariants(dir).forEach((folder) => {
    names.forEach((name) => {
      const candidate = folder + name;
      if (!list.includes(candidate)) list.push(candidate);
    });
  });

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
 * kandidat berikutnya (mis. `assets/photos/...` → `public/assets/photos/...`
 * → berkas di root repo). Dipasang otomatis saat modul ini di-import.
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
