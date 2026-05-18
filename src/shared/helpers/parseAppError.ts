import axios, { HttpStatusCode } from 'axios';

import { ERROR_CODE } from '@/shared/constants';
import type { TAppError } from '@/shared/types';

const parseAppError = (error: unknown): TAppError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.error;

    if (status === HttpStatusCode.NotFound) {
      return { code: ERROR_CODE.NO_CHARACTERS_FOUND };
    }

    if (serverMessage && typeof serverMessage === 'string') {
      return {
        code: ERROR_CODE.SERVER_MESSAGE,
        serverMessage
      };
    }

    switch (status) {
      case HttpStatusCode.TooManyRequests:
        return { code: ERROR_CODE.TOO_MANY_REQUESTS };
      case HttpStatusCode.InternalServerError:
      case HttpStatusCode.BadGateway:
      case HttpStatusCode.ServiceUnavailable:
      case HttpStatusCode.GatewayTimeout:
        return { code: ERROR_CODE.SERVER };
      default:
        return { code: ERROR_CODE.FETCH_FAILED };
    }
  }

  return { code: ERROR_CODE.UNKNOWN };
};

export default parseAppError;
