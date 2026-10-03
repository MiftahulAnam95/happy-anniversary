import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.resolve(__dirname, "assets");

/**
 * Foto tinggal di `assets/` yang sejajar dengan `index.html` supaya GitHub Pages
 * (yang menyajikan isi repo apa adanya) bisa membacanya. `publicDir` dimatikan
 * karena folder itu khusus untuk pengembangan; saat build, folder `assets/`
 * disalin ke `dist/assets/` oleh plugin ini agar `npm run preview` juga jalan.
 */
function copyStaticAssets(): Plugin {
  return {
    name: "copy-static-assets",
    apply: "build",
    closeBundle() {
      if (!fs.existsSync(assetsDir)) return;
      fs.cpSync(assetsDir, path.resolve(__dirname, "dist/assets"), { recursive: true });
    },
  };
}

/**
 * Hasil build sengaja berupa SATU file HTML mandiri (`vite-plugin-singlefile`),
 * jadi semua foto ditanam sebagai data URI. Ini membuat `dist/index.html` tetap
 * menampilkan foto walaupun hanya file itu saja yang dibuka/dipratinjau.
 */
function inlineGalleryPhotos(): Plugin {
  const marker = "/* __INLINE_PHOTOS__ */ {}";
  return {
    name: "inline-gallery-photos",
    apply: "build",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith("photo-src.js") || !code.includes(marker)) return null;

      const photosDir = path.join(assetsDir, "photos");
      if (!fs.existsSync(photosDir)) return null;

      const files = fs
        .readdirSync(photosDir)
        .filter((file) => /\.(jpe?g|png|webp|avif|gif)$/i.test(file))
        .sort();

      const imports: string[] = [];
      const entries: string[] = [];

      files.forEach((file, index) => {
        const binding = `__photo${index}`;
        imports.push(`import ${binding} from "./assets/photos/${file}?inline";`);
        entries.push(`  ${JSON.stringify(`assets/photos/${file}`)}: ${binding},`);
      });

      const map = `{\n${entries.join("\n")}\n}`;
      return `${imports.join("\n")}\n${code.replace(marker, map)}`;
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // Path relatif supaya hasil build tetap jalan di sub-folder (mis. GitHub Pages /nama-repo/).
  base: "./",
  publicDir: false,
  plugins: [react(), tailwindcss(), viteSingleFile(), inlineGalleryPhotos(), copyStaticAssets()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    // Preview Arena memakai host proxy sendiri, jadi semua host diizinkan.
    allowedHosts: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
});
