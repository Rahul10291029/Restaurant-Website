import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Field = ({ label, error, children }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const ReservationModal = ({
  show,
  onClose,
  formData,
  onChange,
  onSubmit,
  errors,
  loading,
}) => {
  const { t } = useTranslation();
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-yellow-500"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-yellow-600 mb-6">
          {t("book_table")}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">

          {/* NAME */}
          <Field label={t("name")} error={errors.name}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </Field>

          {/* EMAIL */}
          <Field label={t("email")} error={errors.email}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </Field>

          {/* PHONE */}
          <Field label={t("phone")} error={errors.phone}>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={onChange}
                className="px-3 py-3 border border-r-0 rounded-l-lg bg-white focus:ring-2 focus:ring-yellow-400 outline-none"
              >
                <option value="+41">+41</option>
                <option value="+91">+91</option>
                <option value="+33">+33</option>
                <option value="+49">+49</option>
              </select>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                className="w-full px-4 py-3 border border-l-0 rounded-r-lg text-base focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
          </Field>

          {/* DATE */}
          <Field label={t("date")} error={errors.date}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </Field>

          {/* TIME */}
          <Field label={t("time")} error={errors.time}>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </Field>

          {/* GUESTS */}
          <Field label={t("guests")} error={errors.guests}>
            <select
              name="guests"
              value={formData.guests}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              {[1,2,3,4,5,6,7,8].map(n => (
                <option key={n} value={n}>{n} {t("guests")}</option>
              ))}
            </select>
          </Field>

          {/* SPECIAL REQUESTS */}
          <Field label={t("special_requests")}>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={onChange}
              rows="3"
              className="w-full px-4 py-3 border rounded-lg text-base focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </Field>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 text-white rounded-lg text-base font-medium hover:bg-yellow-600 transition"
          >
            {loading ? t("submitting") : t("confirm")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
