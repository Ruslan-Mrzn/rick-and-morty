import { Link } from 'react-router';

import { BigLogo, Loader } from '@/shared/components';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
      <Link to='/character'>Go to character page</Link>
      <div className={styles.homePage__loader}>
        <Loader
          size='big'
          text='Loading characters...'
        />
        <Loader size='small' />
      </div>
    </div>
  );
};
export default HomePage;
