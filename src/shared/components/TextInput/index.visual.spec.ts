import { expect, test } from '@playwright/test';

import {
  storyUrl,
  type TStoryTheme,
  waitForStory
} from '@/shared/testing/storybookVisual';

const stories: { id: string; theme: TStoryTheme }[] = [
  { id: 'shared-textinput--bordered-light', theme: 'light' },
  { id: 'shared-textinput--bordered-dark', theme: 'dark' },
  { id: 'shared-textinput--underlined-light', theme: 'light' },
  { id: 'shared-textinput--underlined-dark', theme: 'dark' }
];

test.describe('TextInput', () => {
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
