import { useEffect } from 'react';

import toast from 'react-hot-toast';

export const useErrorToast = (error: string | null) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
};
