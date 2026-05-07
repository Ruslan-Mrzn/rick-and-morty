import type { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { appQueryClient } from './appQueryClient';

const isDev = import.meta.env.DEV;

export const ReactQueryRootProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={appQueryClient}>
    {children}
    {isDev ? (
      <ReactQueryDevtools
        buttonPosition='bottom-left'
        initialIsOpen={false}
      />
    ) : null}
  </QueryClientProvider>
);
