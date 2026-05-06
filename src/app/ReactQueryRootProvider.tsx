import type { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { appQueryClient } from './appQueryClient';

export const ReactQueryRootProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={appQueryClient}>
    {children}
    {import.meta.env.DEV ? (
      <ReactQueryDevtools
        buttonPosition='bottom-left'
        initialIsOpen={false}
      />
    ) : null}
  </QueryClientProvider>
);
