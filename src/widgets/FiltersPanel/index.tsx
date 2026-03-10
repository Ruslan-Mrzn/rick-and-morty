import {
  type Dispatch,
  type KeyboardEvent,
  memo,
  type SetStateAction,
  useCallback,
  useState
} from 'react';

import { MemoizedSearchIcon as SearchIcon } from '@/assets/icons';
import { Selector, TextInput } from '@/shared/components';
import {
  genderOptions,
  speciesOptions,
  statusOptions
} from '@/shared/helpers/mocks';
import type { TGetCharactersParams } from '@/shared/types';
import type { TGender, TSpecies, TStatus } from '@/shared/types';

import styles from './FiltersPanel.module.scss';

type TFiltersPanelProps = {
  setFilters: Dispatch<SetStateAction<Omit<TGetCharactersParams, 'page'>>>;
};

const FiltersPanel = memo(({ setFilters }: TFiltersPanelProps) => {
  const [filters, setFiltersState] = useState<
    Omit<TGetCharactersParams, 'page'>
  >({
    gender: undefined,
    status: undefined,
    species: undefined,
    name: undefined
  });
  const [nameFilter, setNameFilter] = useState('');

  const updateFilters = useCallback(
    (updates: Partial<Omit<TGetCharactersParams, 'page'>>) => {
      setFilters((prev) => ({ ...prev, ...updates }));
      setFiltersState((prev) => ({ ...prev, ...updates }));
    },
    [setFilters]
  );

  const handleStatusChange = useCallback(
    (value: TStatus) => {
      updateFilters({ status: value });
    },
    [updateFilters]
  );

  const handleSpeciesChange = useCallback(
    (value: TSpecies) => {
      updateFilters({ species: value });
    },
    [updateFilters]
  );

  const handleGenderChange = useCallback(
    (value: TGender) => {
      updateFilters({ gender: value });
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
        onChange={handleStatusChange}
      />
      <Selector
        value={filters.gender}
        placeholder='Gender'
        options={genderOptions}
        onChange={handleGenderChange}
      />
      <Selector
        value={filters.species}
        placeholder='Species'
        options={speciesOptions}
        onChange={handleSpeciesChange}
      />
    </div>
  );
});

export default FiltersPanel;
