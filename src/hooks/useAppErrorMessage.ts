import { useTranslation } from 'react-i18next';

import { translateAppError } from '@/shared/helpers';
import type { TAppError } from '@/shared/types';

export const useAppErrorMessage = (error: TAppError | null): string | null => {
  const { t } = useTranslation();

  if (!error) {
    return null;
  }

  return translateAppError(error, t);
};
