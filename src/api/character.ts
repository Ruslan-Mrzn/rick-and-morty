import { axios } from '@/shared/helpers';

const characterApi = {
  getAll() {
    return axios.get('/character');
  }
};

export default characterApi;
