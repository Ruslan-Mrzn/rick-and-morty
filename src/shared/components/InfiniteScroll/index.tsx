import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback
} from 'react';

import { useOnInView } from 'react-intersection-observer';

import { classNames } from '@/shared/helpers';

import styles from './InfiniteScroll.module.scss';

interface InfiniteScrollProps {
  pages: number;
  isLoading: boolean;
  error: null | string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  children: (_props: {
    lastElementRef: (_node: Element | null) => void;
  }) => ReactNode;
}

const InfiniteScroll = ({
  pages,
  isLoading,
  error,
  page,
  setPage,
  children
}: InfiniteScrollProps) => {
  const hasMore = page < pages;

  const handleInView = useCallback(
    (inView: boolean) => {
      if (inView && hasMore && !isLoading && !error) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, isLoading, setPage, error]
  );

  const lastElementRef = useOnInView(handleInView);

  return (
    <>
      {children({ lastElementRef })}
      {!isLoading && !hasMore && !error && (
        <span className={styles.infiniteScroll__infoText}>
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
