import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import styles from './ErrorBoundary.module.scss';

type TErrorFallbackProps = {
  onReset: () => void;
};

const ErrorFallback = ({ onReset }: TErrorFallbackProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('errorBoundary.title')}</h1>

        <div className={styles.errorContainer}>
          <p className={styles.message}>{t('errorBoundary.message')}</p>
        </div>

        <Link
          to='/'
          className={styles.button}
          onClick={onReset}
        >
          {t('common.goToHomepage')}
        </Link>

        <p className={styles.helpText}>{t('errorBoundary.helpText')}</p>
      </div>
    </div>
  );
};

export default ErrorFallback;
