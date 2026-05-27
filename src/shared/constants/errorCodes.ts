import type { TErrorCode } from '@/shared/types';

export const ERROR_CODE = {
  NO_CHARACTERS_FOUND: 'noCharactersFound',
  TOO_MANY_REQUESTS: 'tooManyRequests',
  SERVER: 'server',
  UNKNOWN: 'unknown',
  FETCH_FAILED: 'fetchFailed',
  SERVER_MESSAGE: 'serverMessage'
} as const satisfies Record<string, TErrorCode>;

export const SILENT_ERROR_CODES: readonly TErrorCode[] = [
  ERROR_CODE.NO_CHARACTERS_FOUND
];
