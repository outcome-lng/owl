// Generate the brand asset suite from public/owl.png.
//
//   node scripts/gen-brand-assets.mjs
//
// Produces (all in public/):
//   favicon-16.png, favicon-32.png, apple-touch-icon.png  (owl on paper, rounded)
//   favicon.ico                                            (via ImageMagick, if present)
//   favicon.svg                                            (owl PNG embedded as base64)
//   og-image.png                                           (1200x630 social card)
//
// Also prints the logo's dominant colours so the palette tokens in
// src/styles/global.css can be tuned to match.

import sharp from "sharp";
import { readFile, writeFile, access } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import path from "node:path";

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const SRC = path.join(pub, "owl.png");

// Brand grounds (kept in sync with global.css)
const PAPER = "#ECEFF2";
const NAVY = "#06395B";
const CYAN = "#179EB2";

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function sampleColours() {
  // Resize tiny and report the dominant colour + a light/dark read, as a guide.
  const { dominant } = await sharp(SRC).stats();
  const hex = (c) => "#" + [c.r, c.g, c.b].map((v) => v.toString(16).padStart(2, "0")).join("");
  console.log("  dominant pixel colour:", hex(dominant), "(sample owl.png in an editor for exact navy/cyan)");
}

// A square icon: owl centred on a rounded paper ground (navy owl reads on light).
async function icon(size, out, { rounded = true } = {}) {
  const pad = Math.round(size * 0.14);
  const inner = size - pad * 2;
  const owl = await sharp(SRC)
    .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const r = rounded ? Math.round(size * 0.22) : 0;
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${PAPER}"/></svg>`
  );
  await sharp(bg)
    .composite([{ input: owl, gravity: "center" }])
    .png()
    .toFile(path.join(pub, out));
  console.log("  wrote", out);
}

async function faviconSvg() {
  const b64 = (await readFile(SRC)).toString("base64");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${PAPER}"/>
  <image x="4" y="3" width="24" height="26" href="data:image/png;base64,${b64}"/>
</svg>`;
  await writeFile(path.join(pub, "favicon.svg"), svg);
  console.log("  wrote favicon.svg (owl embedded)");
}

async function ogCard() {
  const W = 1200, H = 630;
  const owl = await sharp(SRC)
    .resize({ height: 360, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g1" cx="14%" cy="8%" r="55%">
      <stop offset="0%" stop-color="${CYAN}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <text x="80" y="300" fill="#FFFFFF" font-family="Space Grotesk, system-ui, sans-serif" font-size="64" font-weight="700" letter-spacing="-1.5">Outcome Works</text>
  <text x="80" y="360" fill="#FFFFFF" fill-opacity="0.72" font-family="Space Grotesk, system-ui, sans-serif" font-size="30" font-weight="500">Built to win the work that's hard to win.</text>
  <text x="80" y="430" fill="${CYAN}" font-family="IBM Plex Mono, monospace" font-size="20" letter-spacing="3">CONSULTANCY · PRODUCTS</text>
</svg>`);
  await sharp(bg)
    .composite([{ input: owl, top: Math.round((H - 360) / 2), left: W - 360 - 90 }])
    .png()
    .toFile(path.join(pub, "og-image.png"));
  console.log("  wrote og-image.png (1200x630)");
}

async function ico() {
  try {
    await run("magick", [
      path.join(pub, "favicon-32.png"),
      "-define", "icon:auto-resize=16,32,48",
      path.join(pub, "favicon.ico"),
    ]);
    console.log("  wrote favicon.ico (ImageMagick)");
  } catch {
    console.log("  skipped favicon.ico (ImageMagick not available) — PNG/SVG icons suffice");
  }
}

async function main() {
  if (!(await exists(SRC))) {
    console.error(`\n  MISSING: ${SRC}\n  Save the owl logo there (public/owl.png) and re-run.\n`);
    process.exit(1);
  }
  console.log("Generating brand assets from public/owl.png:");
  await sampleColours();
  await icon(16, "favicon-16.png");
  await icon(32, "favicon-32.png");
  await icon(180, "apple-touch-icon.png");
  await faviconSvg();
  await ico();
  await ogCard();
  console.log("Done.");
}

main();
