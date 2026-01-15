import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { createReservation } from "../Api/reservationAPI";
import emailjs from "emailjs-com";

/* ===== Styles ===== */
const navItem =
  "group flex items-center gap-2 text-gray-700 hover:text-amber-800 font-medium transition";

const iconClass =
  "text-amber-500 group-hover:text-amber-700 transition";

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
const validateForm = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!emailRegex.test(data.email)) errors.email = "Invalid email format";

  if (!data.phone.trim()) errors.phone = "Phone is required";
  if (!data.date) errors.date = "Date is required";
  if (!data.time) errors.time = "Time is required";
  if (!data.guests || data.guests < 1) errors.guests = "Select guests";

  return errors;
};

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ THIS is the confirmation popup data (success / error)
  const [reservationStatus, setReservationStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+41",
    phone: "",
    date: "",
    time: "",
    guests: "1",
    specialRequests: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      countryCode: "+41",
      phone: "",
      date: "",
      time: "",
      guests: "1",
      specialRequests: "",
    });
    setErrors({});
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

    const validationErrors = validateForm(formData);
    if (!validatePhoneByCountry(formData.countryCode, formData.phone)) {
      validationErrors.phone = `Invalid phone number for ${formData.countryCode}`;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      phone: `${formData.countryCode}${formData.phone}`,
    };

    try {
      await createReservation(payload);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        payload,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // ✅ SHOW SUCCESS MESSAGE INSIDE MODAL
      setReservationStatus({
        success: true,
        message:
          t("reservation_success_message") ||
          "✅ Reservation submitted successfully! We will contact you soon.",
      });

      // ✅ close after delay so user can SEE the confirmation
      setTimeout(() => {
        setShowReservationModal(false);
        setReservationStatus(null);
        resetForm();
      }, 2000);
    } catch (err) {
      // ✅ SHOW ERROR MESSAGE INSIDE MODAL
      setReservationStatus({
        success: false ,
        message:
          t("reservation_error_message") ||
          "❌ Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 -ml-1">
            <img src="/Swagatlogo.png" alt="Swagat Logo" className="h-12 w-auto" />
            <span className="font-extrabold text-amber-800 text-base sm:text-lg md:text-2xl leading-tight">
              Kreuz Pintli Swagat
            </span>
          </Link>

          {/* DESKTOP MENU */}
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
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>

            <button
              onClick={() => {
                setReservationStatus(null);
                setShowReservationModal(true);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-5 py-2 rounded-full"
            >
              {t("book_table")}
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed top-20 left-0 w-full bg-white shadow-md z-40 md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <Home size={18} className="text-amber-500" /> {t("nav_home")}
            </Link>

            <Link to="/menu" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <ShoppingCart size={18} className="text-amber-500" /> {t("nav_menu")}
            </Link>

            <Link to="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <Info size={18} className="text-amber-500" /> {t("nav_about")}
            </Link>

            <Link to="/gallery" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <GalleryIcon size={18} className="text-amber-500" /> {t("nav_gallery")}
            </Link>

            <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <Phone size={18} className="text-amber-500" /> {t("nav_contact")}
            </Link>

            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>

            <button
              onClick={() => {
                setMobileOpen(false);
                setReservationStatus(null);
                setShowReservationModal(true);
              }}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-3 rounded-full"
            >
              {t("book_table")}
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      <ReservationModal
        show={showReservationModal}
        onClose={() => {
          setShowReservationModal(false);
          setReservationStatus(null);
        }}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleReservationSubmit}
        errors={errors}
        loading={loading}
        status={reservationStatus}  // ✅ IMPORTANT
      />
    </>
  );
};

export default Navbar;
