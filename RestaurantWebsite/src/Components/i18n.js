import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

import en from "../locales/en/translation.json";
import de from "../locales/de/translation.json";
import fr from "../locales/fr/translation.json";
import es from "../locales/es/translation.json";

const savedLang = Cookies.get("lang") || "de"; // ✅ cookie first

i18n.use(initReactI18next).init({
  initImmediate: false, // ✅ important with Vite

  resources: {
    en: { translation: en },
    de: { translation: de },
    fr: { translation: fr },
    es: { translation: es },
  },

  lng: savedLang,
  fallbackLng: "de",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
