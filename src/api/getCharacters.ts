import { CHARACTERS_ENDPOINT } from '@/shared/constants';
import { axios } from '@/shared/helpers';
import type { TGetCharactersProps } from '@/shared/types';

const getCharacters = ({
  page,
  name,
  status,
  gender,
  species,
  signal
}: TGetCharactersProps = {}) => {
  return axios.get(CHARACTERS_ENDPOINT, {
    params: { page, name, status, gender, species },
    signal,
    timeout: 10000
  });
};

export default getCharacters;
