import { useEffect, useRef } from 'react';

import styles from './Indicator.module.scss';

const Indicator = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const closestParent = ref.current.closest('[data-key]');

      if (closestParent) {
        ref.current.setAttribute(
          'data-key',
          closestParent.getAttribute('data-key') || ''
        );
      }
    }
  }, []);

  return (
    <div
      ref={ref}
      className={styles.indicator}
    ></div>
  );
};

export default Indicator;
