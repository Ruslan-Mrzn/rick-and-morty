import { expect, test } from '@playwright/test';

import {
  storyUrl,
  type TStoryTheme,
  waitForStory
} from '@/shared/testing/storybookVisual';

const stories: { id: string; theme: TStoryTheme }[] = [
  { id: 'shared-selector--light', theme: 'light' },
  { id: 'shared-selector--dark', theme: 'dark' }
];

test.describe('Selector', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  for (const { id, theme } of stories) {
    test(id, async ({ page }) => {
      await page.goto(storyUrl(id), { waitUntil: 'load' });
      await waitForStory(page, theme);
      await expect(page.locator('#storybook-root')).toHaveScreenshot();
    });
  }
});
