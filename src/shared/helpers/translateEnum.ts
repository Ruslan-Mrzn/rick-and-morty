import type {
  TCharacter,
  TGender,
  TSpecies,
  TStatus,
  TTranslate
} from '@/shared/types';

export const translateGender = (
  t: TTranslate,
  value: TGender | 'all'
): string =>
  value === 'all' ? t((s) => s.enums.all) : t((s) => s.enums.gender[value]);

export const translateSpecies = (
  t: TTranslate,
  value: TSpecies | 'all'
): string =>
  value === 'all' ? t((s) => s.enums.all) : t((s) => s.enums.species[value]);

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
      return translateSpecies(t, character.species);
    default: {
      const value = character[key];

      return value !== undefined ? String(value) : '';
    }
  }
};
