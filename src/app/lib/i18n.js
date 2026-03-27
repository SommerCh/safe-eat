import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    da: {
        translation: {
        }
    },
    en: {
        translation: {
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "da",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;