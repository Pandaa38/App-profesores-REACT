import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import es from './locales/es.json';
import en from './locales/en.json';

const deviceLang = Localization.getLocales()[0]?.languageCode ?? 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: { es: { translation: es }, en: { translation: en } },
    lng: deviceLang === 'es' ? 'es' : 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;