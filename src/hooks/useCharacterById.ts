import { useCallback, useEffect, useState } from 'react';

import axios, { HttpStatusCode } from 'axios';

import { getCharacterById } from '@/api';
import { characterAdapter } from '@/pages/CharacterPage/utils';
import { getErrorMessage } from '@/shared/helpers';
import type { TCharacter } from '@/shared/types';

interface IUseCharacterByIdState {
  character: TCharacter | null;
  isLoading: boolean;
  error: string | null;
}

const RETRY_CONFIG = {
  maxRetries: 5,
  baseDelay: 1000
};

const useCharacterById = (id: number) => {
  const [state, setState] = useState<IUseCharacterByIdState>({
    character: null,
    isLoading: true,
    error: null
  });

  const fetchCharacter = useCallback(
    async (signal?: AbortSignal) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      let attempt = 0;

      while (attempt < RETRY_CONFIG.maxRetries) {
        attempt++;
        try {
          if (signal?.aborted) return;

          const response = await getCharacterById(id, signal);

          if (signal?.aborted) return;

          const parsedCharacter = characterAdapter(response.data);

          setState({
            character: parsedCharacter,
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
    [id]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchCharacter(signal);

    return () => controller.abort();
  }, [fetchCharacter]);

  return {
    ...state
  };
};

export default useCharacterById;
