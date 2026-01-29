import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white shadow-sm text-sm"
      >
        {i18n.language.toUpperCase()}
        <span>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-50">
          <button
            onClick={() => changeLang("en")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            English
          </button>
          <button
            onClick={() => changeLang("de")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Deutsch
          </button>
        </div>
      )}
    </div>
  );
}
