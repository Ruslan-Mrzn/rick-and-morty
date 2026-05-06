import { CancelledError, QueryClient } from '@tanstack/react-query';

import axios, { HttpStatusCode } from 'axios';

const STALE_TIME_MS = 300_000;
const GC_TIME_MS = 300_000;
const RETRY_QUERY_DELAY_MS = 5_000;
const RETRY_QUERY_ATTEMPTS = 4;

const shouldRetryQuery = (failureCount: number, error: unknown): boolean => {
  if (error instanceof CancelledError || axios.isCancel(error)) {
    return false;
  }

  if (
    axios.isAxiosError(error) &&
    error.response?.status === HttpStatusCode.NotFound
  ) {
    return false;
  }

  return failureCount < RETRY_QUERY_ATTEMPTS;
};

export const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      gcTime: GC_TIME_MS,
      retry: shouldRetryQuery,
      retryDelay: RETRY_QUERY_DELAY_MS,
      refetchOnWindowFocus: false
    }
  }
});
