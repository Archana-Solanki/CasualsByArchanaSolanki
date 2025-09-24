import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const reviews = [
  {
    name: "Harshita Jain",
    stars: 5,
    text: "Archana Solanki is an amazing fashion designer. Her work is absolutely fantastic. I really appreciate the way she puts so much of efforts in designing a dress, she made sure that I was satisfied with the dress. The stitching, designing everything turned out to be great. I was extremely happy as the dress turned out the way I wanted. Thank you so much, I really loved the dress 😊",
    img: "https://lh3.googleusercontent.com/a/ACg8ocJClG0BPHQHbsewZebOg3MOIEcpasXlV-KeADTY7mroWq79vQ=w90-h90-p-rp-mo-br100"
  },
  {
    name: "Dr Prasanna S Dhumal",
    stars: 5,
    text: "It's great working with fashion designer Archana Solanki. My life companion was looking to repurpose old sarees. Archana mam did it best — easy, durable, and stylish. Highly Recommended!",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjVFj7MfHPiYZCHuYswvCW8ZyKtbgmlc0_We84WqikWG0GGRqdfN=w90-h90-p-rp-mo-ba4-br100"
  },
  {
    name: "Shweta Jhamvar",
    stars: 5,
    text: "You'll fall in love with her designs, attention to detail, and honest suggestions. Punctual, creative, and affordable — she’s my go-to designer!",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjXjmME5BtvUaUzQz2qg28yx22-LQPDCcBq2t15_eBzNGTometY=w90-h90-p-rp-mo-br100"
  },
  {
    name: "Sneha Karnavat",
    stars: 5,
    text: "Even while expecting, I received a perfectly designed dress at my doorstep. Unique, client-focused designs. A 'go-to' place for something different!",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjWZPxsV1uQh2iQIlhczkIXmWFWYIkEzye3tv3Evs3ic7RBu4PJYAw=w90-h90-p-rp-mo-ba3-br100"
  }
];

export default function GoogleReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // +1 forward, -1 back

  // Auto-change every 7s
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 7000);
    return () => clearInterval(timer);
  }, [index]);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeInOut' }
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: 'easeInOut' }
    })
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    return Array.from({ length: 5 }).map((_, i) => {
      if (i < fullStars) return <FaStar key={i} />;
      if (i === fullStars && hasHalfStar)
        return <FaStar key={i + 'half'} className="opacity-50" />;
      return <FaRegStar key={i + 'empty'} />;
    });
  };

  const current = reviews[index];

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-20 px-4">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="min-h-[350px] bg-black/90 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl px-6 py-10 sm:px-10 text-white text-center flex flex-col items-center space-y-5 hover:scale-[1.01] transition"
        >
          <img
            src={current.img}
            alt={current.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-xl -mt-16"
          />
          <h3 className="text-2xl font-semibold tracking-wide">{current.name}</h3>
          <div className="flex justify-center text-yellow-400 text-lg">
            {renderStars(current.stars)}
          </div>
          <div className="text-white text-sm sm:text-base max-w-xl leading-relaxed italic drop-shadow max-h-40 overflow-y-auto px-2">
            “{current.text}”
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Optional manual buttons */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2"
      >
        ›
      </button>
    </div>
  );
}