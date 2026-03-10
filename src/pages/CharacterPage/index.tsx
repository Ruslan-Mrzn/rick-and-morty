import { useEffect } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';

import { useCharacterById } from '@/hooks';
import { GoBackBtn, Loader } from '@/shared/components';

import styles from './CharacterPage.module.scss';

const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const { character, isLoading, error } = useCharacterById(Number(id));

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className={styles.charPage}>
        <div className={styles.charPage__back}>
          <GoBackBtn />
        </div>
        <div className={styles.charPage__main}>
          <Loader
            size='big'
            text='Loading character card...'
          />
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className={styles.charPage}>
        <div className={styles.charPage__back}>
          <GoBackBtn />
        </div>
        <div className={styles.charPage__main}>
          <p className={styles.charPage__errorText}>
            {error || 'Character not found'}
          </p>
        </div>
        <Toaster position='bottom-right' />
      </div>
    );
  }

  return (
    <div className={styles.charPage}>
      <div className={styles.charPage__back}>
        <GoBackBtn />
      </div>
      <div className={styles.charPage__main}>
        <div className={styles.charPage__charContainer}>
          <img
            src={character.image}
            alt={character.name}
            className={styles.charPage__charImg}
          />
          <h1 className={styles.charPage__name}>{character.name}</h1>
        </div>
        <div className={styles.charPage__info}>
          <h2 className={styles.charPage__infoTitle}>Information</h2>
          <div className={styles.charPage__infoGrid}>
            <div className={styles.charPage__infoItem}>
              <span className={styles.charPage__infoLabel}>Gender</span>
              <span className={styles.charPage__infoValue}>
                {character.gender}
              </span>
            </div>
            <div className={styles.charPage__infoItem}>
              <span className={styles.charPage__infoLabel}>Status</span>
              <span className={styles.charPage__infoValue}>
                {character.status}
              </span>
            </div>
            <div className={styles.charPage__infoItem}>
              <span className={styles.charPage__infoLabel}>Specie</span>
              <span className={styles.charPage__infoValue}>
                {character.species}
              </span>
            </div>
            <div className={styles.charPage__infoItem}>
              <span className={styles.charPage__infoLabel}>Origin</span>
              <span className={styles.charPage__infoValue}>
                {character.origin}
              </span>
            </div>
            <div className={styles.charPage__infoItem}>
              <span className={styles.charPage__infoLabel}>Type</span>
              <span className={styles.charPage__infoValue}>
                {character.type}
              </span>
            </div>
            <div className={styles.charPage__infoItem}>
              <span className={styles.charPage__infoLabel}>Location</span>
              <span className={styles.charPage__infoValue}>
                {character.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
