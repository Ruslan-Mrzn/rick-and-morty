import type { TFunction } from 'i18next';
import { z as zod } from 'zod';

export const createCharacterEditSchema = (t: TFunction<'translation'>) =>
  zod.object({
    name: zod
      .string()
      .min(1, t('validation.nameRequired'))
      .max(40, t('validation.nameTooLong'))
      .trim(),
    location: zod
      .string()
      .min(1, t('validation.locationRequired'))
      .max(50, t('validation.locationTooLong'))
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
