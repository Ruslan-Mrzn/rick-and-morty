import { apiConstants } from '@/shared/constants';
import { axios } from '@/shared/helpers';

export type TGetAllProps = {
  page?: number;
  name?: string;
  signal?: AbortSignal;
};

const getCharacters = ({ page, name, signal }: TGetAllProps = {}) => {
  return axios.get(apiConstants.CHARACTERS_ENDPOINT, {
    params: { page, name },
    signal,
    timeout: 10000
  });
};

export default getCharacters;
