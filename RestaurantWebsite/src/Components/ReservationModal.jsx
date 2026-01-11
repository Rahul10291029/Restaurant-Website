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
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder={t("name")}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder={t("email")}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* PHONE */}
          <div className="flex">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={onChange}
              className="px-3 py-2 border border-r-0 rounded-l-lg bg-white"
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
              placeholder={t("phone")}
              className="w-full px-3 py-2 border border-l-0 rounded-r-lg"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}

          <select
            name="guests"
            value={formData.guests}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            {[1,2,3,4,5,6,7,8].map(n => (
              <option key={n} value={n}>{n} {t("guests")}</option>
            ))}
          </select>

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
            className="w-full py-3 bg-yellow-500 text-white rounded-lg"
          >
            {loading ? t("submitting") : t("confirm")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
