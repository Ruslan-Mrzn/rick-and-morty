import styles from './HomePage.module.scss';
import { BigLogo } from '@/shared/components';
const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
    </div>
  );
};
export default HomePage;
