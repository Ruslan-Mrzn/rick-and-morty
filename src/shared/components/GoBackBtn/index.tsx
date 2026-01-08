import { LeftArrowIcon } from '@/assets/icons';
import styles from './GoBackBtn.module.scss';

const GoBackBtn = () => {
  return (
    <button
      className={styles.btn}
      onClick={() => window.history.back()}
    >
      <LeftArrowIcon
        width={16}
        height={16}
      />
      <span className={styles.btn__text}>Go Back</span>
    </button>
  );
};

export default GoBackBtn;
