import { Link } from 'react-router';

import { notFoundImg } from '@/assets/images';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <img
        src={notFoundImg}
        alt='not found'
        className={styles.logo}
      />
      <Link
        to='/'
        className={styles.notFound__link}
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
