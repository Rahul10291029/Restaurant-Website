import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Home,
  Info,
  ShoppingCart,
  Image as GalleryIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ReservationModal from "./ReservationModal";
import emailjs from "@emailjs/browser";

/* ===== Styles ===== */
const navItem =
  "group flex items-center gap-2 text-gray-700 hover:text-amber-800 font-medium transition";
const iconClass = "text-amber-500 group-hover:text-amber-700 transition";

/* ===== COUNTRY PHONE VALIDATION ===== */
const validatePhoneByCountry = (countryCode, phone) => {
  const digits = phone.replace(/\D/g, "");
  switch (countryCode) {
    case "+91":
      return digits.length === 10;
    case "+41":
      return digits.length === 9;
    case "+33":
      return digits.length === 9;
    case "+49":
      return digits.length >= 10 && digits.length <= 11;
    default:
      return false;
  }
};

/* ===== BASIC FORM VALIDATION ===== */
const validateForm = (data, t) => {
  const errors = {};
  if (!data.name.trim()) errors.name = t("name_required") || "Name is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim())
    errors.email = t("email_required") || "Email is required";
  else if (!emailRegex.test(data.email))
    errors.email = t("invalid_email") || "Invalid email format";

  if (!data.phone.trim())
    errors.phone = t("phone_required") || "Phone is required";
  if (!data.date) errors.date = t("date_required") || "Date is required";
  if (!data.time) errors.time = t("time_required") || "Time is required";
  if (!data.guests || Number(data.guests) < 1)
    errors.guests = t("guests_required") || "Select guests";

  return errors;
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    Cookies.set("lang", lang, { expires: 365 });
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [reservationStatus, setReservationStatus] = useState(null);

  // ✅ init emailjs once (important!)
  useEffect(() => {
    const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (pk) emailjs.init(pk);
  }, []);

  const initialFormRef = useRef({
    name: "",
    email: "",
    countryCode: "+41",
    phone: "",
    date: "",
    time: "",
    guests: "1",
    specialRequests: "",
  });

  const [formData, setFormData] = useState(initialFormRef.current);

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
    routeLabelMap[location.pathname] ||
    (location.pathname === "/"
      ? t("nav_home")
      : location.pathname.replace("/", ""));

  const resetForm = () => {
    setFormData(initialFormRef.current);
    setErrors({});
  };

  const openReservation = () => {
    resetForm();
    setReservationStatus(null);
    setShowReservationModal(true);
  };

  const closeReservation = () => {
    setShowReservationModal(false);
    setReservationStatus(null);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setReservationStatus(null);

    const validationErrors = validateForm(formData, t);

    if (!validatePhoneByCountry(formData.countryCode, formData.phone)) {
      validationErrors.phone =
        t("invalid_phone") ||
        `Invalid phone number for ${formData.countryCode}`;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setReservationStatus({
        success: false,
        message: t("reservation_fix_errors") || "Please fix the errors above.",
      });
      setLoading(false);
      return;
    }

    const payload = {
      to_email: "contact@kreuzpintli-swagat.ch",
      name: formData.name,
      email: formData.email,
      phone: `${formData.countryCode}${formData.phone}`,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      specialRequests: formData.specialRequests,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        payload
        // ✅ public key not needed here because we used emailjs.init()
      );

      setReservationStatus({
        success: true,
        message:
          t("reservation_success_message") ||
          "✅ Reservation sent successfully! We will contact you soon.",
      });

      setTimeout(() => {
        closeReservation();
      }, 1800);
    } catch (err) {
      console.error("EmailJS error:", err);
      setReservationStatus({
        success: false,
        message:
          t("reservation_error_message") ||
          "❌ Could not send reservation. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-[1400px] mx-auto px-10 h-20 flex justify-between items-center">
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

            <div className="flex items-center">
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="de">Deutsch</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <Link to="/" className="hidden md:flex items-center gap-2 -ml-6">
            <img
              src="/Swagatlogo.png"
              alt="Swagat Logo"
              className="h-12 w-auto"
            />
            <span className="font-extrabold text-amber-800 text-base sm:text-lg md:text-2xl leading-tight whitespace-nowrap">
              Kreuz Pintli Swagat
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10 ml-10">
            <Link to="/" className={navItem}>
              <Home size={18} className={iconClass} /> {t("nav_home")}
            </Link>
            <Link to="/menu" className={navItem}>
              <ShoppingCart size={18} className={iconClass} /> {t("nav_menu")}
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
              onChange={(e) =>changeLanguage(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>

            <button
              onClick={openReservation}
              className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-5 py-2 rounded-full"
            >
              {t("book_table")}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed top-20 left-0 w-full bg-white shadow-md z-40 md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link to="/" className="flex items-center gap-3">
              <Home size={18} className="text-amber-500" /> {t("nav_home")}
            </Link>
            <Link to="/menu" className="flex items-center gap-3">
              <ShoppingCart size={18} className="text-amber-500" />{" "}
              {t("nav_menu")}
            </Link>
            <Link to="/about" className="flex items-center gap-3">
              <Info size={18} className="text-amber-500" /> {t("nav_about")}
            </Link>
            <Link to="/gallery" className="flex items-center gap-3">
              <GalleryIcon size={18} className="text-amber-500" />{" "}
              {t("nav_gallery")}
            </Link>
            <Link to="/contact" className="flex items-center gap-3">
              <Phone size={18} className="text-amber-500" /> {t("nav_contact")}
            </Link>

            <button
              onClick={() => {
                setMobileOpen(false);
                openReservation();
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
        onClose={closeReservation}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleReservationSubmit}
        errors={errors}
        loading={loading}
        status={reservationStatus}
      />
    </>
  );
};

export default Navbar;
