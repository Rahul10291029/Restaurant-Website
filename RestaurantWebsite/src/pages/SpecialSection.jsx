import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Triangle from './Triangle';

const SpecialsSection = () => {
  const { t } = useTranslation();

  const images = [
    '/gallery/food/food2.jpeg',
    '/gallery/food/food4.jpeg',
    '/gallery/food/food5.jpeg',
    '/gallery/food/food6.jpeg',
  ];

  return (
    <section className="w-full py-24 my-20 px-4 bg-white/50 backdrop-blur-md">
      <Triangle position="top" isVisible={true} />

      <h2 className="text-4xl font-bold mb-12 text-yellow-600 text-center">
        {t('home_specials_title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-8">
        {images.map((img, i) => (
          <Link to="/menu" key={i}>
            <div className="bg-white/85 backdrop-blur-md p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ease-in-out">
              <img
                src={img}
                alt={`Special ${i + 1}`}
                loading="lazy"
                className="w-full h-48 object-cover rounded-md mb-4 shadow-md"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('home_special_dish')} {i + 1}
              </h3>
              <p className="text-gray-700 text-base mb-4">
                {t('home_special_description')}
              </p>
              <span className="text-amber-700 font-bold text-xl">
                €{(19.95 + i * 2.5).toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/menu">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300">
            {t('home_view_specials')}
          </button>
        </Link>
      </div>

      <Triangle position="bottom" isVisible={true} />
    </section>
  );
};

export default SpecialsSection;
