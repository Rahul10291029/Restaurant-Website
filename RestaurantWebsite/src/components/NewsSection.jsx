import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Bell } from "lucide-react";
import newsImg1 from "../Images/NewsIndianYaadein.jpg";

const newsImg2 = "/gallery/food/food1.jpeg";

const NewsSection = () => {
  const { t } = useTranslation();

  const newsItems = [
    {
      id: 2,
      title: t("news_article_2_title"),
      text: t("news_article_2_text"),
      cta: t("news_article_2_cta"),
      image: newsImg2,
      link: "https://www.derbund.ch/beitenwil-restaurant-swagat-bringt-indische-currys-nach-rubigen-230162455898",
      date: t("news_article_2_date"),
      featured: true,
    },
    {
      id: 1,
      title: t("news_article_title"),
      text: t("news_article_text"),
      cta: t("news_article_cta"),
      image: newsImg1,
      link: "https://share.google/ZWgA0UTS7j64tXOj9",
      date: "February 2026",
      featured: false,
    },
  ];

  return (
    <section className="py-24 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Bell className="text-amber-600" size={20} />
            <span className="text-amber-600 font-bold tracking-[0.2em] uppercase text-sm">
              {t("news_title")}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Stay Connected
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            {t("news_subtitle")}
          </motion.p>
        </div>

        {/* News Cards */}
        <div className="space-y-16">
          {newsItems.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-amber-900/10 border border-amber-100 flex flex-col lg:flex-row min-h-[500px] ${
                article.featured ? "ring-2 ring-amber-400 ring-offset-4" : ""
              }`}
            >
              {/* Image Part */}
              <div
                className={`lg:w-1/2 relative h-[300px] lg:h-auto overflow-hidden ${
                  index % 2 !== 0 ? "lg:order-last" : ""
                }`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
              </div>

              {/* Content Part */}
              <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-white relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Bell size={120} />
                </div>

                {article.featured && (
                  <div className="inline-block px-4 py-1.5 bg-amber-50 rounded-full text-amber-700 text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                    Featured Announcement
                  </div>
                )}

                <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {article.title}
                </h3>

                <p className="text-gray-650 text-lg leading-relaxed mb-10">
                  {article.text}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-amber-800 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {article.cta}
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={20}
                    />
                  </a>

                  <div className="text-sm text-gray-500 font-medium italic">
                    Published {article.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
