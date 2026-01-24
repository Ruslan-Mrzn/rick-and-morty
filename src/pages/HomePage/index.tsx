import { useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { BigLogo, Indicator, Selector, TextInput } from '@/shared/components';
import { genderOptions, statusOptions } from '@/shared/helpers/mocks';
import type { TStatus } from '@/shared/types';

import styles from './HomePage.module.scss';

const OptionStatusComponent = ({ option }: { option: TStatus }) => {
  return (
    <>
      {option}
      <Indicator status={option} />
    </>
  );
};

const HomePage = () => {
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState<TStatus>('alive');
  const [nameFilter, setNameFilter] = useState('');
  const [characterName, setCharacterName] = useState('Rick');

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
          size='small'
          options={statusOptions}
          value={status}
          OptionComponent={OptionStatusComponent}
          onChange={setStatus}
        />
        <TextInput
          variant='bordered'
          placeholder='Filter by name...'
          value={nameFilter}
          onChange={setNameFilter}
          name='nameFilter'
          icon={<SearchIcon />}
        />
        <TextInput
          variant='underlined'
          placeholder='Enter name...'
          value={characterName}
          name='characterName'
          onChange={setCharacterName}
        />
      </div>
    </div>
  );
};

export default HomePage;
