import { test as base, expect } from '@playwright/test';

import { charactersByNameHunterResponseMock } from './charactersByNameHunterResponse.mock';
import { charactersListResponseMock } from './charactersListResponse.mock';

const CHARACTERS_LIST_REQUEST_URL =
  'https://rickandmortyapi.com/api/character**';

type CharactersApiFixtures = {
  mockCharactersListApi: void;
};

export const test = base.extend<CharactersApiFixtures>({
  mockCharactersListApi: [
    async ({ page }, use) => {
      await page.route(CHARACTERS_LIST_REQUEST_URL, async (route) => {
        const requestUrl = new URL(route.request().url());
        const nameFilter = requestUrl.searchParams.get('name')?.toLowerCase();

        if (nameFilter === 'hunter') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(charactersByNameHunterResponseMock)
          });

          return;
        }

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(charactersListResponseMock)
        });
      });

      await use();

      await page.unroute(CHARACTERS_LIST_REQUEST_URL);
    },
    { auto: true }
  ]
});

export { expect };
