import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const source = path.join(publicDir, 'icon.svg');

const load = () => sharp(source, { density: 512 });

async function writePng(size, filename, { padding = 0, background = '#ffffff' } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const offset = Math.round((size - inner) / 2);

  const icon = await load().resize(inner, inner).png().toBuffer();

  const image = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background
    }
  }).composite([{ input: icon, top: offset, left: offset }]);

  const out = path.join(publicDir, filename);
  await image.png().toFile(out);
  console.log(`✓ ${filename} (${size}x${size}${padding ? `, padding ${padding * 100}%` : ''})`);
}

async function writeIco(size, filename) {
  const png = await load().resize(size, size).png().toBuffer();

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12);

  const out = path.join(publicDir, filename);
  await fs.writeFile(out, Buffer.concat([header, entry, png]));
  console.log(`✓ ${filename} (${size}x${size})`);
}

await writePng(192, 'pwa-192x192.png');
await writePng(512, 'pwa-512x512.png');
await writePng(512, 'maskable-512x512.png', { padding: 0.1 });
await writePng(180, 'apple-touch-icon.png');
await writeIco(48, 'favicon.ico');

console.log('\nPWA icons generated in /public');
