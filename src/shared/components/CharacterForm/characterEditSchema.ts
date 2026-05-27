import type { TFunction } from 'i18next';
import { z as zod } from 'zod';

const MAX_NAME_LENGTH = 50;
const MAX_LOCATION_LENGTH = 50;

export const createCharacterEditSchema = (t: TFunction<'translation'>) =>
  zod.object({
    name: zod
      .string()
      .min(1, t('validation.nameRequired'))
      .max(MAX_NAME_LENGTH, t('validation.nameTooLong'))
      .trim(),
    location: zod
      .string()
      .min(1, t('validation.locationRequired'))
      .max(MAX_LOCATION_LENGTH, t('validation.locationTooLong'))
      .trim(),
    status: zod
      .union([
        zod.literal('alive'),
        zod.literal('dead'),
        zod.literal('unknown')
      ])
      .catch('unknown')
  });

export type TCharacterEditFormData = zod.infer<
  ReturnType<typeof createCharacterEditSchema>
>;
