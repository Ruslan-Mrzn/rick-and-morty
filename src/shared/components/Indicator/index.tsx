import styles from './Indicator.module.scss';

const Indicator = <T,>({ status }: { status?: T }) => {
  return (
    <div
      className={[styles.indicator, styles[`indicator_${status}`]].join(' ')}
    ></div>
  );
};

export default Indicator;
