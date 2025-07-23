import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCarousel = ({
  items = [],
  getImageUrl = (item) => item.image,
  renderContent,
  cardClassName = '',
  containerClassName = '',
  speed = 0.5, // pixels per frame
}) => {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  // Always double items for infinite loop
  const loopedItems = [...items, ...items];

  const animateScroll = () => {
    const el = carouselRef.current;
    if (!el) return;

    el.scrollLeft += speed;

    const maxScroll = el.scrollWidth / 2;
    if (el.scrollLeft >= maxScroll) {
      el.scrollLeft = 0;
    }

    animationRef.current = requestAnimationFrame(animateScroll);
  };

  const navigate = useNavigate();

  const slugify = (str) => {
    if (typeof str !== "string") return "invalid-product";
    return str.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  };

  const handleClick = (item) => {
    navigate(`/product/${slugify(item.name)}`, {
      state: { productId: item.id }
    });
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const startScroll = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animateScroll);
      }
    };

    const stopScroll = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    startScroll(); // Start immediately

    el.addEventListener('mouseenter', stopScroll);
    el.addEventListener('mouseleave', startScroll);

    return () => {
      stopScroll();
      el.removeEventListener('mouseenter', stopScroll);
      el.removeEventListener('mouseleave', startScroll);
    };
  }, [items]);

  return (
    <div className={`w-full  pb-16 ${containerClassName} bg-white`}>
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll hide-scrollbar space-x-6 bg-white"
        style={{ scrollBehavior: 'auto', overflowY: 'hidden' }}
      >
        {loopedItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className={`cursor-pointer flex-none min-w-[16rem] md:min-w-[18rem] bg-gradient-to-br from-gray-800/80 to-black/90 rounded-xl border border-gray-700 shadow-xl hover:scale-105 transition-all duration-300 ${cardClassName}`}
          >
            <img
              src={getImageUrl(item, index)}
              alt={item.name || 'Product'}
              className="w-full h-64 object-contain rounded-t-xl"
            />
            <div className="py-5 px-4 text-center bg-black rounded-b-xl">
              {renderContent ? (
                renderContent(item, index)
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-gray-100">{item.name}</h2>
                  <p className="text-gray-400 mt-1">₹{item.price}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
