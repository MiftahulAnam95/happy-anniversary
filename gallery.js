import { galleryPhotos } from "./gallery-data.js";
import { onPhotoFailed, resolvePhotoSrc, setPhotoSrc } from "./photo-src.js";

const photos = galleryPhotos;
const $ = (selector, root = document) => root.querySelector(selector);
const grid = $("#album-grid");
const lightbox = $("#album-lightbox");

// Gallery is part of the same private anniversary flow as the main page.
let isUnlocked = false;
try {
  isUnlocked = sessionStorage.getItem("anniversary-unlocked") === "yes";
} catch {
  // If storage is blocked, keep the static album usable after navigation.
  isUnlocked = true;
}

if (!isUnlocked) window.location.replace("index.html#photos");

let activeIndex = 0;
let returnFocus = null;

// Kalau sebuah foto tidak ketemu di lokasi mana pun, tandai tombolnya supaya
// gallery.css menampilkan kotak "foto kita di sini 📷" (bukan ikon rusak).
onPhotoFailed((img) => img.closest(".album-photo__open")?.classList.add("is-missing"));

function renderGallery() {
  if (!grid) return;
  grid.replaceChildren();
  $("#album-count").textContent = `${photos.length} kenangan tersimpan`;

  photos.forEach((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = "album-photo";

    const button = document.createElement("button");
    button.className = "album-photo__open";
    button.type = "button";
    button.setAttribute("aria-label", `Buka foto ${index + 1}: ${photo.caption}`);

    const image = document.createElement("img");
    image.src = resolvePhotoSrc(photo.src);
    image.alt = photo.caption;
    image.loading = "lazy";
    image.decoding = "async";
    button.append(image);
    button.addEventListener("click", () => openPhoto(index));

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;

    const number = document.createElement("span");
    number.className = "album-photo__index";
    number.textContent = String(index + 1).padStart(2, "0");

    figure.append(button, caption, number);
    grid.append(figure);
  });
}

function updateLightbox() {
  const photo = photos[activeIndex];
  const image = $("#album-lightbox-image");
  image.style.opacity = "0";
  image.onload = () => { image.style.opacity = "1"; };
  image.onerror = () => { image.style.opacity = "1"; };
  setPhotoSrc(image, photo.src);
  image.alt = photo.caption;
  $("#album-lightbox-caption").textContent = photo.caption;
  $("#album-lightbox-count").textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
}

function openPhoto(index) {
  activeIndex = index;
  returnFocus = document.activeElement;
  updateLightbox();
  lightbox.hidden = false;
  document.body.classList.add("album-locked");
  $("#album-close").focus();
}

function closePhoto() {
  lightbox.hidden = true;
  document.body.classList.remove("album-locked");
  returnFocus?.focus();
}

function movePhoto(direction) {
  activeIndex = (activeIndex + direction + photos.length) % photos.length;
  updateLightbox();
}

function initLightbox() {
  $("#album-close").addEventListener("click", closePhoto);
  $("#album-prev").addEventListener("click", () => movePhoto(-1));
  $("#album-next").addEventListener("click", () => movePhoto(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closePhoto();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closePhoto();
    if (event.key === "ArrowLeft") movePhoto(-1);
    if (event.key === "ArrowRight") movePhoto(1);
  });

  let startX = 0;
  let startY = 0;
  lightbox.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }, { passive: true });
  lightbox.addEventListener("touchend", (event) => {
    const dx = event.changedTouches[0].clientX - startX;
    const dy = event.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) movePhoto(dx < 0 ? 1 : -1);
  }, { passive: true });
}

if (isUnlocked) {
  renderGallery();
  initLightbox();
}