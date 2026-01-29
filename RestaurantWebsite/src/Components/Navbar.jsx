import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Menu,
  X,
  Phone,
  Home,
  Info,
  Image as GalleryIcon,
  Utensils, // ✅ MENU ICON
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ReservationModal from "./ReservationModal";
import emailjs from "@emailjs/browser";

/* ===== Styles ===== */
const navItem =
  "group flex items-center gap-2 text-gray-700 hover:text-amber-800 font-medium transition";
const iconClass = "text-amber-500 group-hover:text-amber-700 transition";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    Cookies.set("lang", lang, { expires: 365 });
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);

  useEffect(() => {
    const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (pk) emailjs.init(pk);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const routeLabelMap = {
    "/": t("nav_home"),
    "/menu": t("nav_menu"),
    "/about": t("nav_about"),
    "/gallery": t("nav_gallery"),
    "/contact": t("nav_contact"),
  };

  const currentPageLabel =
    routeLabelMap[location.pathname] || t("nav_home");

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-[1400px] mx-auto px-10 h-20 flex justify-between items-center">

          {/* ===== MOBILE HEADER ===== */}
          <div className="flex items-center w-full md:hidden justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 -ml-2"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={28} /> : <Menu size={28} />}
              </button>

              <span className="text-sm font-semibold text-gray-800 truncate">
                {currentPageLabel}
              </span>
            </div>

            <LanguageSwitcher />
          </div>

          {/* ===== LOGO ===== */}
          <Link to="/" className="hidden md:flex items-center gap-2 -ml-6">
            <img
              src="/Swagatlogo.png"
              alt="Swagat Logo"
              className="h-12 w-auto"
            />
            <span className="font-extrabold text-amber-800 text-base sm:text-lg md:text-2xl whitespace-nowrap">
              Kreuz Pintli Swagat
            </span>
          </Link>

          {/* ===== DESKTOP NAV ===== */}
          <div className="hidden md:flex items-center gap-10 ml-10">
            <Link to="/" className={navItem}>
              <Home size={18} className={iconClass} /> {t("nav_home")}
            </Link>

            {/* ✅ MENU ICON (UTENSILS) */}
            <Link to="/menu" className={navItem}>
              <Utensils size={18} className={iconClass} /> {t("nav_menu")}
            </Link>

            <Link to="/about" className={navItem}>
              <Info size={18} className={iconClass} /> {t("nav_about")}
            </Link>

            <Link to="/gallery" className={navItem}>
              <GalleryIcon size={18} className={iconClass} /> {t("nav_gallery")}
            </Link>

            <Link to="/contact" className={navItem}>
              <Phone size={18} className={iconClass} /> {t("nav_contact")}
            </Link>

            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>

            <button
              onClick={() => setShowReservationModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-5 py-2 rounded-full"
            >
              {t("book_table")}
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      {mobileOpen && (
        <div className="fixed top-20 left-0 w-full bg-white shadow-md z-40 md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link to="/" className="flex items-center gap-3">
              <Home size={18} className="text-amber-500" /> {t("nav_home")}
            </Link>

            {/* ✅ MENU ICON (UTENSILS) */}
            <Link to="/menu" className="flex items-center gap-3">
              <Utensils size={18} className="text-amber-500" />
              {t("nav_menu")}
            </Link>

            <Link to="/about" className="flex items-center gap-3">
              <Info size={18} className="text-amber-500" /> {t("nav_about")}
            </Link>

            <Link to="/gallery" className="flex items-center gap-3">
              <GalleryIcon size={18} className="text-amber-500" /> {t("nav_gallery")}
            </Link>

            <Link to="/contact" className="flex items-center gap-3">
              <Phone size={18} className="text-amber-500" /> {t("nav_contact")}
            </Link>

            <button
              onClick={() => {
                setMobileOpen(false);
                setShowReservationModal(true);
              }}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-3 rounded-full"
            >
              {t("book_table")}
            </button>
          </div>
        </div>
      )}

      <ReservationModal
        show={showReservationModal}
        onClose={() => setShowReservationModal(false)}
      />
    </>
  );
};

export default Navbar;
