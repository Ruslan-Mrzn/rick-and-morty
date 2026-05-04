import { useQuery } from '@tanstack/react-query';

import { charactersKeys, getCharacter } from '@/api';
import { characterAdapter } from '@/pages';
import { getErrorMessage } from '@/shared/helpers';

const useCharacter = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: charactersKeys.detail(id),
    queryFn: async ({ signal }) => {
      const response = await getCharacter(id, signal);

      return characterAdapter(response.data);
    }
  });

  return {
    character: data ?? null,
    isLoading,
    error: error ? getErrorMessage(error) : null
  };
};

export default useCharacter;
