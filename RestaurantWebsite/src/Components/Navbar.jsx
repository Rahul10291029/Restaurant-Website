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

/* ===== Validation ===== */
const validateForm = (data) => {
  const errors = {};

  if (!data.name.trim()) errors.name = "Name is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!emailRegex.test(data.email))
    errors.email = "Invalid email format";

  const phoneRegex = /^[0-9]{10}$/;
  if (!data.phone.trim()) errors.phone = "Phone is required";
  else if (!phoneRegex.test(data.phone))
    errors.phone = "Phone must be 10 digits";

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
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await createReservation(formData);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          ...formData,
          specialRequests:
            formData.specialRequests || "No special request",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert(
        t("reservation_success_message", {
          name: formData.name,
          date: formData.date,
          time: formData.time,
        })
      );

      setShowReservationModal(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "1",
        specialRequests: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/Swagatlogo.png"
              alt="Logo"
              className="h-12 w-16 object-contain"
            />
            <div>
              <div className="text-2xl font-bold text-amber-800">
                Swagat
              </div>
              <div className="text-sm text-gray-500">
                Indian Restaurant
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
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

            {/* Language Switch */}
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

            {/* Reservation Button */}
            <button
              onClick={() => setShowReservationModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md"
            >
              {t("book_table")}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 py-5 space-y-5">
            <Link to="/" onClick={() => setMobileOpen(false)} className={navItem}>
              <Home size={18} className={iconClass} /> Home
            </Link>
            <Link to="/menu" onClick={() => setMobileOpen(false)} className={navItem}>
              <ShoppingCart size={18} className={iconClass} /> Menu
            </Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className={navItem}>
              <Info size={18} className={iconClass} /> About
            </Link>
            <Link to="/gallery" onClick={() => setMobileOpen(false)} className={navItem}>
              <GalleryIcon size={18} className={iconClass} /> Gallery
            </Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className={navItem}>
              <Phone size={18} className={iconClass} /> Contact
            </Link>

            <button
              onClick={() => {
                setShowReservationModal(true);
                setMobileOpen(false);
              }}
              className="w-full bg-yellow-500 text-white py-3 rounded-full font-semibold"
            >
              {t("book_table")}
            </button>
          </div>
        )}
      </nav>

      {/* ===== RESERVATION MODAL ===== */}
      <ReservationModal
        show={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleReservationSubmit}
        errors={errors}
        loading={loading}
        t={t}
      />
    </>
  );
};

export default Navbar;
