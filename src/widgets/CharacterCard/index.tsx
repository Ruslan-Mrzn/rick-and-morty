import { memo, useState } from 'react';

import { MemoizedEditIcon as EditIcon } from '@/assets/icons';
import { CharacterForm } from '@/shared/components';
import type { TCharacter } from '@/shared/types';

import styles from './CharacterCard.module.scss';

interface CharacterCardProps extends TCharacter {
  onUpdateCharacter: (_character: TCharacter) => void;
}

const CharacterCard = memo(
  ({ onUpdateCharacter, ...character }: CharacterCardProps) => {
    const [imgAlt, setImgAlt] = useState(character.name);
    const [isEditing, setIsEditing] = useState(false);

    return (
      <div className={styles.characterCard}>
        <div className={styles.characterCard__imgContainer}>
          <img
            className={styles.characterCard__img}
            src={character.image}
            alt={imgAlt}
          />
        </div>
        <div className={styles.characterCard__formContainer}>
          <CharacterForm
            data={character}
            changeImgAlt={setImgAlt}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            onUpdateCharacter={onUpdateCharacter}
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
