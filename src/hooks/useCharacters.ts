import { useCallback, useEffect, useState } from 'react';

import { getCharacters } from '@/api';
import { charactersAdapter } from '@/pages';
import { fetchWithRetry } from '@/shared/helpers';
import type { TCharacter, TGetCharactersParams } from '@/shared/types';

const DEFAULT_QUERY_PARAMS: TGetCharactersParams = {};

type TUseCharactersState = {
  characters: TCharacter[];
  pages: number;
  isLoading: boolean;
  error: string | null;
};

const useCharacters = (params: TGetCharactersParams = DEFAULT_QUERY_PARAMS) => {
  const [state, setState] = useState<TUseCharactersState>({
    characters: [],
    pages: 0,
    isLoading: true,
    error: null
  });

  const fetchCharacters = useCallback(
    async (signal?: AbortSignal) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetchWithRetry({
        requestFn: () => getCharacters({ ...params, signal }),
        signal,
        onError: (error) => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error
          }));
        },
        onSuccess: (response) => {
          const results = response.data.results;
          const availablePagesCount = response.data.info.pages;
          const parsedCharacters = charactersAdapter(results);

          setState({
            characters: parsedCharacters,
            pages: availablePagesCount,
            isLoading: false,
            error: null
          });
        }
      });

      return response;
    },
    [params]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchCharacters(signal);

    return () => controller.abort();
  }, [fetchCharacters]);

  return {
    ...state,
    refetchCharacters: fetchCharacters
  };
};

export default useCharacters;
