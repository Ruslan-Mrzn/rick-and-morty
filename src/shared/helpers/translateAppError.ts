import { ERROR_CODE } from '@/shared/constants';
import type { TAppError, TKnownErrorCode, TTranslate } from '@/shared/types';

const KNOWN_ERROR_MESSAGES = {
  [ERROR_CODE.NO_CHARACTERS_FOUND]: (t: TTranslate) =>
    t((s) => s.errors.noCharactersFound),
  [ERROR_CODE.TOO_MANY_REQUESTS]: (t: TTranslate) =>
    t((s) => s.errors.tooManyRequests),
  [ERROR_CODE.SERVER]: (t: TTranslate) => t((s) => s.errors.server),
  [ERROR_CODE.UNKNOWN]: (t: TTranslate) => t((s) => s.errors.unknown),
  [ERROR_CODE.FETCH_FAILED]: (t: TTranslate) => t((s) => s.errors.fetchFailed)
} satisfies Record<TKnownErrorCode, (_t: TTranslate) => string>;

const translateKnownError = (code: TKnownErrorCode, t: TTranslate): string =>
  KNOWN_ERROR_MESSAGES[code](t);

export const translateAppError = (error: TAppError, t: TTranslate): string => {
  if (error.code === ERROR_CODE.SERVER_MESSAGE) {
    return error.serverMessage ?? translateKnownError(ERROR_CODE.UNKNOWN, t);
  }

  return translateKnownError(error.code, t);
};

export default translateAppError;
