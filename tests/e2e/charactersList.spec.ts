import { expect, test } from './fixtures/charactersListApi.fixture';
import { charactersListResponseMock } from './fixtures/charactersListResponse.mock';

test('displays five characters from default mock on page visit', async ({
  page
}) => {
  await page.goto('/');

  const expectedNames = charactersListResponseMock.results.map(
    (character) => character.name
  );

  const charactersList = page
    .locator('ul')
    .filter({ has: page.locator('form[id^="character-form-"]') })
    .first();
  const characterLinks = charactersList.getByRole('link').filter({
    hasText: /.+/
  });

  await expect(characterLinks).toHaveCount(expectedNames.length);

  const actualNames = await characterLinks.allTextContents();

  expect(actualNames.map((name) => name.trim())).toEqual(expectedNames);
});
