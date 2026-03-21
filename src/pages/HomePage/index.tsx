import {
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import { Toaster } from 'react-hot-toast';

import { useCharacters, useErrorToast } from '@/hooks';
import { BigLogo, InfiniteScroll, Loader } from '@/shared/components';
import type { TCharacter, TGetCharactersParams } from '@/shared/types';
import { FiltersPanel } from '@/widgets';

import { CharactersList } from './components';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [filters, setFilters] = useState<Omit<TGetCharactersParams, 'page'>>(
    {}
  );
  const [page, setPage] = useState(1);
  const [loadedCharacters, setLoadedCharacters] = useState<TCharacter[]>([]);

  const updateCharacter = useCallback((updatedCharacter: TCharacter) => {
    setLoadedCharacters((prev) =>
      prev.map((char) =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    );
  }, []);

  const setFiltersCallback = useCallback(
    (updates: SetStateAction<Omit<TGetCharactersParams, 'page'>>) => {
      setFilters(updates);
    },
    []
  );

  const params = useMemo(() => ({ ...filters, page }), [filters, page]);
  const { characters, pages, isLoading, error, refetchCharacters } =
    useCharacters(params);

  useErrorToast(error);

  const tryToFetchCharactersAgain = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    await refetchCharacters(signal);
  };

  useEffect(() => {
    setPage(1);
    setLoadedCharacters([]);
  }, [filters]);

  useEffect(() => {
    if (characters.length) {
      setLoadedCharacters((prev) => [...prev, ...characters]);
    }
  }, [characters]);

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
      <div className={styles.homePage__filters}>
        <FiltersPanel setFilters={setFiltersCallback} />
      </div>

      {isLoading && loadedCharacters.length === 0 && (
        <div className={styles.homePage__loader}>
          <Loader
            size='big'
            text='Loading characters...'
          />
        </div>
      )}

      <div className={styles.homePage__charactersList}>
        <InfiniteScroll
          pages={pages}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          error={error}
        >
          {({ lastElementRef }) => (
            <CharactersList
              characters={loadedCharacters}
              lastElementRef={lastElementRef}
              updateCharacter={updateCharacter}
            />
          )}
        </InfiniteScroll>
      </div>

      {isLoading && loadedCharacters.length > 0 && (
        <div className={styles.homePage__loader}>
          <Loader size='small' />
        </div>
      )}

      {!isLoading && error && (
        <div className={styles.homePage__tryAgainContainer}>
          <button
            className={styles.homePage__tryAgain}
            onClick={tryToFetchCharactersAgain}
          >
            Try again
          </button>
        </div>
      )}

      <Toaster position='bottom-right' />
    </div>
  );
};

export default HomePage;
