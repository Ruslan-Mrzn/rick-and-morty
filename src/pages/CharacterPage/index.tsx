import { GoBackBtn } from '@/shared/components';
import styles from './CharacterPage.module.scss';
const CharacterPage = () => {
  return (
    <div className={styles.charPage}>
      <div className={styles.charPage__back}>
        <GoBackBtn />
      </div>
    </div>
  );
};
export default CharacterPage;
