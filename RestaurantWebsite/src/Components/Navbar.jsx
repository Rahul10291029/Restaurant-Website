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
const validateForm = (data, safeT) => {
  const errors = {};

  if (!data.name.trim())
    errors.name = safeT("name_required", "Name is required");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim())
    errors.email = safeT("email_required", "Email is required");
  else if (!emailRegex.test(data.email))
    errors.email = safeT("invalid_email", "Invalid email format");

  if (!data.phone.trim())
    errors.phone = safeT("phone_required", "Phone number is required");

  if (!data.date)
    errors.date = safeT("date_required", "Date is required");

  if (!data.time)
    errors.time = safeT("time_required", "Time is required");

  if (!data.guests || Number(data.guests) < 1)
    errors.guests = safeT("guests_required", "Select number of guests");

  return errors;
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  /* ===== SAFE TRANSLATION (KEY NEVER SHOWN) ===== */
  const safeT = (key, fallback) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  /* ===== LANGUAGE ===== */
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    Cookies.set("lang", lang, { expires: 365 });
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [reservationStatus, setReservationStatus] = useState(null);

  /* ===== EMAIL INIT ===== */
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

  /* ===== SUBMIT ===== */
  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setReservationStatus(null);

    const validationErrors = validateForm(formData, safeT);

    if (!validatePhoneByCountry(formData.countryCode, formData.phone)) {
      validationErrors.phone = safeT(
        "invalid_phone",
        "Please enter a valid phone number"
      );
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setReservationStatus({
        success: false,
        message: safeT(
          "reservation_fix_errors",
          "Please fill in the highlighted fields correctly"
        ),
      });
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: "contact@kreuzpintli-swagat.ch",
          ...formData,
          phone: `${formData.countryCode}${formData.phone}`,
        }
      );

      setReservationStatus({
        success: true,
        message: safeT(
          "reservation_success_message",
          "Reservation sent successfully! We will contact you soon."
        ),
      });

      setTimeout(closeReservation, 1800);
    } catch (err) {
      setReservationStatus({
        success: false,
        message: safeT(
          "reservation_error_message",
          "Could not send reservation. Please try again."
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-[1400px] mx-auto px-10 h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="/Swagatlogo.png" alt="Swagat Logo" className="h-12" />
            <span className="font-extrabold text-amber-800 text-xl">
              Kreuz Pintli Swagat
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
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
              value={i18n.language.split("-")[0]}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>

            <button
              onClick={openReservation}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full"
            >
              {t("book_table")}
            </button>
          </div>
        </div>
      </nav>

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
