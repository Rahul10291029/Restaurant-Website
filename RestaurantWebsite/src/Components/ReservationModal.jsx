import React from "react";
import { X, Calendar, Clock, Users, Phone, Mail, User2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const Field = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      {Icon ? <Icon size={16} className="text-yellow-600" /> : null}
      {label}
    </label>
    {children}
    {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
  </div>
);

const ReservationModal = ({
  show,
  onClose,
  formData,
  onChange,
  onSubmit,
  errors = {},
  loading,
  status, // ✅ NEW (from Navbar)
}) => {
  const { t } = useTranslation();
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* modal wrapper */}
      <div className="relative z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-yellow-100 overflow-hidden mt-10 sm:mt-14">
          {/* Header */}
          <div className="relative px-6 py-5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition"
              aria-label="Close"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
              🍽️ {t("book_table")}
            </h2>
            <p className="text-white/90 text-sm mt-1">
              {t("reservation_subtitle") || "We’ll confirm your booking soon."}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {/* ✅ Status message (success/error) */}
            {status && (
              <div
                className={`mb-5 rounded-xl p-4 text-sm font-medium border ${
                  status.success
                    ? "bg-green-50 text-green-800 border-green-200"
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              {/* NAME */}
              <Field label={t("name")} icon={User2} error={errors.name}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder={t("your_name") || "Your name"}
                  className={`w-full px-4 py-3 rounded-xl text-base outline-none transition
                    border ${errors.name ? "border-red-400" : "border-gray-200"}
                    focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400`}
                />
              </Field>

              {/* EMAIL */}
              <Field label={t("email")} icon={Mail} error={errors.email}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  placeholder={t("your_email") || "you@example.com"}
                  className={`w-full px-4 py-3 rounded-xl text-base outline-none transition
                    border ${errors.email ? "border-red-400" : "border-gray-200"}
                    focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400`}
                />
              </Field>

              {/* PHONE */}
              <Field label={t("phone")} icon={Phone} error={errors.phone}>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={onChange}
                    className="px-3 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="+41">+41</option>
                    <option value="+49">+49</option>
                    <option value="+33">+33</option>
                    <option value="+91">+91</option>
                  </select>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={onChange}
                    placeholder={t("phone_placeholder") || "Phone number"}
                    className={`w-full px-4 py-3 rounded-xl text-base outline-none transition
                      border ${errors.phone ? "border-red-400" : "border-gray-200"}
                      focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400`}
                  />
                </div>
              </Field>

              {/* DATE & TIME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t("date")} icon={Calendar} error={errors.date}>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={onChange}
                    className={`w-full px-4 py-3 rounded-xl text-base outline-none transition
                      border ${errors.date ? "border-red-400" : "border-gray-200"}
                      focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400`}
                  />
                </Field>

                <Field label={t("time")} icon={Clock} error={errors.time}>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={onChange}
                    className={`w-full px-4 py-3 rounded-xl text-base outline-none transition
                      border ${errors.time ? "border-red-400" : "border-gray-200"}
                      focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400`}
                  />
                </Field>
              </div>

              {/* GUESTS */}
              <Field label={t("guests")} icon={Users} error={errors.guests}>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={onChange}
                  className={`w-full px-4 py-3 rounded-xl text-base outline-none transition bg-white
                    border ${errors.guests ? "border-red-400" : "border-gray-200"}
                    focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400`}
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? (t("guest") || "Guest") : (t("guests") || "Guests")}
                    </option>
                  ))}
                </select>
              </Field>

              {/* SPECIAL REQUESTS */}
              <Field label={t("special_requests")} icon={User2}>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={onChange}
                  rows="3"
                  placeholder={t("special_placeholder") || "Allergies, birthday, window seat..."}
                  className="w-full px-4 py-3 rounded-xl text-base outline-none transition border border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
                />
              </Field>

              {/* Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="w-1/3 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-70"
                >
                  {t("cancel") || "Cancel"}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 py-3 bg-yellow-500 text-white rounded-xl text-base font-bold hover:bg-yellow-600 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? (t("submitting") || "Submitting...") : (t("confirm") || "Confirm")}
                </button>
              </div>

              <p className="text-[11px] text-gray-500 pt-1">
                {t("reservation_note") ||
                  "We may contact you to confirm your reservation."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
