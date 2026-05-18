import type {
  TCharacter,
  TGender,
  TSpecies,
  TStatus,
  TTranslate
} from '@/shared/types';

import { speciesOptions } from './mocks';

const isKnownSpecies = (value: string): value is TSpecies =>
  (speciesOptions as readonly string[]).includes(value);

export const translateGender = (
  t: TTranslate,
  value: TGender | 'all'
): string =>
  value === 'all' ? t((s) => s.enums.all) : t((s) => s.enums.gender[value]);

export const translateSpecies = (
  t: TTranslate,
  value: TSpecies | 'all',
  apiLabel?: string
): string => {
  if (value === 'all') {
    return t((s) => s.enums.all);
  }

  if (isKnownSpecies(value)) {
    return t((s) => s.enums.species[value]);
  }

  return apiLabel ?? value;
};

export const translateStatus = (
  t: TTranslate,
  value: TStatus | 'all'
): string =>
  value === 'all' ? t((s) => s.enums.all) : t((s) => s.enums.status[value]);

export const formatCharacterFieldValue = (
  t: TTranslate,
  key: keyof TCharacter,
  character: TCharacter
): string => {
  switch (key) {
    case 'gender':
      return translateGender(t, character.gender);
    case 'status':
      return translateStatus(t, character.status);
    case 'species':
      return translateSpecies(t, character.species, character.speciesLabel);
    default: {
      const value = character[key];

      return value !== undefined ? String(value) : '';
    }
  }
};
