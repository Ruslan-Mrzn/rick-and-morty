import { memo } from 'react';

import type { TCharacter } from '@/shared/types';
import { CharacterCard } from '@/widgets';

import styles from './CharactersList.module.scss';

interface CharactersListProps {
  characters: TCharacter[];
  updateCharacter: (_character: TCharacter) => void;
  lastElementRef?: (_node: Element | null) => void;
}

const CharactersList = memo(
  ({ characters, updateCharacter, lastElementRef }: CharactersListProps) => {
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
