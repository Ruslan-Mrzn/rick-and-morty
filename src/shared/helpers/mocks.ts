import mockCardImage from '../../assets/images/card-image.jpg';
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

export { genderOptions, statusOptions, speciesOptions, mockCardImage };
