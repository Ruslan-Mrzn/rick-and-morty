import type { TGetCharactersParams } from '@/shared/types';

export type TCharactersListKeyParams = Omit<TGetCharactersParams, 'signal'>;

export const charactersKeys = {
  all: ['characters'] as const,

  lists: () => [...charactersKeys.all, 'list'] as const,

  list: (params: TCharactersListKeyParams) =>
    [...charactersKeys.lists(), params] as const,

  details: () => [...charactersKeys.all, 'detail'] as const,

  detail: (id: number) => [...charactersKeys.details(), id] as const
};
