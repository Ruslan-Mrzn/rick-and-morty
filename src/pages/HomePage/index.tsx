import { BigLogo } from '@/shared/components';
import { mockCharacter } from '@/shared/helpers/mocks';
import { CharacterCard, FiltersPanel } from '@/widgets';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
      <div className={styles.homePage__selectors}>
        <FiltersPanel />
      </div>
      <CharacterCard {...mockCharacter} />
    </div>
  );
};

export default HomePage;
