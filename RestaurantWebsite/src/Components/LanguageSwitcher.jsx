import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // ✅ FIX: normalize language (de-DE → de)
  const currentLang = i18n.language?.split("-")[0];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 border rounded-md px-3 py-1 text-sm bg-white hover:bg-gray-50"
      >
        {currentLang.toUpperCase()}
        <span className="text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 rounded-md border bg-white shadow-lg z-50">
             <button
            onClick={() => changeLanguage("de")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              currentLang === "de" ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            Deutsch
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              currentLang === "en" ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            English
          </button>
       
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
