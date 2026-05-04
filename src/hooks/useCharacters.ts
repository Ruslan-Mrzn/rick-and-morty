import { useQuery } from '@tanstack/react-query';

import { charactersKeys, getCharacters } from '@/api';
import { charactersAdapter } from '@/pages';
import { getErrorMessage } from '@/shared/helpers';
import type { TGetCharactersParams } from '@/shared/types';

const DEFAULT_QUERY_PARAMS: TGetCharactersParams = {};

const useCharacters = (params: TGetCharactersParams = DEFAULT_QUERY_PARAMS) => {
  const queryKeyParams = {
    page: params.page,
    name: params.name,
    status: params.status,
    gender: params.gender,
    species: params.species
  };
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: charactersKeys.list(queryKeyParams),
    queryFn: async ({ signal }) => {
      const response = await getCharacters({ ...queryKeyParams, signal });
      const results = response.data.results;
      const availablePagesCount = response.data.info.pages;
      const parsedCharacters = charactersAdapter(results);

      return {
        characters: parsedCharacters,
        pages: availablePagesCount
      };
    }
  });

  return {
    characters: data?.characters ?? [],
    pages: data?.pages ?? 0,
    isLoading,
    error: error ? getErrorMessage(error) : null,
    refetchCharacters: async (signal?: AbortSignal) => {
      void signal;

      return refetch();
    }
  };
};

export default useCharacters;
