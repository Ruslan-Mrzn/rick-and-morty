import { type TStatus } from '@/shared/types';

import styles from './Indicator.module.scss';

const Indicator = ({ status }: { status?: TStatus }) => {
  return (
    <div
      className={[styles.indicator, styles[`indicator_${status}`]].join(' ')}
    ></div>
  );
};

export default Indicator;
