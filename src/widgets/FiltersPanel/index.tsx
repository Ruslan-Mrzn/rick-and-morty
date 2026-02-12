import { type KeyboardEvent, useEffect, useState } from 'react';

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
  // eslint-disable-next-line no-unused-vars
  refetchCharacters: (params: TGetAllProps) => Promise<undefined>;
};

const FiltersPanel = ({ refetchCharacters }: TFiltersPanelProps) => {
  const [gender, setGender] = useState<TGender | undefined>(undefined);
  const [status, setStatus] = useState<TStatus | undefined>(undefined);
  const [species, setSpecies] = useState<TSpecies | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState('');
  const [params, setParams] = useState<TGetAllProps>({});

  useEffect(() => {
    refetchCharacters(params);
  }, [params]);

  const handleNameChange = (value: string) => {
    setNameFilter(value);
  };

  const handleStatusChange = (value: TStatus) => {
    setStatus(value);
    setParams(
      (prev): TGetAllProps => ({
        ...prev,
        status: value.toLowerCase() as Lowercase<TStatus>
      })
    );
  };

  const handleSpeciesChange = (value: TSpecies) => {
    setSpecies(value);
    setParams(
      (prev): TGetAllProps => ({
        ...prev,
        species: value.toLowerCase() as Lowercase<TSpecies>
      })
    );
  };

  const handleGenderChange = (value: TGender) => {
    setGender(value);
    setParams(
      (prev): TGetAllProps => ({
        ...prev,
        gender: value.toLowerCase() as Lowercase<TGender>
      })
    );
  };

  const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setParams((prev) => ({
        ...prev,
        name: nameFilter.toLowerCase()
      }));
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
            onClick={() =>
              setParams((prev) => ({
                ...prev,
                name: nameFilter.toLowerCase()
              }))
            }
          />
        }
      />
      <Selector
        key={status || 'Status'}
        value={status}
        placeholder='Status'
        options={statusOptions}
        onChange={handleStatusChange}
      />
      <Selector
        key={gender || 'Gender'}
        value={gender}
        placeholder='Gender'
        options={genderOptions}
        onChange={handleGenderChange}
      />
      <Selector
        key={species || 'Species'}
        value={species}
        placeholder='Species'
        options={speciesOptions}
        onChange={handleSpeciesChange}
      />
    </div>
  );
};

export default FiltersPanel;
