import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Triangle from "./Triangle";

const SpecialsSection = () => {
  const { t } = useTranslation();

  const images = [
    "/gallery/food/food2.jpeg",
    "/gallery/food/food4.jpeg",
    "/gallery/food/food5.jpeg",
    "/gallery/food/food6.jpeg",
  ];

  return (
    // ✅ White background (no yellow tint / no blurred bg)
    <section className="w-full py-20 px-4 bg-white">
      <Triangle position="top" isVisible={true} />

      {/* ✅ Heading BLACK like logo */}
      <div className="text-center mb-12">
        <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-yellow-500" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-black">
          {t("home_specials_title")}
        </h2>
        <p className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto">
          {t("home_special_description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-10">
        {images.map((img, i) => (
          <Link to="/menu" key={i}>
            {/* ✅ Cleaner white card */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ease-in-out">
              <img
                src={img}
                alt={`Special ${i + 1}`}
                loading="lazy"
                className="w-full h-56 object-cover rounded-2xl mb-5 shadow-md"
              />

              <h3 className="text-2xl font-extrabold text-black mb-2">
                {t("home_special_dish")} {i + 1}
              </h3>

              <p className="text-gray-600 text-base mb-4">
                {t("home_special_description")}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-black font-extrabold text-xl">
                  €{(19.95 + i * 2.5).toFixed(2)}
                </span>

                <span className="text-sm font-semibold text-yellow-700">
                  {t("home_view_specials")} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/menu">
          {/* ✅ Black button (premium) */}
          <button className="bg-black hover:bg-gray-900 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300">
            {t("home_view_specials")}
          </button>
        </Link>
      </div>

      <Triangle position="bottom" isVisible={true} />
    </section>
  );
};

export default SpecialsSection;
