import { useCallback, useEffect, useMemo, useRef } from 'react';

import { Toaster } from 'react-hot-toast';

import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { useShallow } from 'zustand/react/shallow';

import { charactersKeys } from '@/api';
import { useCharacters, useErrorToast } from '@/hooks';
import { BigLogo, InfiniteScroll, Loader } from '@/shared/components';
import { LAST_VIEWED_CHARACTER_STORAGE_KEY } from '@/shared/constants';
import type { TCharacter } from '@/shared/types';
import { useCharactersFiltersStore } from '@/stores';
import { FiltersPanel } from '@/widgets';

import { CharactersList } from './components';
import styles from './HomePage.module.scss';
import { updateCharacterInInfiniteCache } from './utils';
import type { TCharactersPage } from './utils/updateCharacterInInfiniteCache';

const HomePage = () => {
  const { filters, page, incrementPage } = useCharactersFiltersStore(
    useShallow((state) => ({
      filters: state.filters,
      page: state.page,
      incrementPage: state.incrementPage
    }))
  );
  const queryClient = useQueryClient();

  const updateCharacterInCache = useCallback(
    (updatedCharacter: TCharacter) => {
      queryClient.setQueryData<InfiniteData<TCharactersPage>>(
        charactersKeys.list(filters),
        (cachedData) =>
          updateCharacterInInfiniteCache(cachedData, updatedCharacter)
      );
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
  const hasRestoredScrollRef = useRef(false);

  useErrorToast(error);

  const tryToFetchCharactersAgain = useCallback(() => {
    void refetchCharacters();
  }, [refetchCharacters]);

  useEffect(() => {
    return () => {
      void queryClient.cancelQueries({
        queryKey: charactersKeys.lists()
      });
    };
  }, [queryClient]);

  useEffect(() => {
    if (hasRestoredScrollRef.current || characters.length === 0) {
      return;
    }

    const lastViewedCharacterId = sessionStorage.getItem(
      LAST_VIEWED_CHARACTER_STORAGE_KEY
    );

    if (!lastViewedCharacterId) {
      return;
    }

    const lastViewedCharacter = document.getElementById(
      `character-form-${lastViewedCharacterId}`
    );

    if (!lastViewedCharacter) {
      return;
    }

    lastViewedCharacter.scrollIntoView({
      block: 'center',
      behavior: 'auto'
    });
    hasRestoredScrollRef.current = true;
    sessionStorage.removeItem(LAST_VIEWED_CHARACTER_STORAGE_KEY);
  }, [characters]);

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
              updateCharacter={updateCharacterInCache}
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
