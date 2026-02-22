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
  hasError: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  children: (_props: {
    lastElementRef: (_node: Element | null) => void;
  }) => ReactNode;
}

const InfiniteScroll = ({
  pages,
  isLoading,
  hasError,
  page,
  setPage,
  children
}: InfiniteScrollProps) => {
  const hasMore = page < pages;

  const handleInView = useCallback(
    (inView: boolean) => {
      if (inView && hasMore && !isLoading && !hasError) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, isLoading, setPage, hasError]
  );

  const lastElementRef = useOnInView(handleInView);

  return (
    <>
      {children({ lastElementRef })}
      {!isLoading && !hasMore && !hasError && (
        <span className={styles.infiniteScroll__infoText}>
          All characters are loaded
        </span>
      )}
      {!isLoading && hasError && hasMore && (
        <span
          className={classNames(
            styles.infiniteScroll__infoText_error,
            styles.infiniteScroll__infoText
          )}
        >
          Something went wrong
        </span>
      )}
    </>
  );
};

export default InfiniteScroll;
