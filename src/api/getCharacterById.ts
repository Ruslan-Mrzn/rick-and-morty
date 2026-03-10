import { CHARACTERS_ENDPOINT } from '@/shared/constants';
import { axios } from '@/shared/helpers';
import type { TServerCharacter } from '@/shared/types';

const getCharacterById = (id: number, signal?: AbortSignal) => {
  return axios.get<TServerCharacter>(`${CHARACTERS_ENDPOINT}/${id}`, {
    signal,
    timeout: 10000
  });
};

export default getCharacterById;
