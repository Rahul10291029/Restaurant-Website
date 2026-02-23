import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

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

  // ✅ Footer state
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  // ✅ Copy status
  const [copied, setCopied] = useState(false);

  // ✅ Phone numbers
  const phones = [
    { raw: "+41766298876", display: "+41 76 629 8876" },
    { raw: "0318392440", display: "031 839 24 40" }
  ];

  // ✅ init EmailJS once (prevents "user id required" issues)
  useEffect(() => {
    const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (pk) emailjs.init(pk);
  }, []);

  // ✅ Footer observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFooterVisible(true);
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ preload hero image
  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMG;
    img.onload = () => setHeroLoaded(true);
    img.onerror = () => setHeroLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyPhone = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      alert("Copy not supported. Please copy manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        // ✅ Optional: only works if your EmailJS template uses {{to_email}}
        to_email: "contact@kreuzpintli-swagat.ch",

        // ✅ these must match your template variables
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,

        // ✅ add some fun extras (add these in template if you want)
        subject: "📩 New message from website",
        emoji_line: "✨ New Contact Request ✨",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        templateParams
        // ✅ no public key here because we already did emailjs.init()
      );

      setSubmitStatus({
        success: true,
        message:
          t("contact_form_success") ||
          "✅ Sent! Thanks for your message — we’ll reply soon 😊",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        success: false,
        message:
          t("contact_form_error") ||
          "❌ Something went wrong. Please try again 🙏",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className=" bg-gradient-to-br from-yellow-50 via-white to-gray-50 text-gray-800 font-sans">
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[260px] sm:h-[320px] md:h-[380px] flex items-center justify-center">

        {/* fallback bg while loading */}
        <div className="absolute inset-0 bg-gray-200" />

        {/* hero image */}
        <div
          className={`absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-700 ${
            heroLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-5">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("contact_hero_title") || "Contact Us 📞"}
          </motion.h1>

          <motion.h2
            className="mt-2 text-lg sm:text-xl md:text-3xl font-bold text-white/90"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {t("contact_hero_subtitle") || "We’d love to hear from you 😊"}
          </motion.h2>

          <motion.p
            className="mt-3 text-sm sm:text-base md:text-xl text-white/90 max-w-2xl"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t("contact_hero_tagline") ||
              "Send us a message — we’ll reply as soon as possible ✨"}
          </motion.p>
        </div>
      </div>

      {/* ================= FORM & INFO SECTION ================= */}
      <section className="py-14 px-5 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {/* CONTACT FORM */}
          <div className="bg-white p-7 sm:p-10 rounded-3xl shadow-xl border border-yellow-100">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 border-b pb-4">
              {t("contact_form_title") || "Send Us a Message 💬"}
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact_form_name_placeholder") || "Your Name"}
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />

              <input
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={
                  t("contact_form_email_placeholder") || "Your Email"
                }
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />

              <textarea
                rows="6"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                placeholder={
                  t("contact_form_message_placeholder") || "Your Message..."
                }
                className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-xl disabled:opacity-70 transition"
              >
                {isSubmitting
                  ? t("contact_form_submitting") || "Sending... ✨"
                  : t("contact_form_button") || "Send Message 🚀"}
              </button>
            </form>
          </div>

          {/* CONTACT INFO + MAP */}
          <div className="bg-white p-7 sm:p-10 rounded-3xl shadow-xl border border-yellow-100">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 border-b pb-4">
              {t("contact_reach_us_title") || "Reach Us 📍"}
            </h2>

            <div className="space-y-5 text-base sm:text-lg">
              <p>📍 {t("footer_address")}</p>

              {/* CLICK TO CALL + COPY */}
              <div className="space-y-4">
                {phones.map((phone, idx) => (
                  <div key={idx} className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg">📞</span>

                    <a
                      href={`tel:${phone.raw}`}
                      className="font-semibold text-gray-900 underline underline-offset-4 hover:text-yellow-600 transition"
                      title="Tap to call"
                    >
                      {phone.display}
                    </a>

                    <button
                      onClick={() => handleCopyPhone(phone.display)}
                      type="button"
                      className="px-3 py-1 rounded-lg border text-sm bg-white hover:bg-gray-50 shadow-sm transition"
                    >
                      {copied === phone.display ? "Copied ✅" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Email clickable */}
              <p>
                ✉️{" "}
                <a
                  href={`mailto:${t("footer_email")}`}
                  className="font-semibold text-gray-900 underline underline-offset-4 hover:text-yellow-600 transition"
                >
                  {t("footer_email")}
                </a>
              </p>

              <p className="whitespace-pre-line font-medium">🕒 {t("contact_hours")}</p>
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
      {/* ================= FOOTER ================= */}
      <footer
        ref={footerRef}
        className="mt-20 bg-gradient-to-t from-yellow-50 to-white shadow-inner rounded-t-3xl overflow-hidden"
      >
        <div
          className={`max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-700 ${
            footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* LEFT */}
          <div>
            <h3 className="text-3xl font-extrabold text-amber-800 mb-4">
              {t("footer_title")}
            </h3>
            <p className="text-gray-600">{t("footer_description")}</p>
          </div>

          {/* CENTER */}
          <div>
            <h4 className="text-xl font-bold mb-4">{t("footer_quick_links")}</h4>
            <ul className="space-y-2">
              {[
                { label: t("nav_home"), path: "/" },
                { label: t("nav_menu"), path: "/menu" },
                { label: t("nav_about"), path: "/about" },
                { label: t("nav_contact"), path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-amber-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h4 className="text-xl font-bold mb-4">{t("footer_visit_us")}</h4>
            <ul className="space-y-3">
              <li className="flex gap-2">
                📍 <span>{t("footer_address")}</span>
              </li>

              {/* Phone numbers on separate rows */}
              <li className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  📞
                  <a
                    href={`tel:${t("footer_phone_1_raw")}`}
                    className="font-semibold text-amber-700 text-lg hover:underline"
                  >
                    {t("footer_phone_1")}
                  </a>
                </div>
                <div className="flex items-center gap-2 ml-7">
                  <a
                    href={`tel:${t("footer_phone_2_raw")}`}
                    className="font-semibold text-amber-700 text-lg hover:underline"
                  >
                    {t("footer_phone_2")}
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2">
                ✉️
                <a
                  href={`mailto:${t("footer_email")}`}
                  className="font-semibold text-amber-700 hover:underline"
                >
                  {t("footer_email")}
                </a>
              </li>

              <li className="mt-1">
                <span className="font-semibold text-amber-800">🕒 Opening Hours</span>
                <p className="mt-1 ml-6 whitespace-pre-line text-sm text-gray-700">
                  {t("footer_hours")}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center py-5 text-sm border-t border-amber-100">
          © {new Date().getFullYear()} {t("footer_title")} · {t("footer_rights")}
        </div>
      </footer>
    </div>
  );
};

export default Contact;
