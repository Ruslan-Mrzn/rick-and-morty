import { useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { BigLogo, Selector, TextInput } from '@/shared/components';
import { genderOptions, mockCharacter } from '@/shared/helpers/mocks';
import { CharacterCard } from '@/widgets';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const [gender, setGender] = useState('');
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
      <CharacterCard {...mockCharacter} />
    </div>
  );
};

export default HomePage;
