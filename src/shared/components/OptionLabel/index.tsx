import { useTranslation } from 'react-i18next';

import type { TGender, TSpecies, TStatus } from '@/shared/types';

export const GenderOptionLabel = ({ option }: { option: TGender | 'all' }) => {
  const { t } = useTranslation();

  return option === 'all' ? t('common.all') : t(`genders.${option}`);
};

export const SpeciesOptionLabel = ({
  option
}: {
  option: TSpecies | 'all';
}) => {
  const { t } = useTranslation();

  return option === 'all' ? t('common.all') : t(`species.${option}`);
};

export const StatusOptionLabel = ({ option }: { option: TStatus | 'all' }) => {
  const { t } = useTranslation();

  return option === 'all' ? t('common.all') : t(`statuses.${option}`);
};
