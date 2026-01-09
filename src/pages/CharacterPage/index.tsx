import { GoBackBtn, Loader } from '@/shared/components';

import styles from './CharacterPage.module.scss';

const CharacterPage = () => {
  return (
    <div className={styles.charPage}>
      <div className={styles.charPage__back}>
        <GoBackBtn />
      </div>
      <div className={styles.charPage__loader}>
        <Loader
          size='big'
          text='Loading character info...'
        />
      </div>
    </div>
  );
};
export default CharacterPage;
