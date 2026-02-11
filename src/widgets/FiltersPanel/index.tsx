import { useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { Selector, TextInput } from '@/shared/components';
import {
  genderOptions,
  speciesOptions,
  statusOptions
} from '@/shared/helpers/mocks';
import type { TStatus } from '@/shared/types';

import styles from './FiltersPanel.module.scss';

const FiltersPanel = () => {
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState<TStatus | ''>('');
  const [species, setSpecies] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  return (
    <div className={styles.filtersPanel}>
      <TextInput
        variant='bordered'
        placeholder='Filter by name...'
        value={nameFilter}
        onChange={setNameFilter}
        name='nameFilter'
        icon={<SearchIcon />}
      />
      <Selector
        key={status || 'Status'}
        value={status}
        placeholder='Status'
        options={statusOptions}
        onChange={setStatus}
      />
      <Selector
        key={gender || 'Gender'}
        value={gender}
        placeholder='Gender'
        options={genderOptions}
        onChange={setGender}
      />
      <Selector
        key={species || 'Species'}
        value={species}
        placeholder='Species'
        options={speciesOptions}
        onChange={setSpecies}
      />
    </div>
  );
};

export default FiltersPanel;
