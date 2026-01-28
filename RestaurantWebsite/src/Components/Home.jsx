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

  /* ===== Animations (UNCHANGED) ===== */
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

  /* ===== Observers (UNCHANGED) ===== */
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
    // ✅ Keep page clean (no full background image). Hero will have bg image.
    <div className="bg-white text-gray-800 font-sans">
      {/* ✅ Fix white line / overlap due to fixed navbar */}
      <div className="pt-20">
        {/* ================= HERO (Contact style, ONLY hero has bg image) ================= */}
        <section className="relative">
          <div className="relative h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${BgImg})` }}
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 text-center px-6">
              <motion.h1
                className="text-4xl md:text-6xl font-extrabold text-white"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t("home_welcome")}
              </motion.h1>

              <motion.h2
                className="mt-2 text-2xl md:text-3xl font-bold text-white/90"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {t("home_subtitle")}
              </motion.h2>

              <motion.p
                className="mt-4 text-lg md:text-2xl text-white/90 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t("home_tagline")}
              </motion.p>

              <Link to="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-10 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-lg font-semibold shadow-xl ring-1 ring-white/20"
                >
                  {t("home_discover_menu")}
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= PHILOSOPHY (YOUR ORIGINAL LAYOUT + MOTION + IMAGES) ================= */}
        <section className="py-24 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h2
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-bold text-black mb-6"
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

            {/* ✅ YOUR IMAGES + THEIR MOTION ARE HERE (UNCHANGED) */}
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

            {/* ✅ Learn More button BLACK (as you wanted) */}
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-12 px-10 py-4 bg-black hover:bg-gray-900 text-white rounded-full font-semibold shadow-lg"
              >
                {t("home_learn_more")}
              </motion.button>
            </Link>
          </div>
        </section>

        {/* ================= SPECIALS SECTION (we will update only its heading + bg) ================= */}
        <div ref={specialsRef}>
          {showSpecials && (
            <Suspense fallback={<div>Loading...</div>}>
              <SpecialsSection />
            </Suspense>
          )}
        </div>

        {/* ================= FOOTER (YOUR ORIGINAL - UNCHANGED) ================= */}
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
              {/* ✅ brand in black (your request) */}
              <h3 className="text-4xl font-extrabold text-amber-800 mb-5">
                {t("footer_title")}
              </h3>
              <p>{t("footer_description")}</p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-4">
                {t("footer_quick_links")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/">{t("nav_home")}</Link>
                </li>
                <li>
                  <Link to="/menu">{t("nav_menu")}</Link>
                </li>
                <li>
                  <Link to="/about">{t("nav_about")}</Link>
                </li>
                <li>
                  <Link to="/contact">{t("nav_contact")}</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-4">
                {t("footer_visit_us")}
              </h4>
              <ul className="space-y-3">
                <li>📍 {t("footer_address")}</li>
                <li>
  📞{" "}
  <a
    href={`tel:${t("footer_phone")}`}
    className="font-semibold text-amber-700 hover:text-amber-900 hover:underline"
  >
    {t("footer_phone")}
  </a>
</li>

<li>
  ✉️{" "}
  <a
    href={`mailto:${t("footer_email")}`}
    className="font-semibold text-amber-700 hover:text-amber-900 hover:underline"
  >
    {t("footer_email")}
  </a>
</li>
                <li>🕒 {t("footer_hours")}</li>
              </ul>
            </div>
          </div>

          <div className="text-center py-6 border-t bg-white text-sm">
            © {new Date().getFullYear()} {t("footer_title")} · {t("footer_rights")}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
