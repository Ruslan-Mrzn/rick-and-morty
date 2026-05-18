import type { TFunction } from 'i18next';

import { ERROR_CODE } from '@/shared/constants';
import type { TAppError, TKnownErrorCode } from '@/shared/types';

type TTranslate = TFunction<'translation'>;

const assertNever = (unhandledCode: never): never => {
  throw new Error(`Unhandled error code: ${unhandledCode}`);
};

const translateKnownError = (code: TKnownErrorCode, t: TTranslate): string => {
  switch (code) {
    case ERROR_CODE.NO_CHARACTERS_FOUND:
      return t(($) => $.errors.noCharactersFound);
    case ERROR_CODE.TOO_MANY_REQUESTS:
      return t(($) => $.errors.tooManyRequests);
    case ERROR_CODE.SERVER:
      return t(($) => $.errors.server);
    case ERROR_CODE.UNKNOWN:
      return t(($) => $.errors.unknown);
    case ERROR_CODE.FETCH_FAILED:
      return t(($) => $.errors.fetchFailed);
    default:
      return assertNever(code);
  }
};

export const translateAppError = (error: TAppError, t: TTranslate): string => {
  if (error.code === ERROR_CODE.SERVER_MESSAGE) {
    return error.serverMessage ?? translateKnownError(ERROR_CODE.UNKNOWN, t);
  }

  return translateKnownError(error.code, t);
};

export default translateAppError;
