import {
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
  useState
} from 'react';

import type { TGetAllProps } from '@/api/getCharacters';
import { SearchIcon } from '@/assets/icons';
import { Selector, TextInput } from '@/shared/components';
import {
  genderOptions,
  speciesOptions,
  statusOptions
} from '@/shared/helpers/mocks';
import type { TGender, TSpecies, TStatus } from '@/shared/types';

import styles from './FiltersPanel.module.scss';

type TFiltersPanelProps = {
  setFilters: Dispatch<SetStateAction<Omit<TGetAllProps, 'page'>>>;
};

const FiltersPanel = ({ setFilters }: TFiltersPanelProps) => {
  const [gender, setGender] = useState<TGender | undefined>();
  const [status, setStatus] = useState<TStatus | undefined>();
  const [species, setSpecies] = useState<TSpecies | undefined>();
  const [nameFilter, setNameFilter] = useState('');

  const updateFilters = (updates: Partial<Omit<TGetAllProps, 'page'>>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleStatusChange = (value: TStatus) => {
    setStatus(value);
    updateFilters({ status: value });
  };

  const handleSpeciesChange = (value: TSpecies) => {
    setSpecies(value);
    updateFilters({ species: value });
  };

  const handleGenderChange = (value: TGender) => {
    setGender(value);
    updateFilters({ gender: value });
  };

  const handleNameChange = (value: string) => {
    setNameFilter(value);
  };

  const applyNameFilter = () => {
    updateFilters({ name: nameFilter.toLowerCase() || undefined });
  };

  const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyNameFilter();
    }
  };

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
        value={status}
        placeholder='Status'
        options={statusOptions}
        onChange={handleStatusChange}
      />
      <Selector
        value={gender}
        placeholder='Gender'
        options={genderOptions}
        onChange={handleGenderChange}
      />
      <Selector
        value={species}
        placeholder='Species'
        options={speciesOptions}
        onChange={handleSpeciesChange}
      />
    </div>
  );
};

export default FiltersPanel;
