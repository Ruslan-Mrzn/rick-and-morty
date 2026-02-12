import mockCardImage from '../../assets/images/card-image.jpg';
import type { TCharacter, TGender, TSpecies, TStatus } from '../types';

const genderOptions: TGender[] = ['Female', 'Male', 'Genderless', 'unknown'];
const statusOptions: TStatus[] = ['Alive', 'Dead', 'unknown'];
const speciesOptions: TSpecies[] = [
  'Human',
  'Alien',
  'Humanoid',
  'Animal',
  'Robot',
  'Cronenberg',
  'Disease',
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
