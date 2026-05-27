import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { notFoundImg } from '@/assets/images';

import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <img
        src={notFoundImg}
        alt={t('notFound.imageAlt')}
        className={styles.logo}
      />
      <Link
        to='/'
        className={styles.notFound__link}
      >
        {t('common.goToHomepage')}
      </Link>
    </div>
  );
};

export default NotFoundPage;
