import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import { localeResources } from '@/shared/i18n';

document.documentElement.lang = 'en';

void i18n.use(initReactI18next).init({
  resources: localeResources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en'],
  interpolation: { escapeValue: false }
});

export default i18n;
