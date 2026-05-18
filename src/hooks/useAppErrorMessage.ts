import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { translateAppError } from '@/shared/helpers';
import type { TAppError } from '@/shared/types';

export const useAppErrorMessage = (error: TAppError | null): string | null => {
  const { i18n } = useTranslation();

  return useMemo(
    () => (error ? translateAppError(error) : null),
    [error, i18n.language]
  );
};
