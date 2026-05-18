import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

import { DarkThemeIcon, LightThemeIcon, LogoIcon } from '@/assets/icons';
import { classNames } from '@/shared/helpers';
import { useThemeStore } from '@/stores';

import styles from './MainLayout.module.scss';

type TClassName = {
  className?: string;
};

const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      className={styles.header__btn}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      {isDark ? (
        <DarkThemeIcon
          width={25}
          height={25}
          className={styles.header__themeIcon}
        />
      ) : (
        <LightThemeIcon
          width={25}
          height={25}
          className={styles.header__themeIcon}
        />
      )}
    </button>
  );
});

const LanguageToggle = memo(() => {
  const { i18n, t } = useTranslation();
  const isRussian = i18n.language === 'ru';

  const handleLanguageToggle = useCallback(() => {
    const languageToSet = isRussian ? 'en' : 'ru';

    void i18n.changeLanguage(languageToSet);
  }, [i18n, isRussian]);

  return (
    <button
      type='button'
      className={styles.header__btn}
      onClick={handleLanguageToggle}
      aria-label={
        isRussian
          ? t((s) => s.layout.langSwitchToRu)
          : t((s) => s.layout.langSwitchToEn)
      }
    >
      {isRussian
        ? t((s) => s.layout.langSwitchToRu)
        : t((s) => s.layout.langSwitchToEn)}
    </button>
  );
});

const Header = memo(({ className }: TClassName) => (
  <header className={styles.header}>
    <div className={classNames(styles.header__inner, className)}>
      <LogoIcon
        width={48}
        height={50}
        className={styles.header__logo}
      />
      <div className={styles.header__controls}>
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  </header>
));

const Footer = memo(({ className }: TClassName) => (
  <footer className={styles.footer}>
    <div className={classNames(styles.footer__inner, className)}>
      <p className={styles.footer__text}>Made with love by Russel_Mrzn</p>
    </div>
  </footer>
));

const MainLayout = ({ className }: TClassName) => {
  return (
    <>
      <Header className={className} />
      <main className={classNames(styles.main, className)}>
        <Outlet />
      </main>
      <Footer className={className} />
    </>
  );
};

export default MainLayout;
