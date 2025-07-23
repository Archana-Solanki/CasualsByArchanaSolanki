import React from "react";
import { FaLeaf } from "react-icons/fa";
import { GiDress } from "react-icons/gi";
import { MdOutlineDesignServices } from "react-icons/md";
import { LuRuler } from "react-icons/lu";
import { PiDressLight } from "react-icons/pi"; 

const styles = [
  {
    icon: <GiDress size={40} />,
    title: "Custom Bridal Wear",
  },
  {
    icon: <LuRuler size={40} />,
    title: "Made-to-Measure",
  },
  {
    icon: <FaLeaf size={40} />,
    title: "Sustainable Fabrics",
  },
  {
    icon: <MdOutlineDesignServices size={40} />,
    title: "Fusion & Festive Designs",
  },
];

const SignatureStyles = () => {
  return (
    <section className="pb-20 mx-auto text-center">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold font-display inline-block relative">
          Signature Styles
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-black rounded-full animate-pulse"></span>
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4 max-w-6xl mx-auto">
        {styles.map((style, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div className="text-black">{style.icon}</div>
            <p className="text-lg font-medium text-gray-800">{style.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SignatureStyles;
