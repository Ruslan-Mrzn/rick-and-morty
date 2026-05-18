import { useTranslation } from 'react-i18next';

import type { TGender, TSpecies, TStatus, TTranslate } from '@/shared/types';

type TEnumTranslateFn<T extends TGender | TSpecies | TStatus> = (
  _t: TTranslate,
  _option: T | 'all'
) => string;

export const useEnumLabel = <T extends TGender | TSpecies | TStatus>(
  translate: TEnumTranslateFn<T>,
  option: T | 'all'
): string => {
  const { t } = useTranslation();

  return translate(t, option);
};
