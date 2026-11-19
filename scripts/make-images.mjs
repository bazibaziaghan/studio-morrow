/**
 * Generates the site's atmospheric placeholder imagery: textured, softly lit
 * abstract still lifes in the studio palette. Replace the files in
 * public/images with real photography whenever it is ready (same names).
 *
 *   npm run images
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = new URL('../public/images/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const C = {
  oxblood: '#6e1c20',
  wine: '#4a1216',
  brown: '#52402a',
  umber: '#2b2118',
  cream: '#ede8e1',
  amber: '#d9a25b',
  ink: '#120d0a',
};

/** Paper/stone grain laid over everything. */
const grain = (seed, opacity = 0.35, freq = 0.9) => `
  <filter id="g${seed}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="3" seed="${seed}" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="table" tableValues="0 ${opacity}"/></feComponentTransfer>
  </filter>`;

/** Large, soft plaster texture. */
const plaster = (seed) => `
  <filter id="p${seed}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006" numOctaves="4" seed="${seed}"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="table" tableValues="0 0.55"/></feComponentTransfer>
  </filter>`;

const blur = (id, s) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${s}"/></filter>`;

function scene({ w, h, seed, base, glow, shapes, beam = true }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    ${grain(seed)}${plaster(seed)}${blur('b1', Math.round(w / 40))}${blur('b2', Math.round(w / 12))}
    <radialGradient id="light" cx="${glow[0]}" cy="${glow[1]}" r="0.75">
      <stop offset="0" stop-color="${C.amber}" stop-opacity="0.55"/>
      <stop offset="0.45" stop-color="${C.amber}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${C.ink}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.ink}" stop-opacity="0.15"/>
      <stop offset="1" stop-color="${C.ink}" stop-opacity="0.65"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="${base}"/>
  <rect width="100%" height="100%" filter="url(#p${seed})" fill="#f3e6d2" opacity="0.26"/>
  <rect width="100%" height="100%" fill="url(#light)"/>
  ${beam ? `<polygon points="${w * 0.15},0 ${w * 0.42},0 ${w * 0.95},${h} ${w * 0.6},${h}" fill="${C.amber}" opacity="0.10" filter="url(#b2)"/>` : ''}
  ${shapes}
  <rect width="100%" height="100%" fill="url(#vignette)"/>
  <rect width="100%" height="100%" filter="url(#g${seed})"/>
</svg>`;
}

/** A lacquered box seen from above, like a presentation case. */
const box = (x, y, w, h, rot, color) => `
  <g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
    <rect x="${x + w * 0.04}" y="${y + h * 0.06}" width="${w}" height="${h}" fill="${C.ink}" opacity="0.55" filter="url(#b1)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>
    <rect x="${x + w * 0.05}" y="${y + h * 0.05}" width="${w * 0.9}" height="${h * 0.9}" fill="none" stroke="#000" stroke-opacity="0.25" stroke-width="${w * 0.006}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h * 0.5}" fill="#fff" opacity="0.06"/>
  </g>`;

/** A tall glass vessel catching the light. */
const vessel = (x, y, w, h) => `
  <rect x="${x + w * 0.1}" y="${y + h * 0.04}" width="${w}" height="${h}" fill="${C.ink}" opacity="0.5" filter="url(#b1)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.08}" fill="${C.brown}" opacity="0.9"/>
  <rect x="${x + w * 0.12}" y="${y + h * 0.05}" width="${w * 0.14}" height="${h * 0.9}" fill="${C.amber}" opacity="0.35"/>
  <rect x="${x + w * 0.3}" y="${y - h * 0.14}" width="${w * 0.4}" height="${h * 0.16}" fill="${C.umber}"/>
  <rect x="${x + w * 0.34}" y="${y - h * 0.14}" width="${w * 0.06}" height="${h * 0.16}" fill="${C.amber}" opacity="0.4"/>`;

const arch = (x, y, w, h, color) => `
  <path d="M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z" fill="${color}"/>
  <path d="M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z" fill="#fff" opacity="0.05"/>`;

const orb = (cx, cy, r, color) => `
  <circle cx="${cx + r * 0.15}" cy="${cy + r * 0.2}" r="${r}" fill="${C.ink}" opacity="0.5" filter="url(#b1)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>
  <circle cx="${cx - r * 0.35}" cy="${cy - r * 0.35}" r="${r * 0.35}" fill="#fff" opacity="0.12" filter="url(#b1)"/>`;

const fabric = (w, h, color, seed) => `
  <filter id="f${seed}"><feTurbulence type="turbulence" baseFrequency="0.002 0.012" numOctaves="2" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="${w * 0.12}"/></filter>
  <g filter="url(#f${seed})">${Array.from({ length: 14 }, (_, i) => `<rect x="${-w * 0.1}" y="${(i / 14) * h}" width="${w * 1.2}" height="${h / 22}" fill="${i % 2 ? color : C.wine}" opacity="${0.35 + (i % 3) * 0.15}"/>`).join('')}</g>`;

const images = {
  // Hero: two lacquered cases on a stone surface, raking light.
  'hero.webp': scene({
    w: 2400, h: 1500, seed: 3, base: '#3a2e25', glow: [0.72, 0.2],
    shapes: box(1050, 260, 1050, 760, -14, C.oxblood) + box(820, 820, 980, 560, 8, C.wine) + vessel(1640, 980, 120, 380) + vessel(1820, 1010, 110, 350),
  }),
  // Wide feature panel: a single vessel in a dark room.
  'feature.webp': scene({
    w: 2400, h: 1300, seed: 7, base: C.umber, glow: [0.5, 0.45], beam: false,
    shapes: arch(980, 160, 440, 1140, '#3b1418') + vessel(1110, 620, 180, 520),
  }),
  // Split panel: deep fabric folds.
  'commission.webp': scene({
    w: 1600, h: 1400, seed: 11, base: C.wine, glow: [0.3, 0.3], beam: false,
    shapes: fabric(1600, 1400, C.oxblood, 11) + box(560, 420, 520, 520, 6, C.brown),
  }),
  // Landscape 5:4: a doorway, a case and a vessel on the studio table.
  'studio.webp': scene({
    w: 2000, h: 1600, seed: 13, base: '#5a4733', glow: [0.2, 0.15],
    shapes: arch(300, 330, 560, 1270, '#3a2a1c') + box(980, 820, 640, 480, -5, C.oxblood) + vessel(1700, 860, 130, 420) + orb(760, 1400, 120, C.wine),
  }),
  'work-1.webp': scene({ w: 1200, h: 1500, seed: 21, base: C.oxblood, glow: [0.7, 0.2], shapes: vessel(470, 520, 260, 760) }),
  'work-2.webp': scene({ w: 1200, h: 1500, seed: 22, base: '#3d3024', glow: [0.3, 0.25], shapes: box(260, 380, 700, 840, -9, C.oxblood) }),
  'work-3.webp': scene({ w: 1200, h: 1500, seed: 23, base: C.umber, glow: [0.5, 0.35], beam: false, shapes: orb(600, 760, 300, C.wine) + orb(820, 1080, 120, C.brown) }),
  'work-4.webp': scene({ w: 1200, h: 1500, seed: 24, base: '#6b5640', glow: [0.2, 0.2], shapes: arch(330, 300, 540, 1200, C.oxblood) }),
  'work-5.webp': scene({ w: 1200, h: 1500, seed: 25, base: C.wine, glow: [0.8, 0.3], beam: false, shapes: fabric(1200, 1500, C.oxblood, 25) }),
  'work-6.webp': scene({ w: 1200, h: 1500, seed: 26, base: '#2f251c', glow: [0.6, 0.15], shapes: box(200, 560, 520, 520, 12, C.brown) + vessel(760, 600, 200, 620) }),
  'work-7.webp': scene({ w: 1200, h: 1500, seed: 27, base: '#4a3a2a', glow: [0.35, 0.2], beam: false, shapes: arch(250, 420, 360, 1080, C.wine) + arch(650, 620, 300, 880, C.oxblood) }),
  'work-8.webp': scene({ w: 1200, h: 1500, seed: 28, base: C.oxblood, glow: [0.25, 0.25], shapes: orb(420, 640, 200, C.brown) + vessel(700, 560, 220, 700) }),
};

// `npm run images -- work-7.webp` regenerates just the named files.
const only = process.argv.slice(2);
for (const [name, svg] of Object.entries(images)) {
  if (only.length && !only.includes(name)) continue;
  await sharp(Buffer.from(svg)).webp({ quality: 70 }).toFile(new URL(name, OUT).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
  console.log('made', name);
}

// Social preview image
if (only.length) process.exit(0);
const og = scene({ w: 1200, h: 630, seed: 31, base: '#3a2e25', glow: [0.7, 0.2], shapes: box(560, 90, 520, 380, -12, C.oxblood) });
await sharp(Buffer.from(og.replace('</svg>', `<text x="80" y="330" font-family="Georgia, serif" font-size="96" font-weight="300" fill="${C.cream}">Morrow</text><text x="84" y="390" font-family="Arial, sans-serif" font-size="22" letter-spacing="6" fill="${C.cream}" fill-opacity="0.8">BRAND &amp; CONTENT STUDIO</text></svg>`)))
  .png()
  .toFile(new URL('../public/og.png', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
console.log('made og.png');
