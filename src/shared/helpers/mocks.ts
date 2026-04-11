import type { TGender, TSpecies, TStatus } from '../types';

const genderOptions: TGender[] = ['female', 'male', 'genderless', 'unknown'];
const statusOptions: TStatus[] = ['alive', 'dead', 'unknown'];
const speciesOptions: TSpecies[] = [
  'human',
  'alien',
  'humanoid',
  'animal',
  'robot',
  'cronenberg',
  'disease',
  'unknown'
];

const genderOptionsWithAll: (TGender | 'all')[] = ['all', ...genderOptions];
const statusOptionsWithAll: (TStatus | 'all')[] = ['all', ...statusOptions];
const speciesOptionsWithAll: (TSpecies | 'all')[] = ['all', ...speciesOptions];

export {
  genderOptions,
  statusOptions,
  speciesOptions,
  genderOptionsWithAll,
  statusOptionsWithAll,
  speciesOptionsWithAll
};
