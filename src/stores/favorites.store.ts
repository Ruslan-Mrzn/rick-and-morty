import { create } from 'zustand';

import { FAVORITES_STORAGE_KEY } from '@/shared/constants';
import type { TCharacter } from '@/shared/types';

type TFavoritesStore = {
  favorites: TCharacter[];
  toggleFavorite: (character: TCharacter) => void;
  removeFavorite: (id: number) => void;
  updateFavorite: (character: TCharacter) => void;
};

const isCharacter = (value: unknown): value is TCharacter => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const character = value as Record<string, unknown>;

  return (
    typeof character.id === 'number' &&
    typeof character.name === 'string' &&
    typeof character.status === 'string' &&
    typeof character.species === 'string' &&
    typeof character.speciesLabel === 'string' &&
    typeof character.image === 'string' &&
    typeof character.gender === 'string' &&
    typeof character.location === 'string' &&
    typeof character.origin === 'string' &&
    (character.type === undefined || typeof character.type === 'string')
  );
};

const readStoredFavorites = (): TCharacter[] => {
  try {
    const storedValue = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isCharacter);
  } catch {
    return [];
  }
};

const persistFavorites = (favorites: TCharacter[]): void => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    return;
  }
};

const toggleInFavorites = (
  favorites: TCharacter[],
  character: TCharacter
): TCharacter[] =>
  favorites.some((favorite) => favorite.id === character.id)
    ? favorites.filter((favorite) => favorite.id !== character.id)
    : [...favorites, character];

export const useFavoritesStore = create<TFavoritesStore>((set) => ({
  favorites: readStoredFavorites(),
  toggleFavorite: (character) =>
    set((state) => ({
      favorites: toggleInFavorites(state.favorites, character)
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((favorite) => favorite.id !== id)
    })),
  updateFavorite: (character) =>
    set((state) => {
      if (!state.favorites.some((favorite) => favorite.id === character.id)) {
        return {};
      }

      return {
        favorites: state.favorites.map((favorite) =>
          favorite.id === character.id ? character : favorite
        )
      };
    })
}));

useFavoritesStore.subscribe((state) => persistFavorites(state.favorites));
