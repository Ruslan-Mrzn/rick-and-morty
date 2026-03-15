import { useCallback, useEffect, useState } from 'react';

import { getCharacter } from '@/api';
import { characterAdapter } from '@/pages';
import { fetchWithRetry } from '@/shared/helpers';
import type { TCharacter } from '@/shared/types';

type TUseCharacterState = {
  character: TCharacter | null;
  isLoading: boolean;
  error: string | null;
};

const useCharacter = (id: number) => {
  const [state, setState] = useState<TUseCharacterState>({
    character: null,
    isLoading: true,
    error: null
  });

  const fetchCharacter = useCallback(
    async (signal?: AbortSignal) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetchWithRetry({
        requestFn: () => getCharacter(id, signal),
        signal,
        onError: (error) => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error
          }));
        },
        onSuccess: (response) => {
          const parsedCharacter = characterAdapter(response.data);

          setState({
            character: parsedCharacter,
            isLoading: false,
            error: null
          });
        }
      });

      return response;
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

export default useCharacter;
