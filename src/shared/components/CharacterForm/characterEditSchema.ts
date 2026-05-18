import type { TFunction } from 'i18next';
import { z as zod } from 'zod';

export const createCharacterEditSchema = (t: TFunction<'translation'>) =>
  zod.object({
    name: zod
      .string()
      .min(
        1,
        t((s) => s.validation.nameRequired)
      )
      .max(
        40,
        t((s) => s.validation.nameTooLong)
      )
      .trim(),
    location: zod
      .string()
      .min(
        1,
        t((s) => s.validation.locationRequired)
      )
      .max(
        50,
        t((s) => s.validation.locationTooLong)
      )
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
