import { expect, type Page } from '@playwright/test';

export type TStoryTheme = 'light' | 'dark';

export const storyUrl = (id: string): string =>
  `/iframe.html?id=${id}&viewMode=story`;

export const waitForStory = async (
  page: Page,
  theme: TStoryTheme
): Promise<void> => {
  await page.waitForLoadState('load');
  await page.evaluate(() => document.fonts.ready);

  const root = page.locator('#storybook-root');

  await expect(root).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
};
