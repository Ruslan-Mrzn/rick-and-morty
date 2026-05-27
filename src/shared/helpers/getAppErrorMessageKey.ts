import { ERROR_CODE } from '@/shared/constants';
import type { TKnownErrorCode } from '@/shared/types';

type TErrorTranslationKey = `errors.${TKnownErrorCode}`;

const APP_ERROR_MESSAGE_KEYS = {
  [ERROR_CODE.NO_CHARACTERS_FOUND]: 'errors.noCharactersFound',
  [ERROR_CODE.TOO_MANY_REQUESTS]: 'errors.tooManyRequests',
  [ERROR_CODE.SERVER]: 'errors.server',
  [ERROR_CODE.UNKNOWN]: 'errors.unknown',
  [ERROR_CODE.FETCH_FAILED]: 'errors.fetchFailed'
} as const satisfies Record<TKnownErrorCode, TErrorTranslationKey>;

export const getAppErrorMessageKey = (
  code: TKnownErrorCode
): TErrorTranslationKey => APP_ERROR_MESSAGE_KEYS[code];

export default getAppErrorMessageKey;
