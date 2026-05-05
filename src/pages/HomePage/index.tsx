import { useCallback, useMemo } from 'react';

import { Toaster } from 'react-hot-toast';

import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { useShallow } from 'zustand/react/shallow';

import { charactersKeys } from '@/api';
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
  const queryClient = useQueryClient();

  const updateCharacter = useCallback(
    (updatedCharacter: TCharacter) => {
      queryClient.setQueryData<
        InfiniteData<{ characters: TCharacter[]; pages: number }>
      >(charactersKeys.list(filters), (cachedData) => {
        if (!cachedData) {
          return cachedData;
        }

        return {
          ...cachedData,
          pages: cachedData.pages.map((pageData) => ({
            ...pageData,
            characters: pageData.characters.map((character) =>
              character.id === updatedCharacter.id
                ? updatedCharacter
                : character
            )
          }))
        };
      });
    },
    [filters, queryClient]
  );

  const params = useMemo(() => ({ ...filters, page }), [filters, page]);
  const {
    characters,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    refetchCharacters
  } = useCharacters(params);

  useErrorToast(error);

  const tryToFetchCharactersAgain = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    await refetchCharacters(signal);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
      <div className={styles.homePage__filters}>
        <FiltersPanel />
      </div>

      {isLoading && characters.length === 0 && (
        <div className={styles.homePage__loader}>
          <Loader
            size='big'
            text='Loading characters...'
          />
        </div>
      )}

      <div className={styles.homePage__charactersList}>
        <InfiniteScroll
          incrementPage={incrementPage}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          error={error}
        >
          {({ lastElementRef }) => (
            <CharactersList
              characters={characters}
              lastElementRef={lastElementRef}
              updateCharacter={updateCharacter}
            />
          )}
        </InfiniteScroll>
      </div>

      {isFetchingNextPage && characters.length > 0 && (
        <div className={styles.homePage__loader}>
          <Loader size='small' />
        </div>
      )}

      {!isLoading && !isFetchingNextPage && error && (
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
