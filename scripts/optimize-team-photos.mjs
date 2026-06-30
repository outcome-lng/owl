// Optimise team headshots for the site.
//
//   node scripts/optimize-team-photos.mjs
//
// Reads raw images from public/images/raw/ and writes square, compressed
// webp avatars to public/images/. The output basename must match the `photo`
// path used in the team data, so save the raws as:
//
//   public/images/raw/lee-nicholson.(jpg|png|webp)
//   public/images/raw/mark-ebden.(jpg|png|webp)
//   public/images/raw/john-jones.(jpg|png|webp)
//
// Each is centre-cropped to a square and resized to 400x400 (covers retina at
// the 80px About avatar and 48px home strip).

import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RAW = path.join(root, "public", "images", "raw");
const OUT = path.join(root, "public", "images");
const SIZE = 400;
const EXP = ["lee-nicholson", "mark-ebden", "john-jones"];

async function main() {
  let files;
  try {
    files = await readdir(RAW);
  } catch {
    console.error(`\n  MISSING: ${RAW}\n  Create it and save the three headshots as ` +
      EXP.map((n) => `${n}.(jpg|png)`).join(", ") + ", then re-run.\n");
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });

  const sources = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  if (!sources.length) {
    console.error(`  No images found in ${RAW}.`);
    process.exit(1);
  }

  for (const file of sources) {
    const base = path.basename(file, path.extname(file)).toLowerCase().replace(/-bio$/, "");
    const out = path.join(OUT, `${base}.webp`);
    await sharp(path.join(RAW, file))
      .rotate() // honour EXIF orientation
      .resize(SIZE, SIZE, { fit: "cover", position: "attention" }) // smart centre on the face
      .webp({ quality: 82 })
      .toFile(out);
    const { size } = await stat(out);
    console.log(`  ${file}  ->  images/${base}.webp  (${Math.round(size / 1024)} KB)`);
  }

  const got = sources.map((f) => path.basename(f, path.extname(f)).toLowerCase());
  const missing = EXP.filter((n) => !got.includes(n));
  if (missing.length) console.log("\n  Note: still expecting:", missing.join(", "));
  console.log("Done.");
}

main();
