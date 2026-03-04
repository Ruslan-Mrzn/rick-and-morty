import { useCallback, useEffect, useState } from 'react';

import axios, { HttpStatusCode } from 'axios';

import { getCharacters } from '@/api';
import { charactersAdapter } from '@/pages/HomePage/utils';
import { getErrorMessage } from '@/shared/helpers';
import type { TCharacter, TGetCharactersProps } from '@/shared/types';

interface IUseCharactersState {
  characters: TCharacter[];
  pages: number;
  isLoading: boolean;
  error: string | null;
}

const RETRY_CONFIG = {
  maxRetries: 5,
  baseDelay: 1000
};

const useCharacters = (params: TGetCharactersProps = {}) => {
  const [state, setState] = useState<IUseCharactersState>({
    characters: [],
    pages: 0,
    isLoading: true,
    error: null
  });

  const fetchCharacters = useCallback(
    async (signal?: AbortSignal) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      let attempt = 0;

      while (attempt < RETRY_CONFIG.maxRetries) {
        attempt++;
        try {
          if (signal?.aborted) return;

          const response = await getCharacters({ ...params, signal });

          if (signal?.aborted) return;

          const results = response.data.results;
          const availablePagesCount = response.data.info.pages;
          const parsedCharacters = charactersAdapter(results);

          setState({
            characters: parsedCharacters,
            pages: availablePagesCount,
            isLoading: false,
            error: null
          });

          return;
        } catch (error) {
          if (axios.isCancel(error)) return;

          if (
            axios.isAxiosError(error) &&
            error.response?.status === HttpStatusCode.NotFound
          ) {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error: getErrorMessage(error)
            }));

            return;
          }

          if (attempt >= RETRY_CONFIG.maxRetries) {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error: getErrorMessage(error)
            }));

            return;
          }

          const delay = RETRY_CONFIG.baseDelay * Math.pow(2, attempt - 1);

          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
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
