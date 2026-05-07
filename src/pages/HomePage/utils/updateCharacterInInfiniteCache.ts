import type { InfiniteData } from '@tanstack/react-query';

import type { TCharacter } from '@/shared/types';

export type TCharactersPage = {
  characters: TCharacter[];
  pages: number;
};

const updateCharacterInInfiniteCache = (
  cachedData: InfiniteData<TCharactersPage> | undefined,
  updatedCharacter: TCharacter
): InfiniteData<TCharactersPage> | undefined => {
  if (!cachedData) {
    return cachedData;
  }

  const pageIndex = cachedData.pages.findIndex((pageData) =>
    pageData.characters.some(
      (character) => character.id === updatedCharacter.id
    )
  );

  if (pageIndex === -1) {
    return cachedData;
  }

  const pageData = cachedData.pages[pageIndex];
  const updatedPageData = {
    ...pageData,
    characters: pageData.characters.map((character) =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    )
  };
  const updatedInfinitePages = [...cachedData.pages];

  updatedInfinitePages[pageIndex] = updatedPageData;

  return {
    ...cachedData,
    pages: updatedInfinitePages
  };
};

export default updateCharacterInInfiniteCache;
