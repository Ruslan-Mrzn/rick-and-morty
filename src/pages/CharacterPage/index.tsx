import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';

import { useCharacterById, useErrorToast } from '@/hooks';
import { GoBackBtn, Loader } from '@/shared/components';

import styles from './CharacterPage.module.scss';

const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const { character, isLoading, error } = useCharacterById(Number(id));

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
        {error && <p className={styles.charPage__errorText}>{error}</p>}
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
                {[
                  { label: 'Gender', value: character.gender },
                  { label: 'Status', value: character.status },
                  { label: 'Specie', value: character.species },
                  { label: 'Origin', value: character.origin },
                  { label: 'Type', value: character.type },
                  { label: 'Location', value: character.location }
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className={styles.charPage__infoItem}
                  >
                    <dt className={styles.charPage__infoLabel}>{label}</dt>
                    <dd className={styles.charPage__infoValue}>{value}</dd>
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
