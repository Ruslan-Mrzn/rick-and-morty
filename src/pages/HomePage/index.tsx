import { useState } from 'react';

import { BigLogo, Indicator, Selector } from '@/shared/components';
import {
  genderOptions,
  speciesOptions,
  statusOptions
} from '@/shared/helpers/mocks';
import type { TStatus } from '@/shared/types';

import styles from './HomePage.module.scss';

const OptionStatusComponent = <T,>({ option }: { option: T }) => {
  return (
    <>
      {option}
      <Indicator status={option} />
    </>
  );
};

const HomePage = () => {
  const [gender, setGender] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [status, setStatus] = useState<TStatus>('alive');

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__logo}>
        <BigLogo />
      </div>
      <div className={styles.homePage__selectors}>
        <Selector
          size='big'
          options={genderOptions}
          value={gender}
          placeholder='gender'
          onChange={setGender}
        />
        <Selector
          size='big'
          value={species}
          options={speciesOptions}
          placeholder='species'
          onChange={setSpecies}
        />
        <Selector
          size='small'
          options={statusOptions}
          value={status}
          OptionComponent={OptionStatusComponent}
          onChange={setStatus}
        />
      </div>
    </div>
  );
};

export default HomePage;
