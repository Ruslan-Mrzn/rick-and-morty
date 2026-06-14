import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  testMatch: [
    '**/shared/components/**/*.visual.spec.ts',
    '**/widgets/**/*.visual.spec.ts'
  ],
  snapshotPathTemplate: '{testDir}/{testFileDir}/__screenshots__/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: Number(process.env.CI) ? 2 : 0,
  workers: Number(process.env.CI) ? 1 : undefined,
  reporter: 'html',

  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixelRatio: 0.01
    }
  },

  use: {
    baseURL: 'http://127.0.0.1:6006',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    locale: 'en-US',
    timezoneId: 'UTC',
    colorScheme: 'no-preference',
    trace: 'on-first-retry'
  },

  webServer: {
    command: 'npm run storybook -- --ci',
    url: 'http://127.0.0.1:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
