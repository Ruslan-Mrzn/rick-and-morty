import logo from '@/assets/images/logo-r&m.png';
import styles from './BigLogo.module.scss';

const BigLogo = () => {
  return (
    <img
      src={logo}
      alt='logo'
      className={styles.logo}
    />
  );
};

export default BigLogo;
