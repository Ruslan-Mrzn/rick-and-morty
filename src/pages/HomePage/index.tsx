import { useEffect, useMemo, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import useCharacters from '@/hooks/useCharacters';

import type { TGetAllProps } from '@/api/getCharacters';
import { BigLogo, InfiniteScroll, Loader } from '@/shared/components';
import { NO_CHARACTERS_FOUND } from '@/shared/constants/errorTextConstants';
import type { TCharacter } from '@/shared/types';
import { CharacterCard, FiltersPanel } from '@/widgets';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const [filters, setFilters] = useState<Omit<TGetAllProps, 'page'>>({});
  const [page, setPage] = useState(1);
  const [loadedCharacters, setLoadedCharacters] = useState<TCharacter[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasError, setHasError] = useState(false);

  const params = useMemo(() => ({ ...filters, page }), [filters, page]);
  const { characters, pages, isLoading, error, refetchCharacters } =
    useCharacters(params);

  const tryToFetchCharactersAgain = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setHasError(false);
    await refetchCharacters(signal);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
    setIsInitialLoad(true);
    setHasError(false);
    setLoadedCharacters([]);
  }, [filters]);

  useEffect(() => {
    if (characters.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsInitialLoad(false);
      setHasError(false);
    }
  }, [characters]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasError(true);
    }
  }, [error]);

  useEffect(() => {
    if (characters.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoadedCharacters((prev) => [...prev, ...characters]);
    }
  }, [characters]);

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
      <div className={styles.homePage__filters}>
        <FiltersPanel setFilters={setFilters} />
      </div>

      {isLoading && isInitialLoad && (
        <div className={styles.homePage__loader}>
          <Loader
            size='big'
            text='Loading characters...'
          />
        </div>
      )}

      <InfiniteScroll
        pages={pages}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        hasError={hasError}
      >
        {({ lastElementRef }) => (
          <ul className={styles.homePage__charactersList}>
            {loadedCharacters.map((character, index) => {
              const isLastElement = index === loadedCharacters.length - 1;

              return (
                <li
                  key={character.id}
                  ref={isLastElement ? lastElementRef : null}
                >
                  <CharacterCard {...character} />
                </li>
              );
            })}
          </ul>
        )}
      </InfiniteScroll>

      {!isLoading &&
        error === NO_CHARACTERS_FOUND &&
        !loadedCharacters.length && (
          <span className={styles.homePage__noResults}>
            No results. <br /> Please try changing the filter parameters.
          </span>
        )}

      {isLoading && !isInitialLoad && (
        <div className={styles.homePage__loader}>
          <Loader size='small' />
        </div>
      )}

      {!isLoading && hasError && (
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
