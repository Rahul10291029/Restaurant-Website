import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const About = () => {
  const { t } = useTranslation();
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const animateFadeUp = (visible) =>
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";

  const Triangle = ({ position, isVisible }) => {
    const base = "w-full h-8";
    const shape = position === "top" ? "rounded-b-full" : "rounded-t-full";
    const transform = position === "top" ? "rotate-180" : "";
    return (
      <div
        className={`${base} ${shape} ${transform} bg-yellow-50 transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    );
  };

  return (
    <div className="bg-white text-gray-800">
      {/* ================= HERO SECTION ================= */}
      <div className="relative">
        <img
          src={"/BGIMG.jpg"}
          alt={t("about_hero_alt")}
          className="w-full h-[400px] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          {/* TITLE */}
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {t("about_hero_title")}
          </motion.h1>

          {/* SUBTITLE */}
          <motion.h2
            className="mt-2 text-2xl md:text-3xl font-bold text-white/90"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {t("about_hero_subtitle")}
          </motion.h2>

          {/* TAGLINE */}
          <motion.p
            className="mt-4 text-lg md:text-xl text-white/80 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {t("about_hero_tagline")}
          </motion.p>
        </div>
      </div>

      {/* ================= OUR STORY ================= */}
      <section className="px-6 md:px-20 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            {t("about_story_title")}
          </h2>
          <p className="text-lg leading-8 text-gray-700">
            {t("about_story_text")}
          </p>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t("about_why_choose_us_title")}</h2>
          <p className="mt-2 text-gray-600">{t("about_why_choose_us_subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              titleKey: "about_value_authentic_title",
              descKey: "about_value_authentic_desc",
              icon: "🍛",
            },
            {
              titleKey: "about_value_ambience_title",
              descKey: "about_value_ambience_desc",
              icon: "🪔",
            },
            {
              titleKey: "about_value_service_title",
              descKey: "about_value_service_desc",
              icon: "👨‍🍳",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{t(item.titleKey)}</h3>
              <p className="text-gray-700">{t(item.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ATMOSPHERE ================= */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            {t("about_atmosphere_title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.img
              src="/Platter.jpg"
              alt={t("about_atmosphere_img1_alt")}
              className="w-full h-80 object-cover rounded-xl shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            <motion.img
              src="/Platter2.jpg"
              alt={t("about_atmosphere_img2_alt")}
              className="w-full h-80 object-cover rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <p className="text-center text-lg leading-8 text-gray-700 mt-12 max-w-4xl mx-auto">
            {t("about_atmosphere_text")}
          </p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
  ref={footerRef}
  className="mt-20 bg-gradient-to-t from-yellow-50 to-white shadow-inner rounded-t-3xl overflow-hidden"
>
  <Triangle position="top" isVisible={footerVisible} />

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
      <p className="text-gray-600">
        {t("footer_description")}
      </p>
    </div>

    {/* CENTER */}
    <div>
      <h4 className="text-xl font-bold mb-4">
        {t("footer_quick_links")}
      </h4>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="hover:text-yellow-600">
            {t("nav_home")}
          </Link>
        </li>
        <li>
          <Link to="/menu" className="hover:text-yellow-600">
            {t("nav_menu")}
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-yellow-600">
            {t("nav_about")}
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-yellow-600">
            {t("nav_contact")}
          </Link>
        </li>
      </ul>
    </div>

    {/* RIGHT */}
    <div>
      <h4 className="text-xl font-bold mb-4">
        {t("footer_visit_us")}
      </h4>

      <ul className="space-y-3">
        {/* Address */}
        <li className="flex gap-2">
          📍 <span>{t("footer_address")}</span>
        </li>

        {/* Phone – clickable dialer */}
        <li className="flex items-center gap-2">
          📞
          <a
            href={`tel:${t("footer_phone_raw")}`}
            className="font-semibold text-amber-700 text-lg hover:underline"
          >
            {t("footer_phone")}
          </a>
        </li>

        {/* Email – clickable mail app */}
        <li className="flex items-center gap-2">
          ✉️
          <a
            href={`mailto:${t("footer_email")}`}
            className="font-semibold text-amber-700 hover:underline"
          >
            {t("footer_email")}
          </a>
        </li>

        {/* Hours */}
        <li className="flex gap-2">
          🕒 <span>{t("footer_hours")}</span>
        </li>
      </ul>
    </div>
  </div>

  {/* COPYRIGHT */}
  <div className="text-center py-5 text-sm border-t">
    © {new Date().getFullYear()} {t("footer_title")} · {t("footer_rights")}
  </div>

  <Triangle position="bottom" isVisible={footerVisible} />
</footer>

    </div>
  );
};

export default About;
