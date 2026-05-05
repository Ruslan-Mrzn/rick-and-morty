import { type ReactNode, useCallback } from 'react';

import { useOnInView } from 'react-intersection-observer';

import { SuccessLoadedIcon } from '@/assets/icons';
import { classNames } from '@/shared/helpers';

import styles from './InfiniteScroll.module.scss';

type TInfiniteScrollProps = {
  incrementPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: null | string;
  children: (_props: {
    lastElementRef: (_node: Element | null) => void;
  }) => ReactNode;
};

const InfiniteScroll = ({
  incrementPage,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  error,
  children
}: TInfiniteScrollProps) => {
  const handleInView = useCallback(
    (inView: boolean) => {
      if (
        inView &&
        hasNextPage &&
        !isFetchingNextPage &&
        !isLoading &&
        !error
      ) {
        incrementPage();
      }
    },
    [error, hasNextPage, incrementPage, isFetchingNextPage, isLoading]
  );

  const lastElementRef = useOnInView(handleInView);

  return (
    <>
      {children({ lastElementRef })}
      {!isLoading && !isFetchingNextPage && !hasNextPage && !error && (
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
