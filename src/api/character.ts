import { axios } from '@/shared/helpers';

type TGetAllProps = {
  page?: number;
  name?: string;
  signal?: AbortSignal;
};

const characterApi = {
  getAll({ page, name, signal }: TGetAllProps = {}) {
    return axios.get('/character', {
      params: { page, name },
      signal
    });
  }
};

export default characterApi;
