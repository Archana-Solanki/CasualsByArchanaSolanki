import React, { useRef, useEffect, useState } from "react";
import frock from "../assets/frock2.png";
import tank from "../assets/sleeveless1.png";
import kurti from "../assets/kutiv1.png";
import skirt from "../assets/skirtv.png";
import shirt from "../assets/shirtv.png";
import sleeveless from "../assets/sleevless.png";
import cordset from "../assets/corset1.png";
import kurta from "../assets/kurta.png";

const items = [
  { title: "Elegant Frocks", bg: "#333", img: frock },
  { title: "Short Kurtis", bg: "#333", img: kurti },
  { title: "Tank Tops", bg: "#333", img: tank },
  { title: "Classy Skirts", bg: "#333", img: skirt },
  { title: "Festive Kurtas", bg: "#333", img: kurta },
  { title: "Sleeveless Tops", bg: "#333", img: sleeveless },
  { title: "Women Cordsets", bg: "#333", img: cordset },
  { title: "Casual Shirts", bg: "#333", img: shirt },
];

export default function FashionGallery() {
  const loopItems = [...items, ...items]; // duplicated for looping
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let timeoutId = null;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              setActiveIndex(idx % items.length);
            }, 2000); // 200ms delay
          }
        });
      },
      {
        root: document.querySelector('.scroll-wrapper'),
        threshold: 0.6, // closer to center
      }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="pt-10 px-4 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold font-display inline-block relative">
          Style Categories
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-black rounded-full animate-pulse"></span>
        </h2>
        <p className="mt-6 text-sm text-gray-500 italic">
          *Images are just for reference purposes
        </p>
      </div>


      <div className="scroll-wrapper relative overflow-hidden w-full mt-[-10px]">
        <div className="scroll-track flex gap-6 w-max">
          {loopItems.map((item, i) => (
            <div
              key={i}
              data-index={i}
              ref={el => (cardRefs.current[i] = el)}
              className="flex items-center justify-start h-96 px-4 flex-shrink-0"
            >
              <div
                className={`w-80 h-44 rounded-3xl text-white px-6 py-6 relative transition-all duration-500 flex flex-col justify-between ${activeIndex === i % items.length ? "ring-4 ring-black scale-110" : ""}`}
                style={{ backgroundColor: item.bg }}
              >
                <h2 className="text-xl font-display font-semibold z-10 pt-12">
                  {item.title}
                </h2>
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute bottom-0 right-0 h-64 object-contain z-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scroll-track {
          animation: scroll-left 50s linear infinite;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .scroll-track::-webkit-scrollbar {
          display: none;
        }
        .scroll-track {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scroll-wrapper {
          scroll-snap-type: x mandatory;
        }

        .scroll-track > div {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
}
