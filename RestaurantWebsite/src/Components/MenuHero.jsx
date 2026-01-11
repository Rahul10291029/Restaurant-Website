import React from 'react';
import bgImage from '../Images/bgImg.jpg';

const HeroSection = ({
  title = "Our Menu.",
  subtitle = "Smoked Stories"
}) => {
  return (
    <div
      className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center animate-fadeIn">
        <p className="text-yellow-500 text-base sm:text-lg tracking-wide">
          {subtitle}
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold mt-2">
          {title}
        </h1>
      </div>

      {/* Triangle Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] h-[80px]">
        <svg
          className="block w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 0L0 0 600 114.72 1200 0z"
            className="fill-white"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
