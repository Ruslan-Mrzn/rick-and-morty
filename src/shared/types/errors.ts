export type TKnownErrorCode =
  | 'noCharactersFound'
  | 'tooManyRequests'
  | 'server'
  | 'unknown'
  | 'fetchFailed';

export type TErrorCode = TKnownErrorCode | 'serverMessage';

export type TAppError = {
  code: TErrorCode;
  /** Только для `serverMessage` — текст с API, не переводится */
  serverMessage?: string;
};
