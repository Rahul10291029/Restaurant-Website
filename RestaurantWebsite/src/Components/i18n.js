import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

import en from "../locales/en/translation.json";
import de from "../locales/de/translation.json";
import fr from "../locales/fr/translation.json";
import es from "../locales/es/translation.json";

// Get language from cookie
const savedLang = Cookies.get("lang");

i18n.use(initReactI18next).init({
  initImmediate: false, // Important for Vite

  resources: {
    de: { translation: de }, // German first
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
  },

  // If cookie exists use it, otherwise German
  lng: savedLang ? savedLang : "de",

  // If something missing, fallback to German then English
  fallbackLng: ["de", "en"],

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
