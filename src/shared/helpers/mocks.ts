import mockCardImage from '../../assets/images/card-image.jpg';
import type { TCharacter, TStatus } from '../types';

const genderOptions = ['female', 'male', 'genderless', 'unknown'];
const statusOptions: TStatus[] = ['Alive', 'Dead', 'unknown'];
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
  status: 'Alive',
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
