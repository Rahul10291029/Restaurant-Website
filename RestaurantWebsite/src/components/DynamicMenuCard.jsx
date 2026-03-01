import React from "react";
import { useTranslation } from "react-i18next";

/* Veg / Non-Veg indicator dot — pure CSS, no JS */
const FoodDot = ({ type }) => {
  const isVeg = type === "veg";
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 flex-shrink-0 mt-1 ${
        isVeg ? "border-[#16a34a]" : "border-[#dc2626]"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${isVeg ? "bg-[#16a34a]" : "bg-[#dc2626]"}`} />
    </span>
  );
};

const categoryIcons = {
  starters: "🥗",
  veg_starters: "🌿",
  non_veg_starters: "🍗",
  veg_main: "🥘",
  paneer: "🧀",
  chicken: "🍛",
  lamb: "🍖",
  biryani_rice: "🍚",
  bread: "🫓",
  seafood: "🦐",
  dal: "🫘",
  desserts: "🍮",
  raita_sides: "🥛",
};

const DynamicMenuCard = ({ category }) => {
  const { t } = useTranslation();

  const icon = categoryIcons[category.id] || "🍽️";
  const isNonVeg = category.type === "non_veg";
  const isVeg = category.type === "veg";

  const headerGradient = isNonVeg
    ? "from-[#5c1a1a] via-[#7a2e2e] to-[#8b4513]"
    : isVeg
    ? "from-[#1a3d2b] via-[#2d5a3d] to-[#4a7c59]"
    : "from-[#3d2200] via-[#6b3a00] to-[#8b5a00]";

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#fef3c7]">

      {/* Header */}
      <div className={`relative bg-gradient-to-r ${headerGradient} px-6 py-5 overflow-hidden card-header`}>
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
        <div className="relative z-10 flex items-center justify-center gap-3">
          <span className="text-3xl">{icon}</span>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
            {t(category.titleKey)}
          </h2>
        </div>
      </div>

      {/* Items — pure CSS hover, no JS state */}
      <div className="divide-y divide-[#fffbeb]">
        {category.items.map((item, index) => {
          const name = item.nameKey ? t(item.nameKey) : item.name;
          const itemType = item.type || category.type;
          const showDot = itemType === "veg" || itemType === "non_veg";

          return (
            <div
              key={index}
              className="group/item flex items-start justify-between gap-4 px-5 py-4 hover:bg-[#fffbeb]/70 transition-colors duration-150"
            >
              {/* Left */}
              <div className="flex items-start gap-2 flex-grow min-w-0">
                {showDot && <FoodDot type={itemType} />}
                <div className="min-w-0">
                  <span className="text-sm md:text-base font-semibold text-[#1f2937] group-hover/item:text-[#6b3a00] transition-colors duration-150 leading-tight block">
                    {name}
                  </span>
                  {item.description && (
                    <p className="mt-0.5 text-xs md:text-sm text-[#9ca3af] leading-snug">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Price — CSS-only hover via group */}
              <div className="flex-shrink-0 pt-0.5">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-[#fffbeb] text-[#6b3a00] border border-[#fde68a] group-hover/item:bg-[#6b3a00] group-hover/item:text-white group-hover/item:border-transparent transition-all duration-150">
                  {item.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom accent bar */}
      <div className={`h-1 bg-gradient-to-r ${headerGradient} opacity-50`} />
    </div>
  );
};

export default DynamicMenuCard;
