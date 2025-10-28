import React, { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    // YouTube video #1
    src: "https://www.youtube.com/embed/XjrvfmqosLs?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=XjrvfmqosLs",
    duration: 21000,
  },
  {
    id: 2,
    // YouTube video #2
    src: "https://www.youtube.com/embed/fUVgpQHwOKk?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=fUVgpQHwOKk",
    duration: 17000,
  },
];

export default function CustomCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    const currentSlide = slides[current];
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextSlide, currentSlide.duration);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="relative w-[80%] max-w-[1440px] h-[70vh] sm:h-[80vh] lg:h-[85vh] mx-auto overflow-hidden rounded-xl shadow-lg mt-28 bg-black">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src={slide.src}
                title={`YouTube video ${slide.id}`}
                frameBorder="0"
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
                loading="lazy"
                className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2"
              ></iframe>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 border-2 ${
              index === current
                ? "bg-white border-white scale-110"
                : "bg-gray-400 border-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
