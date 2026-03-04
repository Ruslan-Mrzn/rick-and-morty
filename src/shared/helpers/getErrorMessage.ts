import axios, { HttpStatusCode } from 'axios';

import {
  DEFAULT_FETCH_ERROR,
  NO_CHARACTERS_FOUND_ERROR,
  SERVER_ERROR,
  TOO_MANY_REQUESTS_ERROR,
  UNKNOWN_ERROR
} from '@/shared/constants';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.error;

    if (status === HttpStatusCode.NotFound) {
      return NO_CHARACTERS_FOUND_ERROR;
    }

    if (serverMessage && typeof serverMessage === 'string') {
      return serverMessage;
    }

    switch (status) {
      case HttpStatusCode.TooManyRequests:
        return TOO_MANY_REQUESTS_ERROR;
      case HttpStatusCode.InternalServerError:
      case HttpStatusCode.BadGateway:
      case HttpStatusCode.ServiceUnavailable:
      case HttpStatusCode.GatewayTimeout:
        return SERVER_ERROR;
      default:
        return error.message || DEFAULT_FETCH_ERROR;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return UNKNOWN_ERROR;
};

export default getErrorMessage;
