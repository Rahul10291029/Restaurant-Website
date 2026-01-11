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
    case "+91": return digits.length === 10;      // India
    case "+41": return digits.length === 9;       // Switzerland (CH)
    case "+33": return digits.length === 9;       // France
    case "+49": return digits.length >= 10 && digits.length <= 11; // Germany
    default: return false;
  }
};

/* ===== BASIC FORM VALIDATION ===== */
const validateForm = (data) => {
  const errors = {};

  if (!data.name.trim()) errors.name = "Name is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!emailRegex.test(data.email))
    errors.email = "Invalid email format";

  if (!data.phone.trim()) errors.phone = "Phone is required";
  if (!data.date) errors.date = "Date is required";
  if (!data.time) errors.time = "Time is required";
  if (!data.guests || data.guests < 1)
    errors.guests = "Select guests";

  return errors;
};

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+41", // CH default
    phone: "",
    date: "",
    time: "",
    guests: "1",
    specialRequests: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = validateForm(formData);

    // 🔥 COUNTRY-AWARE PHONE CHECK
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

      alert(t("reservation_success_message"));

      setShowReservationModal(false);
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
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/Swagatlogo.png" alt="Logo" className="h-12 w-16" />
            <div>
              <div className="text-2xl font-bold text-amber-800">Swagat</div>
              <div className="text-sm text-gray-500">Indian Restaurant</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={navItem}><Home size={18} className={iconClass} /> {t("nav_home")}</Link>
            <Link to="/menu" className={navItem}><ShoppingCart size={18} className={iconClass} /> {t("nav_menu")}</Link>
            <Link to="/about" className={navItem}><Info size={18} className={iconClass} /> {t("nav_about")}</Link>
            <Link to="/gallery" className={navItem}><GalleryIcon size={18} className={iconClass} /> {t("nav_gallery")}</Link>
            <Link to="/contact" className={navItem}><Phone size={18} className={iconClass} /> {t("nav_contact")}</Link>

            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>

            <button
              onClick={() => setShowReservationModal(true)}
              className="bg-yellow-500 text-white px-6 py-3 rounded-full"
            >
              {t("book_table")}
            </button>
          </div>
        </div>
      </nav>

      <ReservationModal
        show={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleReservationSubmit}
        errors={errors}
        loading={loading}
      />
    </>
  );
};

export default Navbar;
