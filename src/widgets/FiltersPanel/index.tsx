import {
  type Dispatch,
  type KeyboardEvent,
  memo,
  type SetStateAction,
  useCallback,
  useState
} from 'react';

import { SearchIcon } from '@/assets/icons';
import { Selector, TextInput } from '@/shared/components';
import { genderOptions, speciesOptions, statusOptions } from '@/shared/helpers';
import type { TGetCharactersParams } from '@/shared/types';

import styles from './FiltersPanel.module.scss';

const INITIAL_FILTERS: Omit<TGetCharactersParams, 'page'> = {
  gender: undefined,
  status: undefined,
  species: undefined,
  name: undefined
};

type TFiltersPanelProps = {
  setFilters: Dispatch<SetStateAction<Omit<TGetCharactersParams, 'page'>>>;
};

const FiltersPanel = memo(({ setFilters }: TFiltersPanelProps) => {
  const [filters, setFiltersState] = useState(INITIAL_FILTERS);
  const [nameFilter, setNameFilter] = useState('');

  const updateFilters = useCallback(
    (updates: Partial<Omit<TGetCharactersParams, 'page'>>) => {
      setFilters((prev) => ({ ...prev, ...updates }));
      setFiltersState((prev) => ({ ...prev, ...updates }));
    },
    [setFilters]
  );

  const handleFilterChange = useCallback(
    (field: keyof Omit<TGetCharactersParams, 'page'>) => (value: string) => {
      updateFilters({ [field]: value });
    },
    [updateFilters]
  );

  const handleNameChange = useCallback((value: string) => {
    setNameFilter(value);
  }, []);

  const applyNameFilter = useCallback(() => {
    updateFilters({ name: nameFilter.toLowerCase() || undefined });
  }, [nameFilter, updateFilters]);

  const handleEnterKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        applyNameFilter();
      }
    },
    [applyNameFilter]
  );

  return (
    <div className={styles.filtersPanel}>
      <TextInput
        variant='bordered'
        placeholder='Filter by name...'
        value={nameFilter}
        onChange={handleNameChange}
        onKeyDown={handleEnterKeyDown}
        name='nameFilter'
        icon={
          <SearchIcon
            className={styles.searchIcon}
            onClick={applyNameFilter}
          />
        }
      />
      <Selector
        value={filters.status}
        placeholder='Status'
        options={statusOptions}
        onChange={handleFilterChange('status')}
      />
      <Selector
        value={filters.gender}
        placeholder='Gender'
        options={genderOptions}
        onChange={handleFilterChange('gender')}
      />
      <Selector
        value={filters.species}
        placeholder='Species'
        options={speciesOptions}
        onChange={handleFilterChange('species')}
      />
    </div>
  );
});

export default FiltersPanel;
