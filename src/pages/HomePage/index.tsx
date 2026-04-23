import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition
} from 'react';

import { Toaster } from 'react-hot-toast';

import { useShallow } from 'zustand/react/shallow';

import { useCharacters, useErrorToast } from '@/hooks';
import { BigLogo, InfiniteScroll, Loader } from '@/shared/components';
import type { TCharacter } from '@/shared/types';
import { useCharactersFiltersStore } from '@/stores';
import { FiltersPanel } from '@/widgets';

import { CharactersList } from './components';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { filters, page, incrementPage } = useCharactersFiltersStore(
    useShallow((state) => ({
      filters: state.filters,
      page: state.page,
      incrementPage: state.incrementPage
    }))
  );
  const [loadedCharacters, setLoadedCharacters] = useState<TCharacter[]>([]);
  const [isPending, startTransition] = useTransition();

  const updateCharacter = useCallback((updatedCharacter: TCharacter) => {
    setLoadedCharacters((prev) =>
      prev.map((char) =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    );
  }, []);

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
    startTransition(() => {
      setLoadedCharacters([]);
    });
  }, [filters]);

  useEffect(() => {
    if (characters.length) {
      startTransition(() => {
        setLoadedCharacters((prev) => [...prev, ...characters]);
      });
    }
  }, [characters]);

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
      <div className={styles.homePage__filters}>
        <FiltersPanel />
      </div>

      {(isLoading || isPending) && loadedCharacters.length === 0 && (
        <div className={styles.homePage__loader}>
          <Loader
            size='big'
            text='Loading characters...'
          />
        </div>
      )}

      <div className={styles.homePage__charactersList}>
        <InfiniteScroll
          currentPage={page}
          incrementPage={incrementPage}
          pages={pages}
          isLoading={isLoading}
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

      {(isLoading || isPending) && loadedCharacters.length > 0 && (
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
