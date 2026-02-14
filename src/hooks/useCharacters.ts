import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import { getCharacters } from '@/api';
import type { TGetAllProps } from '@/api/getCharacters';
import { charactersAdapter } from '@/pages/HomePage/utils';
import type { TCharacter } from '@/shared/types';

interface IUseCharactersState {
  characters: TCharacter[];
  isLoading: boolean;
  error: string | null;
}

const useCharacters = () => {
  const [state, setState] = useState<IUseCharactersState>({
    characters: [],
    isLoading: true,
    error: null
  });

  const fetchCharacters = useCallback(async (params: TGetAllProps) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    const { signal } = params;

    try {
      const response = await getCharacters({ ...params, signal });
      const results = response.data.results;
      const parsedCharacters = charactersAdapter(results);

      if (!signal?.aborted) {
        setState({
          characters: parsedCharacters,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      if (signal?.aborted) return;

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          'Failed to fetch characters';

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage
        }));

        return Promise.reject(error);
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));

      return Promise.reject(error);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    (async () => {
      try {
        await fetchCharacters({ signal });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [fetchCharacters]);

  return {
    ...state,
    refetchCharacters: (params: TGetAllProps) => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      return fetchCharacters({ ...params, signal });
    }
  };
};

export default useCharacters;
