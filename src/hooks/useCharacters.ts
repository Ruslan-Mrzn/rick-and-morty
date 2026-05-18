import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { charactersKeys, getCharacters } from '@/api';
import { charactersAdapter } from '@/pages';
import { parseAppError } from '@/shared/helpers';
import type { TGetCharactersParams } from '@/shared/types';

const DEFAULT_QUERY_PARAMS: TGetCharactersParams = {};

const useCharacters = (params: TGetCharactersParams = DEFAULT_QUERY_PARAMS) => {
  const listFilters = {
    name: params.name,
    status: params.status,
    gender: params.gender,
    species: params.species
  };
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: charactersKeys.list(listFilters),
    initialPageParam: 1,
    queryFn: async ({ signal, pageParam }) => {
      const response = await getCharacters({
        ...listFilters,
        page: pageParam,
        signal
      });
      const results = response.data.results;
      const availablePagesCount = response.data.info.pages;
      const parsedCharacters = charactersAdapter(results);

      return {
        characters: parsedCharacters,
        pages: availablePagesCount
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      return nextPage <= lastPage.pages ? nextPage : undefined;
    }
  });

  useEffect(() => {
    const requestedPage = params.page ?? 1;
    const loadedPages = data?.pages.length ?? 0;

    if (
      requestedPage > loadedPages &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isLoading
    ) {
      void fetchNextPage();
    }
  }, [
    params.page,
    data?.pages.length,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage
  ]);

  const allCharacters =
    data?.pages.flatMap((pageData) => pageData.characters) ?? [];
  const availablePagesCount = data?.pages[0]?.pages ?? 0;

  return {
    characters: allCharacters,
    pages: availablePagesCount,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error: error ? parseAppError(error) : null,
    refetchCharacters: () => refetch()
  };
};

export default useCharacters;
