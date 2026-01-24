import { classNames } from '@/shared/helpers';
import { type TStatus } from '@/shared/types';

import styles from './Indicator.module.scss';

const Indicator = ({ status }: { status?: TStatus }) => {
  return (
    <div
      className={classNames(styles.indicator, {
        [styles.indicator_alive]: status === 'alive',
        [styles.indicator_dead]: status === 'dead',
        [styles.indicator_unknown]: status === 'unknown'
      })}
    ></div>
  );
};

export default Indicator;
