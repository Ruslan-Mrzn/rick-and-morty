import { useEffect } from 'react';

import toast from 'react-hot-toast';

import { NO_CHARACTERS_FOUND_ERROR } from '@/shared/constants';

export const useErrorToast = (error: string | null) => {
  useEffect(() => {
    if (error && error !== NO_CHARACTERS_FOUND_ERROR) {
      toast.error(error);
    }
  }, [error]);
};
