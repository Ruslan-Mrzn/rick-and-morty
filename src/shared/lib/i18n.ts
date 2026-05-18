import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import { LANGUAGE_STORAGE_KEY } from '@/shared/constants';
import { localeResources } from '@/shared/i18n';

const SUPPORTED_LANGUAGES = ['en', 'ru'] as const;

type TLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const isLanguage = (value: string | null): value is TLanguage =>
  value === 'en' || value === 'ru';

const readStoredLanguage = (): TLanguage => {
  try {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (isLanguage(storedLanguage)) {
      return storedLanguage;
    }
  } catch {
    return 'en';
  }

  return 'en';
};

const persistLanguage = (language: TLanguage): void => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    return;
  }
};

const initialLanguage = readStoredLanguage();

document.documentElement.lang = initialLanguage;

void i18n.use(initReactI18next).init({
  resources: localeResources,
  lng: initialLanguage,
  fallbackLng: 'en',
  supportedLngs: [...SUPPORTED_LANGUAGES],
  interpolation: { escapeValue: false }
});

i18n.on('languageChanged', (language) => {
  if (!isLanguage(language)) {
    return;
  }

  document.documentElement.lang = language;
  persistLanguage(language);
});

export default i18n;
