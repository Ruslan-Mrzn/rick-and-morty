import { create } from 'zustand';

import type { TGetCharactersParams } from '@/shared/types';

type TCharactersFilters = Omit<TGetCharactersParams, 'page' | 'signal'>;

type TCharactersFiltersStore = {
  filters: TCharactersFilters;
  nameInput: string;
  page: number;
  setFilter: (
    _field: keyof TCharactersFilters,
    _value: TCharactersFilters[keyof TCharactersFilters]
  ) => void;
  setNameFilter: (_value: string) => void;
  incrementPage: () => void;
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
    page: 1,
    setFilter: (field, value) =>
      set((state) => ({
        filters: { ...state.filters, [field]: value },
        page: 1
      })),
    setNameFilter: (value) =>
      set((state) => ({
        nameInput: value,
        filters: {
          ...state.filters,
          name: value.toLowerCase() || undefined
        },
        page: 1
      })),
    incrementPage: () => set((state) => ({ page: state.page + 1 }))
  })
);
