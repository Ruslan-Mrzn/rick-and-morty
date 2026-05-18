import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';

export const localeResources = {
  en: { translation: en },
  ru: { translation: ru satisfies typeof en }
} as const;

export type TranslationResources = typeof en;
