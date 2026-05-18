import parseAppError from './parseAppError';
import translateAppError from './translateAppError';

const getErrorMessage = (error: unknown): string =>
  translateAppError(parseAppError(error));

export default getErrorMessage;
