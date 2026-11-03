import { Component, lazy, type ReactNode, Suspense, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { TRemoteLinkComponentProps } from 'remote_app/FavoriteCharacters';

import { RefreshIcon } from '@/assets/icons';
import { Loader } from '@/shared/components';
import { useFavoritesStore } from '@/stores';

import styles from './FavoriteCharacters.module.scss';

const createLazyRemoteFavoriteCharacters = () =>
  lazy(() => import('remote_app/FavoriteCharacters'));

type TBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type TBoundaryState = {
  hasError: boolean;
};

class RemoteWidgetBoundary extends Component<TBoundaryProps, TBoundaryState> {
  state: TBoundaryState = { hasError: false };

  static getDerivedStateFromError(): TBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const RouterLink = ({
  to,
  className,
  onClick,
  children
}: TRemoteLinkComponentProps) => (
  <Link
    to={to}
    className={className}
    onClick={onClick}
  >
    {children}
  </Link>
);

const FavoriteCharacters = () => {
  const { t } = useTranslation();
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const [RemoteFavoriteCharacters, setRemoteFavoriteCharacters] = useState(
    createLazyRemoteFavoriteCharacters
  );
  const [retryKey, setRetryKey] = useState(0);

  const tryToLoadFavoritesAgain = () => {
    setRemoteFavoriteCharacters(createLazyRemoteFavoriteCharacters);
    setRetryKey((key) => key + 1);
  };

  return (
    <RemoteWidgetBoundary
      key={retryKey}
      fallback={
        <button
          type='button'
          className={styles.error}
          aria-label={t('favorites.unavailable')}
          title={t('favorites.unavailable')}
          onClick={tryToLoadFavoritesAgain}
        >
          <RefreshIcon
            width={20}
            height={20}
            aria-hidden='true'
          />
        </button>
      }
    >
      <Suspense fallback={<Loader size='tiny' />}>
        <RemoteFavoriteCharacters
          favorites={favorites}
          onRemove={removeFavorite}
          labels={{
            open: t('favorites.open'),
            close: t('favorites.close'),
            title: t('favorites.title'),
            remove: t('favorites.remove'),
            empty: t('favorites.empty')
          }}
          linkComponent={RouterLink}
        />
      </Suspense>
    </RemoteWidgetBoundary>
  );
};

export default FavoriteCharacters;
