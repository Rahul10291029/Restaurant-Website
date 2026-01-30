import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import bgImg from "../Images/bgImg.jpg";

/* Triangle Component */
const Triangle = ({ position, isVisible }) => (
  <div
    className={`w-0 h-0 mx-auto transition-all duration-500 ${
      position === "top"
        ? "border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent border-b-yellow-100"
        : "border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-yellow-100"
    } ${isVisible ? "opacity-100" : "opacity-0"}`}
  />
);

const Menu = () => {
  const { t } = useTranslation();
  const footerRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const menuItems = [
   
    { image: "/Menu/Menu2.jpg", titleKey: "menuItem_lamb_title", descriptionKey: "menuItem_lamb_description", tags: [ "non_veg"] },
    { image: "/Menu/Menu3.jpg", titleKey: "menuItem_bread_title", descriptionKey: "menuItem_bread_description", tags: ["veg"] },
    { image: "/Menu/Menu4.jpg", titleKey: "menuItem_seafood_title", descriptionKey: "menuItem_seafood_description", tags: ["non_veg"] },
    { image: "/Menu/Menu5.jpg", titleKey: "menuItem_dessert_title", descriptionKey: "menuItem_dessert_description", tags: [ "veg"] },
    { image: "/Menu/Menu6.jpg", titleKey: "menuItem_raita_title", descriptionKey: "menuItem_raita_description", tags: ["veg"] },
    { image: "/Menu/Menu7.jpg", titleKey: "menuItem_chicken_title", descriptionKey: "menuItem_chicken_description", tags: ["non_veg"] },
    { image: "/Menu/Menu8.jpg", titleKey: "menuItem_saladStarter_title", descriptionKey: "menuItem_saladStarter_description", tags: ["veg"] },
    { image: "/Menu/Menu9.jpg", titleKey: "menuItem_dalBBQ_title", descriptionKey: "menuItem_dalBBQ_description", tags: [ "veg",] },
    { image: "/Menu/Menu10.jpg", titleKey: "menuItem_platter_title", descriptionKey: "menuItem_platter_description", tags: ["non_veg"] },
    { image: "/Menu/Menu11.jpg", titleKey: "menuItem_paneer_title", descriptionKey: "menuItem_paneer_description", tags: ["veg"] },
    { image: "/Menu/Menu12.jpg", titleKey: "menuItem_vegMain_title", descriptionKey: "menuItem_vegMain_description", tags: ["veg"] },
    { image: "/Menu/Menu1.jpg", titleKey: "menuItem_biryaniRice_title", descriptionKey: "menuItem_biryaniRice_description", tags: [ "veg","non_veg"] },
  ];

  const filteredMenu = menuItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "veg") return item.tags.includes("veg");
    if (activeFilter === "non_veg") return item.tags.includes("non_veg");
    return true;
  });

  return (
    <div className="bg-gray-50 overflow-x-hidden">

      {/* HERO – SAME AS HOME */}
    {/* HERO */}
<section className="relative">
  <div className="relative min-h-[60vh] flex items-center justify-center">

    {/* Background */}
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>

    {/* Content */}
    <div className="relative z-10 text-center px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
        {t("heroTitleMain")}
      </h1>

      <p className="mt-2 text-lg md:text-xl text-white/90 tracking-wide">
        {t("heroTitleSub")}
      </p>

      <p className="mt-4 text-white/80 max-w-xl mx-auto">
        {t("heroText")}
      </p>

      <a
        href="/Downlod.pdf"
        download
        className="inline-block mt-6 bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg font-bold transition"
      >
        {t("download_menu_pdf")}
      </a>
    </div>

  </div>
</section>


      {/* FILTERS */}
      <div className="flex justify-center gap-4 my-12 px-4 flex-wrap">
        {["all", "veg", "non_veg"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeFilter === filter
                ? filter === "veg"
                  ? "bg-green-600 text-white"
                  : filter === "non_veg"
                  ? "bg-red-600 text-white"
                  : "bg-yellow-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {t(`menuTags.${filter}`)}
          </button>
        ))}
      </div>

      {/* MENU GRID */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
          {filteredMenu.map((item, index) => (
            <div key={index} className="w-full max-w-[520px] bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden">
              <div className="p-5">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={t(item.titleKey)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
              </div>

              <div className="px-6 pb-8 text-center">
                <h3 className="text-2xl font-bold text-amber-700 mb-2">
                  {t(item.titleKey)}
                </h3>

                <p className="text-gray-700 text-sm mb-4">
                  {t(item.descriptionKey)}
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs"
                    >
                      {t(`menuTags.${tag}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER – PHONE & EMAIL HIGHLIGHTED */}
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

export default Menu;
