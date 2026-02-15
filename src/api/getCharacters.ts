import { apiConstants } from '@/shared/constants';
import { axios } from '@/shared/helpers';
import type { TGender, TSpecies, TStatus } from '@/shared/types';

export type TGetAllProps = {
  page?: number;
  name?: string;
  status?: Lowercase<TStatus>;
  gender?: Lowercase<TGender>;
  species?: Lowercase<TSpecies>;
  signal?: AbortSignal;
};

const getCharacters = ({
  page,
  name,
  status,
  gender,
  species,
  signal
}: TGetAllProps = {}) => {
  return axios.get(apiConstants.CHARACTERS_ENDPOINT, {
    params: { page, name, status, gender, species },
    signal,
    timeout: 10000
  });
};

export default getCharacters;
