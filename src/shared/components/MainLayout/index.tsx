import { Outlet } from 'react-router';

import { LightThemeIcon, LogoIcon } from '@/assets/icons';
import { classNames } from '@/shared/helpers';

import styles from './MainLayout.module.scss';

const MainLayout = ({ customClassName }: { customClassName?: string }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={classNames(styles.header__inner, customClassName)}>
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
      <main className={classNames(styles.main, customClassName)}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={classNames(styles.footer__inner, customClassName)}>
          <p className={styles.footer__text}>Made with love by Russel_Mrzn</p>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
