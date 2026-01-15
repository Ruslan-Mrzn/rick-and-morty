import styles from './Indicator.module.scss';

const Indicator = ({ status }: { status?: string }) => {
  return (
    <div
      className={[styles.indicator, styles[`indicator_${status}`]].join(' ')}
    ></div>
  );
};

export default Indicator;
