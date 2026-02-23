import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import bgImg from "../Images/bgImg.jpg";
import DynamicMenuCard from "./DynamicMenuCard";

/* ── Triangle decorator ── */
const Triangle = ({ position, isVisible }) => (
  <div
    className={`w-0 h-0 mx-auto transition-all duration-500 ${
      position === "top"
        ? "border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-50"
        : "border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-yellow-50"
    } ${isVisible ? "opacity-100" : "opacity-0"}`}
  />
);

/* ── Filter pill ── */
const FilterPill = ({ filter, active, onClick, label }) => {
  const colors = {
    all: active
      ? "bg-[#6b3a00] text-white shadow-lg shadow-amber-900/30 scale-105"
      : "bg-white text-[#6b3a00] border border-amber-200 hover:bg-amber-50",
    veg: active
      ? "bg-[#2d5a3d] text-white shadow-lg shadow-green-900/30 scale-105"
      : "bg-white text-[#2d5a3d] border border-green-200 hover:bg-green-50",
    non_veg: active
      ? "bg-[#7a2e2e] text-white shadow-lg shadow-red-900/30 scale-105"
      : "bg-white text-[#7a2e2e] border border-red-200 hover:bg-red-50",
  };

  const icons = { all: "🍽️", veg: "🌿", non_veg: "🍗" };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${colors[filter]}`}
    >
      <span>{icons[filter]}</span>
      {label}
    </button>
  );
};

const Menu = () => {
  const { t } = useTranslation();
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const menuCategories = t("menuCategories", { returnObjects: true });

  const getFilteredCategories = () => {
    if (activeFilter === "all") return menuCategories;
    return menuCategories
      .map((category) => {
        if (category.type === activeFilter) return category;
        if (category.type === "both") {
          const filteredItems = category.items.filter(
            (item) => item.type === activeFilter
          );
          if (filteredItems.length > 0)
            return { ...category, items: filteredItems };
        }
        return null;
      })
      .filter(Boolean);
  };

  const filteredCategories = getFilteredCategories();

  return (
    <div className="bg-[#faf9f6] overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${bgImg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-amber-400 opacity-80" />
            <span className="text-amber-300 text-2xl">✦</span>
            <div className="h-px w-16 bg-amber-400 opacity-80" />
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl leading-tight">
            {t("heroTitleMain")}
          </h1>
          <p className="mt-3 text-lg md:text-xl text-amber-200 tracking-widest uppercase font-light">
            {t("heroTitleSub")}
          </p>
          <p className="mt-5 text-white/75 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {t("heroText")}
          </p>

          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <a
              href="/Downlod.pdf"
              download
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-7 py-3 rounded-full font-bold shadow-lg shadow-amber-900/40 transition-all duration-300 hover:scale-105"
            >
              📄 {t("download_menu_pdf")}
            </a>
          </div>

          {/* Decorative bottom line */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-amber-400 opacity-80" />
            <span className="text-amber-300 text-2xl">✦</span>
            <div className="h-px w-16 bg-amber-400 opacity-80" />
          </div>
        </div>
      </section>

      {/* ═══ SECTION INTRO ═══ */}
      <div className="text-center pt-16 pb-4 px-4">
        <p className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-2">
          — Explore The —
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Authentic Indian Menu
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="h-px w-12 bg-amber-300" />
          <span className="text-amber-400 text-xl">🌶️</span>
          <div className="h-px w-12 bg-amber-300" />
        </div>
      </div>

      {/* ═══ FILTER BAR ═══ */}
      <div className="flex justify-center gap-3 my-8 px-4 flex-wrap">
        {["all", "veg", "non_veg"].map((filter) => (
          <FilterPill
            key={filter}
            filter={filter}
            active={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
            label={t(`menuTags.${filter}`)}
          />
        ))}
      </div>

      {/* ═══ LEGEND ═══ */}
      <div className="flex justify-center gap-6 mb-10 text-sm text-gray-500 flex-wrap px-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 border-green-600">
            <span className="w-2 h-2 rounded-full bg-green-600" />
          </span>
          Vegetarian
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 border-red-600">
            <span className="w-2 h-2 rounded-full bg-red-600" />
          </span>
          Non-Vegetarian
        </div>
      </div>

      {/* ═══ MENU MASONRY ═══ */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="columns-1 lg:columns-2 gap-8">
          {filteredCategories.map((category, index) => (
            <div
              key={category.id || index}
              className="break-inside-avoid mb-8"
            >
              <DynamicMenuCard category={category} />
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer
        ref={footerRef}
        className="mt-10 bg-gradient-to-t from-amber-50 to-white shadow-inner rounded-t-3xl overflow-hidden"
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
            <p className="text-gray-600">{t("footer_description")}</p>
          </div>

          {/* CENTER */}
          <div>
            <h4 className="text-xl font-bold mb-4">{t("footer_quick_links")}</h4>
            <ul className="space-y-2">
              {["/", "/menu", "/about", "/contact"].map((path, i) => {
                const labels = [
                  t("nav_home"),
                  t("nav_menu"),
                  t("nav_about"),
                  t("nav_contact"),
                ];
                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className="hover:text-amber-600 transition-colors"
                    >
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h4 className="text-xl font-bold mb-4">{t("footer_visit_us")}</h4>
            <ul className="space-y-3">
              <li className="flex gap-2">
                📍 <span>{t("footer_address")}</span>
              </li>
              <li className="flex items-center gap-2">
                📞
                <a
                  href={`tel:${t("footer_phone_raw")}`}
                  className="font-semibold text-amber-700 text-lg hover:underline"
                >
                  {t("footer_phone")}
                </a>
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
          © {new Date().getFullYear()} {t("footer_title")} ·{" "}
          {t("footer_rights")}
        </div>

        <Triangle position="bottom" isVisible={footerVisible} />
      </footer>
    </div>
  );
};

export default Menu;
