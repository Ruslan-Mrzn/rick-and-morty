import type {
  TCharacter,
  TGender,
  TServerCharacter,
  TSpecies,
  TStatus
} from '@/shared/types';

const characterAdapter = (serverCharacter: TServerCharacter): TCharacter => {
  return {
    id: serverCharacter.id,
    gender: serverCharacter.gender.toLowerCase() as TGender,
    image: serverCharacter.image,
    location: serverCharacter.location.name,
    name: serverCharacter.name,
    status: serverCharacter.status.toLowerCase() as TStatus,
    species: serverCharacter.species.toLowerCase() as TSpecies,
    origin: serverCharacter.origin.name,
    type: serverCharacter.type || 'unknown'
  };
};

export default characterAdapter;
