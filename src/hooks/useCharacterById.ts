import { useCallback, useEffect, useState } from 'react';

import { getCharacterById } from '@/api';
import { characterAdapter } from '@/pages/CharacterPage/utils';
import { fetchWithRetry } from '@/shared/helpers';
import type { TCharacter } from '@/shared/types';

interface IUseCharacterByIdState {
  character: TCharacter | null;
  isLoading: boolean;
  error: string | null;
}

const useCharacterById = (id: number) => {
  const [state, setState] = useState<IUseCharacterByIdState>({
    character: null,
    isLoading: true,
    error: null
  });

  const fetchCharacter = useCallback(
    async (signal?: AbortSignal) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetchWithRetry({
        requestFn: () => getCharacterById(id, signal),
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

export default useCharacterById;
