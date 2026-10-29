import { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { FavoriteIcon } from '@/assets/icons';
import { useFavoritesStore } from '@/stores';

import styles from './FavoriteCharacters.module.scss';

const MAX_FAVORITES_TO_VIEW = 9;

const FavoriteCharacters = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const hasFavorites = favorites.length > 0;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (rootRef.current && !event.composedPath().includes(rootRef.current)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={styles.favoriteCharacters}
      ref={rootRef}
    >
      <button
        type='button'
        className={styles.favoriteCharacters__toggle}
        aria-label={isOpen ? t('favorites.close') : t('favorites.open')}
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((open) => !open);
        }}
      >
        <FavoriteIcon
          width={25}
          height={24}
          className={
            hasFavorites
              ? styles.favoriteCharacters__icon_active
              : styles.favoriteCharacters__icon
          }
          aria-hidden='true'
        />
        {hasFavorites && (
          <span className={styles.favoriteCharacters__count}>
            {favorites.length > MAX_FAVORITES_TO_VIEW
              ? `${MAX_FAVORITES_TO_VIEW}+`
              : favorites.length}
          </span>
        )}
      </button>

      {isOpen && (
        <section
          className={styles.favoriteCharacters__panel}
          aria-label={t('favorites.title')}
        >
          {hasFavorites ? (
            <ul className={styles.favoriteCharacters__list}>
              {favorites.map((character) => (
                <li
                  className={styles.favoriteCharacters__item}
                  key={character.id}
                >
                  <Link
                    className={styles.favoriteCharacters__link}
                    to={`/character/${character.id}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {character.name}
                  </Link>
                  <button
                    type='button'
                    className={styles.favoriteCharacters__remove}
                    aria-label={`${t('favorites.remove')}: ${character.name}`}
                    onClick={() => removeFavorite(character.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.favoriteCharacters__empty}>
              {t('favorites.empty')}
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default FavoriteCharacters;
