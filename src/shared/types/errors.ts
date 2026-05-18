export type TKnownErrorCode =
  | 'noCharactersFound'
  | 'tooManyRequests'
  | 'server'
  | 'unknown'
  | 'fetchFailed';

export type TErrorCode = TKnownErrorCode | 'serverMessage';

export type TAppError = {
  code: TErrorCode;
  serverMessage?: string;
};
