import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&auto=format&fit=crop&q=80',
    caption: 'Peaceful Landscape',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?w=1920&auto=format&fit=crop&q=80',
    caption: 'Nature at its Best',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1543728069-a3f97c5a2f32?w=1920&auto=format&fit=crop&q=80',
    caption: 'Majestic Mountains',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1596725668413-d91baf68d9ce?w=1920&auto=format&fit=crop&q=80',
    caption: 'Sunny Beach',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?w=1920&auto=format&fit=crop&q=80',
    caption: 'Golden Sunset',
  },
];

export default function CustomCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[80%] max-w-[1440px] h-[60vh] sm:h-[70vh] lg:h-[80vh] mx-auto overflow-hidden rounded-xl shadow-lg mt-28">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img src={slide.image} alt={slide.caption} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-6 transform -translate-y-1/2 text-white text-2xl sm:text-3xl bg-black/40 hover:bg-black/60 p-2 sm:p-3 rounded-full z-10 transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-6 transform -translate-y-1/2 text-white text-2xl sm:text-3xl bg-black/40 hover:bg-black/60 p-2 sm:p-3 rounded-full z-10 transition"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 border-2 ${
              index === current ? 'bg-white border-white scale-110' : 'bg-gray-400 border-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
