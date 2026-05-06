import { CHARACTERS_ENDPOINT } from '@/shared/constants';
import { axios } from '@/shared/lib';
import type { TGetCharactersParams } from '@/shared/types';

const getCharacters = ({
  page,
  name,
  status,
  gender,
  species,
  signal
}: TGetCharactersParams = {}) => {
  return axios.get(CHARACTERS_ENDPOINT, {
    params: { page, name, status, gender, species },
    signal,
    timeout: 10000
  });
};

export default getCharacters;
