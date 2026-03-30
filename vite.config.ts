import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/rick-and-morty/' : '/',
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: false,
        dimensions: true
      },
      include: '**/*.svg?react'
    })
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src')
    }
  }
}));
