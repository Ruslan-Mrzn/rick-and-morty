import { useEffect, useRef } from 'react';

import toast from 'react-hot-toast';

import { SILENT_ERROR_CODES } from '@/shared/constants';
import { translateAppError } from '@/shared/helpers';
import type { TAppError } from '@/shared/types';

export const useErrorToast = (error: TAppError | null) => {
  const lastToastedCodeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!error || SILENT_ERROR_CODES.includes(error.code)) {
      lastToastedCodeRef.current = null;

      return;
    }

    const toastKey = `${error.code}:${error.serverMessage ?? ''}`;

    if (lastToastedCodeRef.current === toastKey) {
      return;
    }

    lastToastedCodeRef.current = toastKey;
    toast.error(translateAppError(error));
  }, [error]);
};
