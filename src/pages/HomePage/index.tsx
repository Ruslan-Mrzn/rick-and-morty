import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { characterApi } from '@/api';
import { BigLogo, Loader } from '@/shared/components';
import type { TCharacter, TServerCharacter } from '@/shared/types';
import { CharacterCard, FiltersPanel } from '@/widgets';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const parseServerCharactersResponse = (
    serverCharacters: TServerCharacter[]
  ): TCharacter[] => {
    return serverCharacters.map(
      ({ id, gender, image, location, name, status, species }) => {
        return {
          id,
          gender,
          image,
          location: location.name,
          name,
          status: status,
          species
        };
      }
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setIsLoading(true);
    const fetchCharacters = async () => {
      try {
        const response = await characterApi.getAll({ signal });

        if (signal.aborted) return;

        const results = response.data.results;

        setCharacters(parseServerCharactersResponse(results));
      } catch (error) {
        Promise.reject(error);
        toast.error('Failed to fetch characters');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();

    return () => {
      abortController.abort();
    };
  }, []);

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
