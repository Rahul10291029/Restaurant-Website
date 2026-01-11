import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BgImg from '../Images/View.jpg';
import German1 from '../Images/German1.jpg';
import German2 from '../Images/German2.jpg';
import { useTranslation } from 'react-i18next';
import SpecialsSection from '../pages/SpecialSection';
import { motion } from 'framer-motion';

const Home = () => {
  const { t } = useTranslation();
  const specialsRef = useRef(null);
  const [showSpecials, setShowSpecials] = useState(false);
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' } },
  };

  const imageVariantsLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.4, ease: 'easeOut' } },
  };

  const imageVariantsRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.6, ease: 'easeOut' } },
  };

  const handleSpecialsIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.target === specialsRef.current && entry.isIntersecting && !showSpecials) {
        setShowSpecials(true);
      }
    });
  }, [showSpecials]);

  const handleFooterIntersection = useCallback(([entry]) => {
    setFooterVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const specialsObserver = new IntersectionObserver(handleSpecialsIntersection, { threshold: 0.1 });
    const footerObserver = new IntersectionObserver(handleFooterIntersection, { threshold: 0.1 });

    if (specialsRef.current) specialsObserver.observe(specialsRef.current);
    if (footerRef.current) footerObserver.observe(footerRef.current);

    return () => {
      specialsObserver.disconnect();
      footerObserver.disconnect();
    };
  }, [handleSpecialsIntersection, handleFooterIntersection]);

  return (
    <div
      className="relative font-inter min-h-screen text-gray-800 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      {/* ================= HERO ================= */}
      <div className="relative h-[90vh] w-full flex items-center justify-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}
          className="relative z-10 w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-md text-center px-8 py-12 rounded-2xl shadow-2xl"
        >
          {/* BIG TITLE */}
          <h1 className="text-5xl md:text-5xl font-extrabold drop-shadow-lg text-yellow-600 leading-tight">
            {t('home_welcome')}
          </h1>

          {/* SUB TITLE */}
          <h2 className="text-4xl md:text-5xl mt-4 font-bold text-yellow-600 drop-shadow-md">
  {t('home_subtitle')}
</h2>

          {/* TAGLINE */}
          <p className="text-lg md:text-xl mt-5 mb-8 leading-relaxed text-gray-700 font-medium">
            {t('home_tagline')}
          </p>

          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0px 8px 15px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full text-xl font-semibold shadow-xl transition-all duration-300 bg-amber-600 hover:bg-amber-700 text-white"
            >
              {t('home_discover_menu')}
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="h-20"></div>

      {/* ================= PHILOSOPHY ================= */}
      <section className="w-full py-24 text-center bg-white/50 backdrop-blur-sm">
        <div className="px-6 max-w-7xl mx-auto">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6 text-yellow-600"
          >
            {t('home_our_philosophy')}
          </motion.h2>

          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg md:text-xl mb-12 leading-relaxed text-gray-800 max-w-3xl mx-auto"
          >
            {t('home_philosophy_text')}
          </motion.p>

          <div className="flex flex-col md:flex-row justify-center gap-10">
            <motion.img
              variants={imageVariantsLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              src={German1}
              alt="Dish"
              loading="lazy"
              className="rounded-3xl shadow-xl w-full md:w-1/2 h-72 object-cover border-4 border-yellow-100"
            />
            <motion.img
              variants={imageVariantsRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              src={German2}
              alt="Interior"
              loading="lazy"
              className="rounded-3xl shadow-xl w-full md:w-1/2 h-72 object-cover border-4 border-yellow-100"
            />
          </div>

          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 px-10 py-4 rounded-full text-lg font-semibold bg-amber-700 hover:bg-amber-800 text-white shadow-md"
            >
              {t('home_learn_more')}
            </motion.button>
          </Link>
        </div>
      </section>

      <div className="h-20"></div>

      {/* ================= SPECIALS ================= */}
      <div
        ref={specialsRef}
        className={`w-full bg-white/50 backdrop-blur-sm py-20 ${
          showSpecials ? '' : 'min-h-[500px]'
        }`}
      >
        {showSpecials && (
          <React.Suspense fallback={<div>Loading Specials...</div>}>
            <SpecialsSection />
          </React.Suspense>
        )}
      </div>

      <div className="h-20"></div>

      {/* ================= FOOTER ================= */}
      <footer
        ref={footerRef}
        className="bg-gradient-to-t from-yellow-100 to-white shadow-inner text-gray-800 rounded-t-[50px]"
      >
        <div
          className={`max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 transition-all duration-700 ${
            footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div>
            <h3 className="text-4xl font-extrabold text-yellow-600 mb-5">
              {t('footer_title')}
            </h3>
            <p className="text-lg text-gray-700">
              {t('footer_description')}
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-5">{t('footer_quick_links')}</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-yellow-600">{t('nav_home')}</Link></li>
              <li><Link to="/menu" className="hover:text-yellow-600">{t('nav_menu')}</Link></li>
              <li><Link to="/about" className="hover:text-yellow-600">{t('nav_about')}</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-600">{t('nav_contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-5">{t('footer_visit_us')}</h4>
            <ul className="space-y-3">
              <li>📍 {t('footer_address')}</li>
              <li>📞 {t('footer_phone')}</li>
              <li>✉️ {t('footer_email')}</li>
              <li>🕒 {t('footer_hours')}</li>
            </ul>
          </div>
        </div>

        <div className="text-center py-6 text-sm border-t bg-white">
          © {new Date().getFullYear()} {t('footer_title')} · {t('footer_rights')}
        </div>
      </footer>
    </div>
  );
};

export default Home;
