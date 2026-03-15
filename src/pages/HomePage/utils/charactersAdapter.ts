import type {
  TCharacter,
  TGender,
  TServerCharacter,
  TSpecies,
  TStatus
} from '@/shared/types';

const charactersAdapter = (
  serverCharacters: TServerCharacter[]
): TCharacter[] => {
  return serverCharacters.map(
    ({ id, gender, image, location, name, status, species, origin, type }) => {
      return {
        id,
        gender: gender.toLowerCase() as TGender,
        image,
        location: location.name,
        name,
        status: status.toLowerCase() as TStatus,
        species: species.toLowerCase() as TSpecies,
        origin: origin.name,
        type
      };
    }
  );
};

export default charactersAdapter;
