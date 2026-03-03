import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import bgImg from "../Images/bgImg.jpg";
import DynamicMenuCard from "./DynamicMenuCard";
import { jsPDF } from "jspdf";

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
  const menuRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);

  const handleDownloadPdf = () => {
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const A4_W = 595.28;
    const A4_H = 841.89;
    const MARGIN = 60;           // wider margins for premium look
    const CONTENT_W = A4_W - MARGIN * 2;
    const BOTTOM = A4_H - 55;

    const BLACK  = [31,  41,  55];
    const DARK   = [55,  65,  81];
    const GRAY   = [107, 114, 128];
    const LIGHT  = [209, 213, 219];

    // ── Helpers ──────────────────────────────────────────
    const setColor  = ([r, g, b]) => pdf.setTextColor(r, g, b);
    const lineColor = ([r, g, b]) => pdf.setDrawColor(r, g, b);

    // ── Character normaliser ─────────────────────────────
    // jsPDF's built-in Helvetica only covers Latin-1 (cp1252 range).
    // Characters outside that range silently render as &c&h&a&r& garbage.
    // Map German umlauts, sharp-s, dashes, smart quotes → safe ASCII.
    const toSafePdf = (str) => {
      if (!str) return '';
      return str
        .replace(/\u00e4/g, 'ae').replace(/\u00c4/g, 'Ae')
        .replace(/\u00f6/g, 'oe').replace(/\u00d6/g, 'Oe')
        .replace(/\u00fc/g, 'ue').replace(/\u00dc/g, 'Ue')
        .replace(/\u00df/g, 'ss')
        .replace(/[\u2013\u2014]/g, '-')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\u2026/g, '...')
        .replace(/[^\x00-\xFF]/g, '');
    };

    const wrapText = (text) =>
      pdf.splitTextToSize(toSafePdf(text), CONTENT_W - 80);


    // Estimate height of one category block
    const estimateCatHeight = (category) => {
      let h = 50; // title + underline + padding below
      category.items.forEach(item => {
        h += 26; // name + price row
        if (item.description) {
          const ls = pdf.splitTextToSize(item.description, CONTENT_W);
          h += ls.length * 14 + 6;
        }
        h += 20; // gap between items
      });
      h += 24; // bottom gap after category
      return h;
    };

    // Render one category, returns new Y position
    const renderCategory = (category, startY) => {
      let cy = startY;
      const title = toSafePdf(t(category.titleKey)).toUpperCase();

      // ── Category Title ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      setColor(BLACK);
      pdf.text(title, MARGIN, cy);
      cy += 5;

      // Underline
      lineColor(LIGHT);
      pdf.setLineWidth(0.5);
      pdf.line(MARGIN, cy, MARGIN + CONTENT_W, cy);
      cy += 18;

      // ── Items ──
      category.items.forEach((item, idx) => {
        const name = toSafePdf(item.nameKey ? t(item.nameKey) : item.name);

        // Name
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(13);
        setColor(DARK);
        pdf.text(name, MARGIN, cy, { maxWidth: CONTENT_W - 90 });

        // Price — always right aligned on same baseline
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(13);
        setColor(BLACK);
        pdf.text(String(item.price), MARGIN + CONTENT_W, cy, { align: 'right' });
        cy += 18;

        // Description
        if (item.description) {
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10.5);
          setColor(GRAY);
          const lines = pdf.splitTextToSize(toSafePdf(item.description), CONTENT_W);
          pdf.text(lines, MARGIN, cy);
          cy += lines.length * 13 + 4;
        }

        cy += 22; // generous gap between dishes
      });

      cy += 20; // gap after category
      return cy;
    };

    // ── Page Header ──────────────────────────────────────
    const drawPageHeader = () => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(26);
      setColor(BLACK);
      pdf.text('KREUZ PINTLI SWAGAT', A4_W / 2, MARGIN, { align: 'center' });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      setColor(GRAY);
      pdf.text('— AUTHENTIC INDIAN MENU —', A4_W / 2, MARGIN + 18, { align: 'center' });

      lineColor(LIGHT);
      pdf.setLineWidth(0.6);
      pdf.line(MARGIN, MARGIN + 28, A4_W - MARGIN, MARGIN + 28);
    };

    // ── Page Footer ──────────────────────────────────────
    const drawFooter = (pageNum, total) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      setColor(GRAY);
      pdf.text(
        `Kreuz Pintli Swagat  ·  Page ${pageNum} of ${total}`,
        A4_W / 2, A4_H - 22, { align: 'center' }
      );
    };

    // ── Layout ───────────────────────────────────────────
    drawPageHeader();
    let y = MARGIN + 50; // start below header

    menuCategories.forEach(category => {
      const h = estimateCatHeight(category);

      // Does this whole category fit on the current page?
      if (y + h > BOTTOM) {
        pdf.addPage();
        y = MARGIN + 10;
      }

      y = renderCategory(category, y);
    });

    // ── Footers on all pages ──────────────────────────────
    const total = pdf.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      pdf.setPage(i);
      drawFooter(i, total);
    }

    pdf.save('Kreuz_Pintli_Swagat_Menu.pdf');
  };

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
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-7 py-3 rounded-full font-bold shadow-lg shadow-amber-900/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              📄 {t("download_menu_pdf")}
            </button>
          </div>

          {/* Decorative bottom line */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-amber-400 opacity-80" />
            <span className="text-amber-300 text-2xl">✦</span>
            <div className="h-px w-16 bg-amber-400 opacity-80" />
          </div>
        </div>
      </section>

      <div ref={menuRef} className="bg-[#faf9f6]">
      {/* ═══ SECTION INTRO ═══ */}
      <div className="text-center pt-16 pb-4 px-4">
        <p className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-2">
          — {t("menu_explore_the")} —
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          {t("menu_authentic_indian_menu")}
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
          {t("menuTags.veg")}
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 border-red-600">
            <span className="w-2 h-2 rounded-full bg-red-600" />
          </span>
          {t("menuTags.non_veg")}
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
                <span className="font-semibold text-amber-800">🕒 {t("footer_opening_hours")}</span>
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
