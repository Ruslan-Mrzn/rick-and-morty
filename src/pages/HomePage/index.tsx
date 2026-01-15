import { BigLogo, Indicator, Selector } from '@/shared/components';
import {
  genderOptions,
  speciesOptions,
  statusOptions
} from '@/shared/helpers/mocks';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
      <div className={styles.homePage__selectors}>
        <Selector
          size='big'
          options={genderOptions}
          placeholder='gender'
        />
        <Selector
          size='big'
          options={speciesOptions}
          placeholder='species'
        />
        <Selector
          size='small'
          options={statusOptions}
          defaultOption='alive'
          placeholder='status'
          Indicator={Indicator}
        />
      </div>
    </div>
  );
};

export default HomePage;
