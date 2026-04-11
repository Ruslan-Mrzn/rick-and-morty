import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';

const isVisualizer = process.env.BUILD_VISUALIZER === 'true';

// Read version from package.json
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const version = pkg.version;
const date = new Date().toISOString().split('T')[0].replace(/-/g, '');

export default defineConfig(() => ({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: false,
        dimensions: true
      },
      include: '**/*.svg?react'
    }),
    ViteImageOptimizer(),
    ...(isVisualizer
      ? [
          visualizer({
            open: true,
            filename: `reports/stats-v${version}-${date}.html`,
            gzipSize: true,
            brotliSize: true
          })
        ]
      : [])
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}));
