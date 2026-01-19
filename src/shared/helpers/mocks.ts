import type { TStatus } from '../types';

const genderOptions = ['female', 'male', 'genderless', 'unknown'];
const statusOptions: TStatus[] = ['alive', 'dead', 'unknown'];
const speciesOptions = [
  'human',
  'alien',
  'humanoid',
  'animal',
  'robot',
  'cronenberg',
  'disease',
  'unknown'
];

export { genderOptions, statusOptions, speciesOptions };
