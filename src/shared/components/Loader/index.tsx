import { loader } from '@/assets/images';

import styles from './Loader.module.scss';

interface LoaderProps {
  size: 'big' | 'small';
  text?: string;
}

const Loader = ({ size, text }: LoaderProps) => {
  return (
    <div className={[styles.loader, styles[`loader_${size}`]].join(' ')}>
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
