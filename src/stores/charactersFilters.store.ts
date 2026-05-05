import { create } from 'zustand';

import type { TCharactersFilters } from '@/shared/types';

type TCharactersFiltersStore = {
  filters: TCharactersFilters;
  nameInput: string;
  page: number;
  setFilter: <K extends keyof TCharactersFilters>(
    _field: K,
    _value: TCharactersFilters[K]
  ) => void;
  setNameInput: (_value: string) => void;
  applyNameFilter: () => void;
  incrementPage: () => void;
};

export const useCharactersFiltersStore = create<TCharactersFiltersStore>(
  (set) => ({
    filters: {},
    nameInput: '',
    page: 1,
    setFilter: (field, value) =>
      set((state) => ({
        filters: { ...state.filters, [field]: value },
        page: 1
      })),
    setNameInput: (value) => set({ nameInput: value }),
    applyNameFilter: () =>
      set((state) => ({
        filters: {
          ...state.filters,
          name: state.nameInput.toLowerCase().trim() || undefined
        },
        page: 1
      })),
    incrementPage: () => set((state) => ({ page: state.page + 1 }))
  })
);
