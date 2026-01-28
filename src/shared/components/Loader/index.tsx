import { loader } from '@/assets/images';
import { classNames } from '@/shared/helpers';

import styles from './Loader.module.scss';

interface LoaderProps {
  size: 'big' | 'small';
  text?: string;
}

const Loader = ({ size, text }: LoaderProps) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.loader_big]: size === 'big',
        [styles.loader_small]: size === 'small'
      })}
    >
      <img
        className={styles.loader__image}
        src={loader}
        alt='loader'
      />
      {text && <span className={styles.loader__text}>{text}</span>}
    </div>
  );
};

export default Loader;
