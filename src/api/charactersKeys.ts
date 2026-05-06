import type { TCharactersFilters } from '@/shared/types';

export const charactersKeys = {
  all: ['characters'] as const,

  lists: () => [...charactersKeys.all, 'list'] as const,

  list: (params: TCharactersFilters) =>
    [
      ...charactersKeys.lists(),
      {
        name: params.name,
        status: params.status,
        gender: params.gender,
        species: params.species
      }
    ] as const,

  details: () => [...charactersKeys.all, 'detail'] as const,

  detail: (id: number) => [...charactersKeys.details(), id] as const
};
