import axios, { HttpStatusCode } from 'axios';

import { getErrorMessage } from '@/shared/helpers';

export type TRetryConfig = {
  maxRetries: number;
  baseDelay: number;
};

export type TRetryOptions<T> = {
  requestFn: () => Promise<T>;
  retryConfig?: TRetryConfig;
  signal?: AbortSignal;
  onError?: (_error: string) => void;
  onSuccess?: (_data: T) => void;
};

const DEFAULT_RETRY_CONFIG: TRetryConfig = {
  maxRetries: 5,
  baseDelay: 5000
};

export const fetchWithRetry = async <T>({
  requestFn,
  retryConfig = DEFAULT_RETRY_CONFIG,
  signal,
  onError,
  onSuccess
}: TRetryOptions<T>): Promise<T | null> => {
  const { maxRetries, baseDelay } = retryConfig;
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    try {
      if (signal?.aborted) {
        return null;
      }

      const response = await requestFn();

      if (signal?.aborted) {
        return null;
      }

      onSuccess?.(response);

      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        return null;
      }

      if (
        axios.isAxiosError(error) &&
        error.response?.status === HttpStatusCode.NotFound
      ) {
        const errorMessage = getErrorMessage(error);

        onError?.(errorMessage);

        return null;
      }

      if (attempt >= maxRetries) {
        const errorMessage = getErrorMessage(error);

        onError?.(errorMessage);

        return null;
      }

      await new Promise((resolve) => setTimeout(resolve, baseDelay));
    }
  }

  return null;
};
