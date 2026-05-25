import { useEffect, useId } from 'react';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { ERROR_CODE, SILENT_ERROR_CODES } from '@/shared/constants';
import { getAppErrorMessageKey } from '@/shared/helpers/getAppErrorMessageKey';
import type { TAppError } from '@/shared/types';

export const useErrorToast = (error: TAppError | null) => {
  const toastId = useId();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!error || SILENT_ERROR_CODES.includes(error.code)) {
      toast.dismiss(toastId);
    } else {
      const message =
        error.code === ERROR_CODE.SERVER_MESSAGE
          ? (error.serverMessage ?? t('errors.unknown'))
          : t(getAppErrorMessageKey(error.code));

      toast.error(message, { id: toastId });
    }

    return () => toast.dismiss(toastId);
  }, [error, t, i18n.language, toastId]);
};
