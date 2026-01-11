import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-yellow-500"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
          {t("book_table")}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {["name", "email", "phone", "date", "time"].map((field) => (
            <div key={field}>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "date"
                    ? "date"
                    : field === "time"
                    ? "time"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={onChange}
                placeholder={t(field)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          {/* Guests */}
          <div>
            <select
              name="guests"
              value={formData.guests}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {t("guests")}
                </option>
              ))}
            </select>
            {errors.guests && (
              <p className="text-red-500 text-sm mt-1">
                {errors.guests}
              </p>
            )}
          </div>

          {/* Special Requests */}
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={onChange}
            placeholder={t("special_requests")}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
          >
            {loading ? t("submitting") : t("confirm")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
