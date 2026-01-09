import { Outlet } from 'react-router';

import { LightThemeIcon, LogoIcon } from '@/assets/icons';

import styles from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__inner}>
          <LogoIcon
            width={48}
            height={50}
          />
          <ul className={styles.header__controls}>
            <li>
              <button className={styles.header__btn}>
                <LightThemeIcon
                  width={25}
                  height={25}
                />
              </button>
            </li>
            <li>
              <button className={styles.header__btn}>РУ</button>
            </li>
          </ul>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footer__inner}>
          <p className={styles.footer__text}>Made with love by Russel_Mrzn</p>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
