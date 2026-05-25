import { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { LeftArrowIcon } from '@/assets/icons';

import styles from './GoBackBtn.module.scss';

const GoBackBtn = memo(() => {
  const { t } = useTranslation();

  return (
    <Link
      className={styles.btn}
      to={'/'}
    >
      <LeftArrowIcon
        width={16}
        height={16}
      />
      {t('common.goBack')}
    </Link>
  );
});

export default GoBackBtn;
