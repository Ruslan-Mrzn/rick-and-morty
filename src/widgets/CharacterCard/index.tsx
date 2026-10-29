import { memo, useState } from 'react';

import { EditIcon } from '@/assets/icons';
import { CharacterForm } from '@/shared/components';
import type { TCharacter } from '@/shared/types';
import { useFavoritesStore } from '@/stores';

import styles from './CharacterCard.module.scss';

type TCharacterCardProps = TCharacter & {
  onUpdateCharacter: (_character: TCharacter) => void;
};

const CharacterCard = memo(
  ({ onUpdateCharacter, ...character }: TCharacterCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const isFavorite = useFavoritesStore((state) =>
      state.favorites.some((favorite) => favorite.id === character.id)
    );
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

    return (
      <div className={styles.characterCard}>
        <div className={styles.characterCard__imgContainer}>
          <img
            className={styles.characterCard__img}
            src={character.image}
            alt={character.name}
          />
        </div>
        <div className={styles.characterCard__formContainer}>
          <CharacterForm
            data={character}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            onUpdateCharacter={onUpdateCharacter}
            isFavorite={isFavorite}
            onToggleFavorite={() => toggleFavorite(character)}
          />
        </div>
        {!isEditing && (
          <div
            className={styles.characterCard__edit}
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </div>
        )}
      </div>
    );
  }
);

export default CharacterCard;
