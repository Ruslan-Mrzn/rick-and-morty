import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

import { getCharacters } from '@/api';
import type { TGetAllProps } from '@/api/getCharacters';
import { charactersAdapter } from '@/pages/HomePage/utils';
import { NO_CHARACTERS_FOUND } from '@/shared/constants/errorTextConstants';
import type { TCharacter } from '@/shared/types';

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

const useCharacters = (params: TGetAllProps = {}) => {
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
          if (signal?.aborted) {
            throw new DOMException('Aborted', 'AbortError');
          }

          const response = await getCharacters({ ...params, signal });
          const results = response.data.results;
          const availablePagesCount = response.data.info.pages;
          const parsedCharacters = charactersAdapter(results);

          if (!signal?.aborted) {
            setState({
              characters: parsedCharacters,
              pages: availablePagesCount,
              isLoading: false,
              error: null
            });
          }

          return;
        } catch (error) {
          if (
            axios.isCancel(error) ||
            (error instanceof DOMException && error.name === 'AbortError')
          ) {
            throw error;
          }

          if (axios.isAxiosError(error) && error.response?.status === 404) {
            if (!signal?.aborted) {
              setState((prev) => ({
                ...prev,
                isLoading: false,
                error: NO_CHARACTERS_FOUND
              }));
            }

            throw error;
          }

          if (attempt >= RETRY_CONFIG.maxRetries) {
            if (!signal?.aborted) {
              let errorMessage = 'Failed to fetch characters';

              if (axios.isAxiosError(error)) {
                errorMessage =
                  error.response?.data?.error || error.message || errorMessage;
              } else if (error instanceof Error) {
                errorMessage = error.message;
              }

              setState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMessage
              }));
            }

            throw error;
          }

          const delay = RETRY_CONFIG.baseDelay * Math.pow(2, attempt - 1);

          await new Promise((resolve) => setTimeout(resolve, delay));

          if (signal?.aborted) {
            throw new DOMException('Aborted', 'AbortError');
          }
        }
      }
    },
    [params]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchCharacters(signal).catch((error) => {
      if (
        !axios.isCancel(error) &&
        !(error instanceof DOMException && error.name === 'AbortError')
      ) {
        // eslint-disable-next-line no-console
        console.error('Fetch characters failed:', error);
      }
    });

    return () => controller.abort();
  }, [fetchCharacters]);

  return {
    ...state,
    refetchCharacters: fetchCharacters
  };
};

export default useCharacters;
