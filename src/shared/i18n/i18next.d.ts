import 'i18next';

import type translation from './locales/en/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    enableSelector: true;
    resources: {
      translation: typeof translation;
    };
  }
}
