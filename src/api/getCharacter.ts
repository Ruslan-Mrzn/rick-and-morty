import { CHARACTERS_ENDPOINT } from '@/shared/constants';
import { axios } from '@/shared/lib';
import type { TServerCharacter } from '@/shared/types';

const getCharacter = (id: number, signal?: AbortSignal) => {
  return axios.get<TServerCharacter>(`${CHARACTERS_ENDPOINT}/${id}`, {
    signal,
    timeout: 10000
  });
};

export default getCharacter;
