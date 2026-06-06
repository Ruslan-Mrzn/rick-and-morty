import { useTranslation } from 'react-i18next';

import { FilterIcon } from '@/assets/icons';
import { classNames } from '@/shared/helpers';

import styles from './FiltersToggleButton.module.scss';

type TFiltersToggleButtonProps = {
  isExpanded: boolean;
  onClick: () => void;
};

const FiltersToggleButton = ({
  isExpanded,
  onClick
}: TFiltersToggleButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      type='button'
      className={styles.filtersToggleButton}
      aria-expanded={isExpanded}
      onClick={onClick}
    >
      <FilterIcon
        className={classNames(styles.filtersToggleButton__icon, {
          [styles.filtersToggleButton__icon_expanded]: isExpanded
        })}
        width={18}
        height={12}
      />
      <span className={styles.filtersToggleButton__label}>
        {isExpanded ? t('filters.lessFilters') : t('filters.moreFilters')}
      </span>
    </button>
  );
};

export default FiltersToggleButton;
