import mockCardImage from '../../assets/images/card-image.jpg';
import type { TCharacter, TStatus } from '../types';

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

const mockCharacter: TCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'alive',
  species: 'Human',
  gender: 'Male',
  location: 'Citadel of Ricks',
  image: mockCardImage
};

export {
  genderOptions,
  statusOptions,
  speciesOptions,
  mockCardImage,
  mockCharacter
};
