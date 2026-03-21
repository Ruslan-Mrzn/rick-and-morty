import { memo } from 'react';

import { Outlet } from 'react-router';

import { LightThemeIcon, LogoIcon } from '@/assets/icons';
import { classNames } from '@/shared/helpers';

import styles from './MainLayout.module.scss';

type TClassName = {
  className?: string;
};

const Header = memo(({ className }: TClassName) => (
  <header className={styles.header}>
    <div className={classNames(styles.header__inner, className)}>
      <LogoIcon
        width={48}
        height={50}
      />
      <div className={styles.header__controls}>
        <button className={styles.header__btn}>
          <LightThemeIcon
            width={25}
            height={25}
          />
        </button>
        <button className={styles.header__btn}>РУ</button>
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
