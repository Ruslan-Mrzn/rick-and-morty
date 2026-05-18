import { useTranslation } from 'react-i18next';

import { loader } from '@/assets/images';
import { classNames } from '@/shared/helpers';

import styles from './Loader.module.scss';

type TLoaderProps = {
  size: 'big' | 'small';
  text?: string;
};

const Loader = ({ size, text }: TLoaderProps) => {
  const { t } = useTranslation();

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
        alt={t((s) => s.a11y.loader)}
      />
      {text && <span className={styles.loader__text}>{text}</span>}
    </div>
  );
};

export default Loader;
