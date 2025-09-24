import React from "react";
import Value from "../assets/Money.png";
import Exchange from "../assets/Exchange.png";
import HandPicked from "../assets/HandPicked.png";
import Quality from "../assets/Quality.png";

const styles = [
  {
    icon: Value,
    title: "Value for Money",
  },
  {
    icon: Exchange,
    title: "Easy Exchange",
  },
  {
    icon: HandPicked,
    title: "Hand-Picked",
  },
  {
    icon: Quality,
    title: "Best Assured Quality",
  },
];

const SignatureStyles = () => {
  return (
    <section className="pb-20 mx-auto text-center">
      <div className="text-center mb-10">
        {/* <h2 className="text-4xl font-extrabold font-display inline-block relative">
          Signature Styles
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-black rounded-full animate-pulse"></span>
        </h2> */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 px-4 max-w-6xl mx-auto mt-[-40px]">
        {styles.map((style, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div>
              <img src={style.icon} alt={style.title} className="w-48 h-48 object-contain" />
            </div>
            {/* <p className="text-lg font-medium text-gray-800">{style.title}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SignatureStyles;
