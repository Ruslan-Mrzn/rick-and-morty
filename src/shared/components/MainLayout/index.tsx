import { memo } from 'react';

import { Outlet } from 'react-router';

import { MemoizedLightThemeIcon, MemoizedLogoIcon } from '@/assets/icons';
import { classNames } from '@/shared/helpers';

import styles from './MainLayout.module.scss';

const Header = memo(({ customClassName }: { customClassName?: string }) => (
  <header className={styles.header}>
    <div className={classNames(styles.header__inner, customClassName)}>
      <MemoizedLogoIcon
        width={48}
        height={50}
      />
      <div className={styles.header__controls}>
        <button className={styles.header__btn}>
          <MemoizedLightThemeIcon
            width={25}
            height={25}
          />
        </button>
        <button className={styles.header__btn}>РУ</button>
      </div>
    </div>
  </header>
));

const Footer = memo(({ customClassName }: { customClassName?: string }) => (
  <footer className={styles.footer}>
    <div className={classNames(styles.footer__inner, customClassName)}>
      <p className={styles.footer__text}>Made with love by Russel_Mrzn</p>
    </div>
  </footer>
));

const MainLayout = ({ customClassName }: { customClassName?: string }) => {
  return (
    <>
      <Header customClassName={customClassName} />
      <main className={classNames(styles.main, customClassName)}>
        <Outlet />
      </main>
      <Footer customClassName={customClassName} />
    </>
  );
};

export default MainLayout;
