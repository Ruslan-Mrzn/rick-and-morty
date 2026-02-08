import type { TCharacter, TServerCharacter } from '@/shared/types';

const parseServerCharactersResponse = (
  serverCharacters: TServerCharacter[]
): TCharacter[] => {
  return serverCharacters.map(
    ({ id, gender, image, location, name, status, species }) => {
      return {
        id,
        gender,
        image,
        location: location.name,
        name,
        status: status,
        species
      };
    }
  );
};

export default parseServerCharactersResponse;
