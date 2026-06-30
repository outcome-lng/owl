// Optimise full-bleed content images (heroes, banners) for the site.
//
//   node scripts/optimize-content-images.mjs
//
// Reads named raw drops from public/images/raw/ and writes responsive webp
// sets to public/images/. These scenes carry fine UI text and baked-in
// headings, so we DO NOT crop them (kept at their native 16:9) and use a
// higher webp quality than the team avatars to keep small text legible.
//
// Each entry produces <basename>-<width>.webp at every width, e.g.
//   home-hero-1600.webp  home-hero-1040.webp  home-hero-640.webp
// Wire them with a srcset; the largest is the default src.

import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW = path.join(root, "public", "images", "raw");
const OUT = path.join(root, "public", "images");

// Responsive widths (descending). Native source is ~1672px wide.
const WIDTHS = [1600, 1040, 640];
const QUALITY = 85;

// raw filename  ->  output basename
const MAP = {
  "image 1.png": "home-hero",
  "image 5.png": "home-two-paths",
  "image 3.png": "home-suite",
  "image 4.png": "home-insights",
  // image 2.png ("CONSULTANCY / PRODUCTS" scene) currently unused on the home page.
  "image 6.png": "products-hero",
  "image 7.png": "products-core",
  "image 8.png": "tender-intel-map", // navy EU network map, blended into the hero grid
  "image 9.png": "tender-intel-dashboard", // opportunity-pipeline dashboard showcase
  "image 10.png": "tender-intel-workflow", // team reviewing the tender pipeline
  "image 11.png": "owl-bid-team-specialists", // the specialist roles around the solution hub
  "image 12.png": "owl-bid-team-process-bg", // quality-gates whiteboard, used as a section background
  "image 14.png": "talon-ops-control-room", // operations control room: wall display, dispatchers, field engineer
  "image 15.png": "talon-ops-programme", // operations manager at the programme dashboard
  "image 25.png": "contact-hero-bg", // OWL reception lobby, used as the contact hero background
  "image 26.png": "about-hero-bg", // team meeting, used as the about hero background
};

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const [file, base] of Object.entries(MAP)) {
    const src = path.join(RAW, file);
    for (const w of WIDTHS) {
      const out = path.join(OUT, `${base}-${w}.webp`);
      await sharp(src)
        .rotate() // honour EXIF orientation
        .resize(w, null, { withoutEnlargement: true }) // keep native aspect, never upscale
        .webp({ quality: QUALITY })
        .toFile(out);
      const { size } = await stat(out);
      console.log(`  ${file}  ->  images/${base}-${w}.webp  (${Math.round(size / 1024)} KB)`);
    }
  }
  console.log("Done.");
}

main();
