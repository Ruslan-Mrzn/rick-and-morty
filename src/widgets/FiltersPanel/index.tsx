import { memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useShallow } from 'zustand/react/shallow';

import { SearchIcon } from '@/assets/icons';
import {
  GenderOptionLabel,
  Selector,
  SpeciesOptionLabel,
  StatusOptionLabel,
  TextInput
} from '@/shared/components';
import {
  classNames,
  genderOptionsWithAll,
  speciesOptionsWithAll,
  statusOptionsWithAll
} from '@/shared/helpers';
import type { TCharactersFilters } from '@/shared/types';
import { useCharactersFiltersStore } from '@/stores';

import styles from './FiltersPanel.module.scss';
import FiltersToggleButton from './FiltersToggleButton';

const FiltersPanel = memo(() => {
  const { t } = useTranslation();
  const [isFiltersPanelExpanded, setIsFiltersPanelExpanded] = useState(false);
  const { filters, nameInput, setFilter, setNameInput, applyNameFilter } =
    useCharactersFiltersStore(
      useShallow((state) => ({
        filters: state.filters,
        nameInput: state.nameInput,
        setFilter: state.setFilter,
        setNameInput: state.setNameInput,
        applyNameFilter: state.applyNameFilter
      }))
    );

  const handleFilterChange = useCallback(
    (field: keyof TCharactersFilters) => (value: string) => {
      setFilter(field, value === 'all' ? undefined : value);
    },
    [setFilter]
  );

  const handleNameSubmit = useCallback(() => {
    applyNameFilter();
  }, [applyNameFilter]);

  const handleNameClear = useCallback(() => {
    setNameInput('');
    applyNameFilter();
  }, [applyNameFilter, setNameInput]);

  const handleNameInputChange = useCallback(
    (value: string) => {
      setNameInput(value);
    },
    [setNameInput]
  );

  const handleToggleFiltersPanel = useCallback(() => {
    setIsFiltersPanelExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className={classNames(styles.filtersPanel, {
        [styles.filtersPanel_expanded]: isFiltersPanelExpanded
      })}
    >
      <TextInput
        variant='bordered'
        placeholder={t('filters.namePlaceholder')}
        value={nameInput}
        onChange={handleNameInputChange}
        onEnter={handleNameSubmit}
        onClear={handleNameClear}
        onIconClick={handleNameSubmit}
        name='nameFilter'
        icon={<SearchIcon className={styles.searchIcon} />}
      />
      <Selector
        value={filters.species}
        placeholder={t('filters.species')}
        options={speciesOptionsWithAll}
        OptionComponent={SpeciesOptionLabel}
        onChange={handleFilterChange('species')}
      />
      <Selector
        value={filters.gender}
        placeholder={t('filters.gender')}
        options={genderOptionsWithAll}
        OptionComponent={GenderOptionLabel}
        onChange={handleFilterChange('gender')}
      />
      <Selector
        value={filters.status}
        placeholder={t('filters.status')}
        options={statusOptionsWithAll}
        OptionComponent={StatusOptionLabel}
        onChange={handleFilterChange('status')}
      />
      <FiltersToggleButton
        isExpanded={isFiltersPanelExpanded}
        onClick={handleToggleFiltersPanel}
      />
    </div>
  );
});

export default FiltersPanel;
