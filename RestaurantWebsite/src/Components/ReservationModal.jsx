import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReservationModal = ({
  show,
  onClose,
  formData = {},        // ✅ DEFAULT VALUE (THIS FIXES ERROR)
  onChange = () => {},  // ✅ SAFE DEFAULT
  onSubmit = () => {},  // ✅ SAFE DEFAULT
  errors = {},
  loading = false,
  status = null,
}) => {

  const { t } = useTranslation();
  const scrollRef = useRef(null);

  /* ================= SAFE TRANSLATION ================= */
  const safeT = (key, fallback) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  /* ================= EFFECTS ================= */

  // Lock background scroll
  useEffect(() => {
    if (!show) return;
  
    document.body.classList.add("modal-open");
  
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);

  // Close on ESC
  useEffect(() => {
    if (!show) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [show, onClose]);

  // Scroll to top on status change
  useEffect(() => {
    if (status?.message && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [status]);

  if (!show) return null;

  /* ================= PLACEHOLDERS (CLEAN) ================= */
  const placeholders = {
    name: safeT("your_name", "Your full name"),
    email: safeT("your_email", "your@email.com"),
    phone: safeT("phone_number", "Phone number"),
    special: safeT(
      "special_requests_optional",
      "Any special requests (optional)"
    ),
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-yellow-500 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold">
            {safeT("book_table", "Book a Table")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="max-h-[72vh] overflow-y-auto px-6 py-5"
        >
          {/* Status Message */}
          {status?.message && (
            <div
              className={`mb-4 p-3 rounded-xl text-sm ${
                status.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                {safeT("name", "Name")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={onChange}
                placeholder={placeholders.name}
                className={`w-full px-4 py-3 border rounded-xl ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                {safeT("email", "Email")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={onChange}
                placeholder={placeholders.email}
                className={`w-full px-4 py-3 border rounded-xl ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                {safeT("phone", "Phone Number")}
              </label>
              <div className="flex gap-3">
                <select
                  name="countryCode"
                  value={formData.countryCode || "+41"}
                  onChange={onChange}
                  className="w-28 px-3 py-3 border rounded-xl bg-white"
                >
                  <option value="+41">+41</option>
                  <option value="+91">+91</option>
                  <option value="+49">+49</option>
                  <option value="+33">+33</option>
                </select>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={onChange}
                  placeholder={placeholders.phone}
                  className={`flex-1 px-4 py-3 border rounded-xl ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  {safeT("date", "Date")}
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ""}
                  onChange={onChange}
                  className={`w-full px-4 py-3 border rounded-xl ${
                    errors.date ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-600 text-xs mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  {safeT("time", "Time")}
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time || ""}
                  onChange={onChange}
                  className={`w-full px-4 py-3 border rounded-xl ${
                    errors.time ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.time && (
                  <p className="text-red-600 text-xs mt-1">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                {safeT("guests", "Guests")}
              </label>
              <select
                name="guests"
                value={formData.guests || "1"}
                onChange={onChange}
                className={`w-full px-4 py-3 border rounded-xl bg-white ${
                  errors.guests ? "border-red-500" : "border-gray-200"
                }`}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={String(n)}>
                    {n}
                  </option>
                ))}
              </select>
              {errors.guests && (
                <p className="text-red-600 text-xs mt-1">{errors.guests}</p>
              )}
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                {safeT("special_requests", "Special Requests")}
              </label>
              <input
                type="text"
                name="specialRequests"
                value={formData.specialRequests || ""}
                onChange={onChange}
                placeholder={placeholders.special}
                className="w-full px-4 py-3 border rounded-xl border-gray-200"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-xl disabled:opacity-70"
            >
              {loading
                ? safeT("submitting", "Submitting...")
                : safeT("confirm_reservation", "Confirm Reservation")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
