import {
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import toast, { Toaster } from 'react-hot-toast';

import useCharacters from '@/hooks/useCharacters';

import { BigLogo, InfiniteScroll, Loader } from '@/shared/components';
import { CharactersList } from '@/shared/components';
import type { TGetCharactersProps } from '@/shared/types';
import type { TCharacter } from '@/shared/types';
import { FiltersPanel } from '@/widgets';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const [filters, setFilters] = useState<Omit<TGetCharactersProps, 'page'>>({});
  const [page, setPage] = useState(1);
  const [loadedCharacters, setLoadedCharacters] = useState<TCharacter[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const updateCharacter = useCallback((updatedCharacter: TCharacter) => {
    setLoadedCharacters((prev) =>
      prev.map((char) =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    );
  }, []);

  const setFiltersCallback = useCallback(
    (updates: SetStateAction<Omit<TGetCharactersProps, 'page'>>) => {
      setFilters(updates);
    },
    []
  );

  const params = useMemo(() => ({ ...filters, page }), [filters, page]);
  const { characters, pages, isLoading, error, refetchCharacters } =
    useCharacters(params);

  const tryToFetchCharactersAgain = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    await refetchCharacters(signal);
  };

  useEffect(() => {
    setPage(1);
    setIsInitialLoad(true);
    setLoadedCharacters([]);
  }, [filters]);

  useEffect(() => {
    if (characters.length > 0) {
      setIsInitialLoad(false);
    }
  }, [characters]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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

      {isLoading && isInitialLoad && (
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

      {isLoading && !isInitialLoad && (
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
