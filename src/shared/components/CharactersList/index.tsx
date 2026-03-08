import { memo } from 'react';

import type { TCharacter } from '@/shared/types';
import { CharacterCard } from '@/widgets';

import styles from './CharactersList.module.scss';

interface CharactersListProps {
  characters: TCharacter[];
  lastElementRef?: (_node: Element | null) => void;
  updateCharacter: (_character: TCharacter) => void;
}

const CharactersList = memo(
  ({ characters, lastElementRef, updateCharacter }: CharactersListProps) => {
    return (
      <ul className={styles.charactersList}>
        {characters.map((character, index) => {
          const isLast = index === characters.length - 1;

          return (
            <li
              key={character.id}
              ref={isLast ? lastElementRef : null}
            >
              <CharacterCard
                {...character}
                onUpdateCharacter={updateCharacter}
              />
            </li>
          );
        })}
      </ul>
    );
  }
);

export default CharactersList;
