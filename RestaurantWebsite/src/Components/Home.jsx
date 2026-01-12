import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Suspense,
} from "react";
import { Link } from "react-router-dom";
import BgImg from "../Images/View.jpg";
import German1 from "../Images/German1.jpg";
import German2 from "../Images/German2.jpg";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SpecialsSection from "../pages/SpecialSection";

const Home = () => {
  const { t } = useTranslation();

  const specialsRef = useRef(null);
  const footerRef = useRef(null);

  const [showSpecials, setShowSpecials] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  /* ===== Animations ===== */
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.2 } },
  };

  const imageVariantsLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.4 } },
  };

  const imageVariantsRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.6 } },
  };

  /* ===== Observers ===== */
  const handleSpecialsIntersection = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !showSpecials) {
          setShowSpecials(true);
        }
      });
    },
    [showSpecials]
  );

  const handleFooterIntersection = useCallback(([entry]) => {
    setFooterVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const specialsObserver = new IntersectionObserver(
      handleSpecialsIntersection,
      { threshold: 0.1 }
    );
    const footerObserver = new IntersectionObserver(
      handleFooterIntersection,
      { threshold: 0.1 }
    );

    if (specialsRef.current) specialsObserver.observe(specialsRef.current);
    if (footerRef.current) footerObserver.observe(footerRef.current);

    return () => {
      specialsObserver.disconnect();
      footerObserver.disconnect();
    };
  }, [handleSpecialsIntersection, handleFooterIntersection]);

  return (
    <div
      className="relative overflow-hidden bg-scroll md:bg-fixed bg-center bg-cover text-gray-800"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      {/* ================= HERO ================= */}
      <div className="relative flex items-center justify-center py-28 sm:py-32 md:py-40">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-md px-8 sm:px-10 py-12 sm:py-14 rounded-2xl shadow-2xl text-center max-w-5xl mx-4"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold text-yellow-600">
            {t("home_welcome")}
          </h1>

          <h2 className="text-2xl sm:text-4xl mt-4 font-bold text-yellow-600">
            {t("home_subtitle")}
          </h2>

          <p className="text-base sm:text-lg mt-6 text-gray-700">
            {t("home_tagline")}
          </p>

          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-lg font-semibold shadow-xl"
            >
              {t("home_discover_menu")}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* ================= PHILOSOPHY ================= */}
      <section className="py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold text-yellow-600 mb-6"
          >
            {t("home_our_philosophy")}
          </motion.h2>

          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg max-w-3xl mx-auto text-gray-800 mb-12"
          >
            {t("home_philosophy_text")}
          </motion.p>

          <div className="flex flex-col md:flex-row justify-center gap-10">
            <motion.img
              variants={imageVariantsLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              src={German1}
              alt="Dish"
              className="rounded-3xl shadow-xl w-full md:w-1/2 h-72 object-cover border-4 border-yellow-100"
            />
            <motion.img
              variants={imageVariantsRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              src={German2}
              alt="Interior"
              className="rounded-3xl shadow-xl w-full md:w-1/2 h-72 object-cover border-4 border-yellow-100"
            />
          </div>

          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 px-10 py-4 bg-amber-700 hover:bg-amber-800 text-white rounded-full font-semibold"
            >
              {t("home_learn_more")}
            </motion.button>
          </Link>
        </div>
      </section>

      {/* ================= SPECIALS ================= */}
      <div ref={specialsRef}>
        {showSpecials && (
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <SpecialsSection />
          </Suspense>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <footer
        ref={footerRef}
        className="bg-gradient-to-t from-yellow-100 to-white rounded-t-[50px]"
      >
        <div
          className={`max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-3 gap-14 transition-all duration-700 ${
            footerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          <div>
            <h3 className="text-4xl font-extrabold text-yellow-600 mb-5">
              {t("footer_title")}
            </h3>
            <p>{t("footer_description")}</p>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-4">
              {t("footer_quick_links")}
            </h4>
            <ul className="space-y-3">
              <li><Link to="/">{t("nav_home")}</Link></li>
              <li><Link to="/menu">{t("nav_menu")}</Link></li>
              <li><Link to="/about">{t("nav_about")}</Link></li>
              <li><Link to="/contact">{t("nav_contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-4">
              {t("footer_visit_us")}
            </h4>
            <ul className="space-y-3">
              <li>📍 {t("footer_address")}</li>
              <li>📞 {t("footer_phone")}</li>
              <li>✉️ {t("footer_email")}</li>
              <li>🕒 {t("footer_hours")}</li>
            </ul>
          </div>
        </div>

        <div className="text-center py-6 border-t bg-white text-sm">
          © {new Date().getFullYear()} {t("footer_title")} ·{" "}
          {t("footer_rights")}
        </div>
      </footer>
    </div>
  );
};

export default Home;
