import { useEffect, useId } from 'react';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { SILENT_ERROR_CODES } from '@/shared/constants';
import { translateAppError } from '@/shared/helpers';
import type { TAppError } from '@/shared/types';

export const useErrorToast = (error: TAppError | null) => {
  const toastId = useId();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!error || SILENT_ERROR_CODES.includes(error.code)) {
      toast.dismiss(toastId);
    } else {
      toast.error(translateAppError(error, t), { id: toastId });
    }

    return () => toast.dismiss(toastId);
  }, [error, t, i18n.language, toastId]);
};
