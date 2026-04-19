import { type ReactNode, useCallback } from 'react';

import { useOnInView } from 'react-intersection-observer';

import { SuccessLoadedIcon } from '@/assets/icons';
import { classNames } from '@/shared/helpers';
import { useCharactersFiltersStore } from '@/stores';

import styles from './InfiniteScroll.module.scss';

type TInfiniteScrollProps = {
  pages: number;
  isLoading: boolean;
  error: null | string;
  children: (_props: {
    lastElementRef: (_node: Element | null) => void;
  }) => ReactNode;
};

const InfiniteScroll = ({
  pages,
  isLoading,
  error,
  children
}: TInfiniteScrollProps) => {
  const page = useCharactersFiltersStore((state) => state.page);
  const incrementPage = useCharactersFiltersStore(
    (state) => state.incrementPage
  );
  const hasMore = page < pages;

  const handleInView = useCallback(
    (inView: boolean) => {
      if (inView && hasMore && !isLoading && !error) {
        incrementPage();
      }
    },
    [error, hasMore, incrementPage, isLoading]
  );

  const lastElementRef = useOnInView(handleInView);

  return (
    <>
      {children({ lastElementRef })}
      {!isLoading && !hasMore && !error && (
        <span className={styles.infiniteScroll__infoText}>
          <SuccessLoadedIcon className={styles.infiniteScroll__successIcon} />
          Аll data has been loaded
        </span>
      )}
      {!isLoading && error && (
        <span
          className={classNames(
            styles.infiniteScroll__infoText_error,
            styles.infiniteScroll__infoText
          )}
        >
          {error}
        </span>
      )}
    </>
  );
};

export default InfiniteScroll;
