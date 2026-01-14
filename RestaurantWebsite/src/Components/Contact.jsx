import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

const HERO_IMG = "/Contact.jpg";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // ✅ For faster hero image display
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Preload hero image
    const img = new Image();
    img.src = HERO_IMG;
    img.onload = () => setHeroLoaded(true);
    img.onerror = () => setHeroLoaded(true); // even if fail, stop loading state
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      

      setSubmitStatus({
        success: true,
        message: t("contact_form_success"),
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        success: false,
        message: t("contact_form_error"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-gray-50 text-gray-800 font-sans">
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* ✅ Fallback background color while loading */}
        <div className="absolute inset-0 bg-gray-200" />

        {/* ✅ Background image with smooth fade-in */}
        <div
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-700 ${
            heroLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center p-6">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("contact_hero_title")}
          </motion.h1>

          <motion.h2
            className="mt-2 text-2xl md:text-3xl font-bold text-white/90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {t("contact_hero_subtitle")}
          </motion.h2>

          <motion.p
            className="mt-4 text-lg md:text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t("contact_hero_tagline")}
          </motion.p>
        </div>
      </div>

      {/* ================= FORM & INFO SECTION ================= */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* CONTACT FORM */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-yellow-100">
            <h2 className="text-3xl font-bold mb-8 border-b pb-4">
              {t("contact_form_title")}
            </h2>

            {submitStatus && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact_form_name_placeholder")}
                className="w-full px-5 py-3 border rounded-xl"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contact_form_email_placeholder")}
                className="w-full px-5 py-3 border rounded-xl"
                required
              />

              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact_form_message_placeholder")}
                className="w-full px-5 py-3 border rounded-xl"
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-xl disabled:opacity-70"
              >
                {isSubmitting
                  ? t("contact_form_submitting")
                  : t("contact_form_button")}
              </button>
            </form>
          </div>

          {/* CONTACT INFO + MAP */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-yellow-100">
            <h2 className="text-3xl font-bold mb-8 border-b pb-4">
              {t("contact_reach_us_title")}
            </h2>

            <div className="space-y-5 text-lg">
              <p>📍 {t("footer_address")}</p>
              <p>📞 {t("footer_phone")}</p>
              <p>✉️ {t("footer_email")}</p>
              <p>🕒 {t("contact_hours")}</p>
            </div>

            <div className="mt-10 rounded-2xl overflow-hidden border">
              <iframe
                title="Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.1360005121182!2d7.556661176035559!3d46.911383271134525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e35b26b86b3cd%3A0xd15e8f9b3b377420!2sSwagat%20Indisches%20Restaurant%20Rubigen!5e1!3m2!1sen!2sin!4v1767599935257!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
