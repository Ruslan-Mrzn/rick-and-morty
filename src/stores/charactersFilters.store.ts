import { create } from 'zustand';

import type { TGetCharactersParams } from '@/shared/types';

type TCharactersFilters = Omit<TGetCharactersParams, 'page' | 'signal'>;

type TCharactersFiltersStore = {
  filters: TCharactersFilters;
  nameInput: string;
  setFilter: (
    _field: keyof TCharactersFilters,
    _value: TCharactersFilters[keyof TCharactersFilters]
  ) => void;
  setNameFilter: (_value: string) => void;
};

const INITIAL_FILTERS: TCharactersFilters = {
  gender: undefined,
  status: undefined,
  species: undefined,
  name: undefined
};

export const useCharactersFiltersStore = create<TCharactersFiltersStore>(
  (set) => ({
    filters: INITIAL_FILTERS,
    nameInput: '',
    setFilter: (field, value) =>
      set((state) => ({
        filters: { ...state.filters, [field]: value }
      })),
    setNameFilter: (value) =>
      set((state) => ({
        nameInput: value,
        filters: {
          ...state.filters,
          name: value.toLowerCase() || undefined
        }
      }))
  })
);
