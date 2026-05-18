import { memo } from 'react';

import { useEnumLabel } from '@/hooks';
import {
  translateGender,
  translateSpecies,
  translateStatus
} from '@/shared/helpers';
import type { TGender, TSpecies, TStatus } from '@/shared/types';

export const GenderEnumLabel = memo(
  ({ option }: { option: TGender | 'all' }) => {
    return useEnumLabel(translateGender, option);
  }
);

export const SpeciesEnumLabel = memo(
  ({ option }: { option: TSpecies | 'all' }) => {
    return useEnumLabel(translateSpecies, option);
  }
);

export const StatusEnumLabel = memo(
  ({ option }: { option: TStatus | 'all' }) => {
    return useEnumLabel(translateStatus, option);
  }
);
