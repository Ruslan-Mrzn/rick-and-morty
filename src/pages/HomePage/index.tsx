import { useEffect } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import useCharacters from '@/hooks/useCharacters';

import { BigLogo, Loader } from '@/shared/components';
import { CharacterCard, FiltersPanel } from '@/widgets';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const { characters, isLoading, error } = useCharacters();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
      <div className={styles.homePage__filters}>
        <FiltersPanel />
      </div>
      <div className={styles.homePage__loader}>
        {isLoading && (
          <Loader
            size='big'
            text='Loading characters...'
          />
        )}
      </div>

      <ul className={styles.homePage__charactersList}>
        {characters?.map((character) => (
          <li key={character.id}>
            <CharacterCard {...character} />
          </li>
        ))}
      </ul>
      <Toaster position='bottom-right' />
    </div>
  );
};

export default HomePage;
