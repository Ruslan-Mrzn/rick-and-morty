import { memo } from 'react';

import { Link } from 'react-router';

import { MemoizedLeftArrowIcon as LeftArrowIcon } from '@/assets/icons';

import styles from './GoBackBtn.module.scss';

const GoBackBtn = memo(() => {
  return (
    <Link
      className={styles.btn}
      to={'/'}
    >
      <LeftArrowIcon
        width={16}
        height={16}
      />
      Go Back
    </Link>
  );
});

export default GoBackBtn;
