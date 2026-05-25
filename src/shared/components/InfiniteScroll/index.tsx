import { type ReactNode, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useOnInView } from 'react-intersection-observer';

import { SuccessLoadedIcon } from '@/assets/icons';
import { useAppErrorMessage } from '@/hooks';
import { classNames } from '@/shared/helpers';
import type { TAppError } from '@/shared/types';

import styles from './InfiniteScroll.module.scss';

type TInfiniteScrollProps = {
  incrementPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: TAppError | null;
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
  const { t } = useTranslation();
  const errorMessage = useAppErrorMessage(error);

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
          {t('common.allDataLoaded')}
        </span>
      )}
      {!isLoading && errorMessage && (
        <span
          className={classNames(
            styles.infiniteScroll__infoText_error,
            styles.infiniteScroll__infoText
          )}
        >
          {errorMessage}
        </span>
      )}
    </>
  );
};

export default InfiniteScroll;
