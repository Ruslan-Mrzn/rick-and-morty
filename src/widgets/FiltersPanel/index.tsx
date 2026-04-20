import { memo, useCallback } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { SearchIcon } from '@/assets/icons';
import { Selector, TextInput } from '@/shared/components';
import {
  genderOptionsWithAll,
  speciesOptionsWithAll,
  statusOptionsWithAll
} from '@/shared/helpers';
import type { TCharactersFilters } from '@/shared/types';
import { useCharactersFiltersStore } from '@/stores';

import styles from './FiltersPanel.module.scss';

const FiltersPanel = memo(() => {
  const { filters, nameInput, setFilter, setNameFilter } =
    useCharactersFiltersStore(
      useShallow((state) => ({
        filters: state.filters,
        nameInput: state.nameInput,
        setFilter: state.setFilter,
        setNameFilter: state.setNameFilter
      }))
    );

  const handleFilterChange = useCallback(
    (field: keyof TCharactersFilters) => (value: string) => {
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
