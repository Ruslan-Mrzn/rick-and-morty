import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import svgr from 'vite-plugin-svgr';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../src/widgets/**/index.stories.@(ts|tsx)',
    '../src/shared/components/**/index.stories.@(ts|tsx)',
    '!../src/pages/**',
    '!../src/app/**'
  ],
  addons: [],
  framework: '@storybook/react-vite',
  async viteFinal(viteConfig) {
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@': path.resolve(dirname, '../src'),
      '@sb': path.resolve(dirname, '.')
    };

    viteConfig.plugins = [
      ...(viteConfig.plugins ?? []),
      svgr({
        svgrOptions: {
          icon: false,
          dimensions: true
        },
        include: '**/*.svg?react'
      })
    ];

    return viteConfig;
  }
};

export default config;
