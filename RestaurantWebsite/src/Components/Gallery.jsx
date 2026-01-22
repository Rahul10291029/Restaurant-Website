import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const { t } = useTranslation();

  // 👀 Footer animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFooterVisible(true);
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= GALLERY ================= */}
      <section className="pt-36 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-32">

          {/* ================= SECTION 1 : OUTDOOR ================= */}
          <div>
            <h2 className="text-4xl font-extrabold text-center text-amber-800 mb-4">
              {t("gallery_outdoor_title")}
            </h2>
            <p className="text-center text-lg font-bold text-gray-600 max-w-3xl mx-auto mb-12">
              {t("gallery_outdoor_desc")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[260px] rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={`/gallery/outdoor/${i}.jpeg`}
                    alt="Outdoor Restaurant"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= SECTION 2 : INDOOR ================= */}
          <div>
            <h2 className="text-4xl font-extrabold text-center text-amber-800 mb-4">
              {t("gallery_indoor_title")}
            </h2>
            <p className="text-center text-lg font-bold text-gray-600 max-w-3xl mx-auto mb-12">
              {t("gallery_indoor_desc")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-[300px] rounded-2xl overflow-hidden shadow-md"
                >
                  <img
                    src={`/gallery/indoor/${i}.jpeg`}
                    alt="Indoor Restaurant"
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= SECTION 3 : FOOD ================= */}
          <div>
            <h2 className="text-4xl font-extrabold text-center text-amber-800 mb-4">
              {t("gallery_food_title")}
            </h2>
            <p className="text-center text-lg font-bold text-gray-600 max-w-3xl mx-auto mb-12">
              {t("gallery_food_desc")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden shadow-xl bg-white"
                >
                  <div className="h-[260px] overflow-hidden">
                    <img
                      src={`/gallery/food/food${i}.jpeg`}
                      alt="Indian Food"
                      className="w-full h-full object-cover hover:scale-110 transition duration-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        ref={footerRef}
        className="bg-gradient-to-t from-yellow-100 to-white shadow-inner text-gray-800 rounded-t-[50px]"
      >
        <div
          className={`max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 transition-all duration-700 ${
            footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div>
            <motion.h3
              className="text-4xl font-extrabold text-amber-800 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={footerVisible ? { opacity: 1, y: 0 } : {}}
            >
              {t("footer_title")}
            </motion.h3>
            <p className="text-lg text-gray-700">
              {t("footer_description")}
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-5">
              {t("footer_quick_links")}
            </h4>
            <ul className="space-y-3">
              {["nav_home", "nav_menu", "nav_about", "nav_contact"].map((key) => (
                <li key={key}>
                  <Link
                    to={key === "nav_home" ? "/" : `/${key.split("_")[1]}`}
                    className="hover:text-yellow-600 hover:underline"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-5">
              {t("footer_visit_us")}
            </h4>
            <ul className="space-y-3 text-gray-700">
              {["footer_address", "footer_phone", "footer_email", "footer_hours"].map(
                (key, i) => (
                  <li key={key} className="flex items-center">
                    <span className="mr-3">
                      {["📍", "📞", "✉️", "🕒"][i]}
                    </span>
                    {t(key)}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="text-center py-6 text-sm border-t">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">
            {t("footer_title")}
          </span>{" "}
          {t("footer_rights")}
        </div>
      </footer>
    </>
  );
};

export default Gallery;
