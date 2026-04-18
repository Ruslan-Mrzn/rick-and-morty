import { memo, useCallback } from 'react';

import { SearchIcon } from '@/assets/icons';
import { Selector, TextInput } from '@/shared/components';
import {
  genderOptionsWithAll,
  speciesOptionsWithAll,
  statusOptionsWithAll
} from '@/shared/helpers';
import type { TGetCharactersParams } from '@/shared/types';
import { useCharactersFiltersStore } from '@/stores';

import styles from './FiltersPanel.module.scss';

type TCharacterFilters = Omit<TGetCharactersParams, 'page' | 'signal'>;

const FiltersPanel = memo(() => {
  const filters = useCharactersFiltersStore((state) => state.filters);
  const nameInput = useCharactersFiltersStore((state) => state.nameInput);
  const setFilter = useCharactersFiltersStore((state) => state.setFilter);
  const setNameFilter = useCharactersFiltersStore(
    (state) => state.setNameFilter
  );

  const handleFilterChange = useCallback(
    (field: keyof TCharacterFilters) => (value: string) => {
      setFilter(field, value === 'all' ? undefined : value);
    },
    [setFilter]
  );

  const handleNameChange = useCallback(
    (value: string) => {
      setNameFilter(value);
    },
    [setNameFilter]
  );

  return (
    <div className={styles.filtersPanel}>
      <TextInput
        variant='bordered'
        placeholder='Filter by name...'
        value={nameInput}
        onChange={handleNameChange}
        name='nameFilter'
        icon={<SearchIcon className={styles.searchIcon} />}
      />
      <Selector
        value={filters.status}
        placeholder='Status'
        options={statusOptionsWithAll}
        onChange={handleFilterChange('status')}
      />
      <Selector
        value={filters.gender}
        placeholder='Gender'
        options={genderOptionsWithAll}
        onChange={handleFilterChange('gender')}
      />
      <Selector
        value={filters.species}
        placeholder='Species'
        options={speciesOptionsWithAll}
        onChange={handleFilterChange('species')}
      />
    </div>
  );
});

export default FiltersPanel;
