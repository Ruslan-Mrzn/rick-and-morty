import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

const isVisualizer = process.env.BUILD_VISUALIZER === 'true';

// Read version from package.json
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const version = pkg.version;
const date = new Date().toISOString().split('T')[0].replace(/-/g, '');

const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig(() => ({
  base,
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
    VitePWA({
      registerType: 'autoUpdate',
      includeManifestIcons: false,
      workbox: {
        globPatterns: ['**/*.{html,css,js,svg,png,ico,woff2}'],
        navigateFallback: `${base}index.html`,
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/rickandmortyapi\.com\/api\/character\/avatar\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'rm-avatars',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/rickandmortyapi\.com\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'rm-api',
              networkTimeoutSeconds: 10,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      manifest: {
        name: 'Rick & Morty',
        short_name: 'R&M',
        description:
          'Каталог персонажей вселенной Рика и Морти с фильтрами и оффлайн-доступом',
        lang: 'ru',
        theme_color: '#146391',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshots/desktop.png',
            sizes: '1280x800',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: 'screenshots/mobile.png',
            sizes: '390x844',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ]
      },
      devOptions: { enabled: true }
    }),
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
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    passWithNoTests: true
  }
}));
