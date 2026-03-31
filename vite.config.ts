import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => ({
  // eslint-disable-next-line no-undef
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
    ViteImageOptimizer()
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src')
    }
  }
}));
