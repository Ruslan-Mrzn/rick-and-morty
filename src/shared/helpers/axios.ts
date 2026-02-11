import axios from 'axios';

import { BASE_URL } from '@/shared/constants/apiConstants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
