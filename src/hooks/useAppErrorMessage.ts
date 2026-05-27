import { useTranslation } from 'react-i18next';

import { ERROR_CODE } from '@/shared/constants';
import { getAppErrorMessageKey } from '@/shared/helpers/getAppErrorMessageKey';
import type { TAppError } from '@/shared/types';

export const useAppErrorMessage = (error: TAppError | null): string | null => {
  const { t } = useTranslation();

  if (!error) {
    return null;
  }

  if (error.code === ERROR_CODE.SERVER_MESSAGE) {
    return error.serverMessage ?? t('errors.unknown');
  }

  return t(getAppErrorMessageKey(error.code));
};
