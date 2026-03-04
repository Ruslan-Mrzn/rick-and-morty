import type { TCharacter } from '@/shared/types';
import { CharacterCard } from '@/widgets';

import styles from './CharactersList.module.scss';

interface CharactersListProps {
  characters: TCharacter[];
  lastElementRef?: (_node: Element | null) => void;
}

const CharactersList = ({
  characters,
  lastElementRef
}: CharactersListProps) => {
  return (
    <ul className={styles.charactersList}>
      {characters.map((character, index) => {
        const isLast = index === characters.length - 1;

        return (
          <li
            key={character.id}
            ref={isLast ? lastElementRef : null}
          >
            <CharacterCard {...character} />
          </li>
        );
      })}
    </ul>
  );
};

export default CharactersList;
