import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

import en from "../locales/en/translation.json";
import de from "../locales/de/translation.json";
import fr from "../locales/fr/translation.json";
import es from "../locales/es/translation.json";

// Always default to German unless user explicitly saved something
const savedLang = Cookies.get("lang");

i18n.use(initReactI18next).init({
  initImmediate: false,

  resources: {
    de: { translation: de },
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
  },

  lng: savedLang || "de", // German default
  fallbackLng: "de",

  interpolation: {
    escapeValue: false,
  },

  // 🔥 VERY IMPORTANT
  detection: {
    order: [], // disables browser language detection
  },
});

export default i18n;
