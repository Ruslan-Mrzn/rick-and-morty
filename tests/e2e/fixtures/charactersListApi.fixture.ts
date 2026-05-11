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

        const body =
          nameFilter === 'hunter'
            ? JSON.stringify(charactersByNameHunterResponseMock)
            : JSON.stringify(charactersListResponseMock);

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body
        });
      });

      await use();

      await page.unroute(CHARACTERS_LIST_REQUEST_URL);
    },
    { auto: true }
  ]
});

export { expect };
