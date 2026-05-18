import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { useAppErrorMessage, useCharacter, useErrorToast } from '@/hooks';
import { GoBackBtn, Loader } from '@/shared/components';
import { formatCharacterFieldValue } from '@/shared/helpers';
import type { TCharacter } from '@/shared/types';

import styles from './CharacterPage.module.scss';

const CHARACTER_FIELD_KEYS = [
  'gender',
  'status',
  'species',
  'origin',
  'type',
  'location'
] as const satisfies readonly (keyof TCharacter)[];

const CharacterPage = () => {
  const { t } = useTranslation();
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
            text={t((s) => s.common.loadingCharacter)}
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
              <h2 className={styles.charPage__infoTitle}>
                {t((s) => s.characterPage.information)}
              </h2>
              <dl className={styles.charPage__infoGrid}>
                {CHARACTER_FIELD_KEYS.map((key) => (
                  <div
                    key={key}
                    className={styles.charPage__infoItem}
                  >
                    <dt className={styles.charPage__infoLabel}>
                      {t((s) => s.characterPage.fields[key])}
                    </dt>
                    <dd className={styles.charPage__infoValue}>
                      {formatCharacterFieldValue(t, key, character)}
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
