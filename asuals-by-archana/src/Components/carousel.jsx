import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/dr688utjz/video/upload/Video_2.mp4',
    duration: 20000, // 20 sec
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/dr688utjz/video/upload/IMG_0412_qpln9w.mp4',
    duration: 17000, // 17 sec
  },
];

export default function CustomCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const videoRefs = useRef([]); // store refs to videos

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    const currentSlide = slides[current];

    // Pause and reset all videos except the current one
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === current) {
          video.currentTime = 0;
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

    // Timer for next slide based on duration
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextSlide, currentSlide.duration);

    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="relative w-[80%] max-w-[1440px] h-[60vh] sm:h-[70vh] lg:h-[80vh] mx-auto overflow-hidden rounded-xl shadow-lg mt-28 bg-black">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={slide.src}
              className="w-full h-full object-cover"
            />
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
                ? 'bg-white border-white scale-110'
                : 'bg-gray-400 border-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
