import { ERROR_CODE } from '@/shared/constants';
import i18n from '@/shared/lib/i18n';
import type { TAppError, TKnownErrorCode } from '@/shared/types';

const assertNever = (unhandledCode: never): never => {
  throw new Error(`Unhandled error code: ${unhandledCode}`);
};

const translateKnownError = (code: TKnownErrorCode): string => {
  switch (code) {
    case ERROR_CODE.NO_CHARACTERS_FOUND:
      return i18n.t(($) => $.errors.noCharactersFound);
    case ERROR_CODE.TOO_MANY_REQUESTS:
      return i18n.t(($) => $.errors.tooManyRequests);
    case ERROR_CODE.SERVER:
      return i18n.t(($) => $.errors.server);
    case ERROR_CODE.UNKNOWN:
      return i18n.t(($) => $.errors.unknown);
    case ERROR_CODE.FETCH_FAILED:
      return i18n.t(($) => $.errors.fetchFailed);
    default:
      return assertNever(code);
  }
};

export const translateAppError = (error: TAppError): string => {
  if (error.code === ERROR_CODE.SERVER_MESSAGE) {
    return error.serverMessage ?? translateKnownError(ERROR_CODE.UNKNOWN);
  }

  return translateKnownError(error.code);
};

export default translateAppError;
