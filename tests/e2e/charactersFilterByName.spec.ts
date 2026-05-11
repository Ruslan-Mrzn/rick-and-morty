import { charactersByNameHunterResponseMock } from './fixtures/charactersByNameHunterResponse.mock';
import { expect, test } from './fixtures/charactersListApi.fixture';
import { charactersListResponseMock } from './fixtures/charactersListResponse.mock';

test('filters characters by name after initial list load', async ({ page }) => {
  await page.goto('/');

  const defaultExpectedNames = charactersListResponseMock.results.map(
    (character) => character.name
  );
  const charactersList = page
    .locator('ul')
    .filter({ has: page.locator('form[id^="character-form-"]') })
    .first();
  const characterLinks = charactersList.getByRole('link').filter({
    hasText: /.+/
  });

  await expect(characterLinks).toHaveCount(defaultExpectedNames.length);
  await expect(characterLinks).toHaveText(defaultExpectedNames);

  const nameFilterInput = page.locator('input[name="nameFilter"]');

  await nameFilterInput.fill('hunter');
  const hunterRequestPromise = page.waitForRequest((request) => {
    const requestUrl = request.url();

    return (
      requestUrl.startsWith('https://rickandmortyapi.com/api/character') &&
      requestUrl.includes('name=hunter')
    );
  });

  await nameFilterInput.press('Enter');
  await hunterRequestPromise;

  const filteredExpectedNames = charactersByNameHunterResponseMock.results.map(
    (character) => character.name
  );

  await expect(characterLinks).toHaveCount(filteredExpectedNames.length);
  await expect(characterLinks).toHaveText(filteredExpectedNames);
});
