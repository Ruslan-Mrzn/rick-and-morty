import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';

import { useAppErrorMessage, useCharacter, useErrorToast } from '@/hooks';
import { GoBackBtn, Loader } from '@/shared/components';
import type { TCharacter } from '@/shared/types';

import styles from './CharacterPage.module.scss';

const CHARACTER_FIELDS: { key: keyof TCharacter; label: string }[] = [
  { key: 'gender', label: 'Gender' },
  { key: 'status', label: 'Status' },
  { key: 'species', label: 'Specie' },
  { key: 'origin', label: 'Origin' },
  { key: 'type', label: 'Type' },
  { key: 'location', label: 'Location' }
];

const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const { character, isLoading, error } = useCharacter(Number(id));
  const errorMessage = useAppErrorMessage(error);

  useErrorToast(error);

  return (
    <div className={styles.charPage}>
      <div className={styles.charPage__back}>
        <GoBackBtn />
      </div>
      <div className={styles.charPage__main}>
        {isLoading && (
          <Loader
            size='big'
            text='Loading character card...'
          />
        )}
        {errorMessage && (
          <p className={styles.charPage__errorText}>{errorMessage}</p>
        )}
        {character && (
          <>
            <div className={styles.charPage__charContainer}>
              <img
                src={character.image}
                alt={character.name}
                className={styles.charPage__charImg}
              />
              <h1 className={styles.charPage__name}>{character.name}</h1>
            </div>
            <section className={styles.charPage__info}>
              <h2 className={styles.charPage__infoTitle}>Information</h2>
              <dl className={styles.charPage__infoGrid}>
                {CHARACTER_FIELDS.map(({ key, label }) => (
                  <div
                    key={key}
                    className={styles.charPage__infoItem}
                  >
                    <dt className={styles.charPage__infoLabel}>{label}</dt>
                    <dd className={styles.charPage__infoValue}>
                      {character[key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </>
        )}
      </div>
      <Toaster position='bottom-right' />
    </div>
  );
};

export default CharacterPage;
