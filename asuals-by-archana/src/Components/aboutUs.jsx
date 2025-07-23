import React from "react";
import logo from "../assets/Logo.png";

const AboutDesigner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 px-6 py-16 rounded-3xl">
      {/* Text Content (70%) */}
      <div className="w-full md:w-[70%] md:pl-28 text-center md:text-left">
        <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900 leading-snug tracking-tight">
          About the Designer
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed space-y-2">
          <span className="font-semibold">Archana Solanki</span> is a fashion
          designer based in Pune, with over 10 years of experience in the
          industry.
          After a decade of creating custom pieces, she launched something close
          to her heart,{" "}
          <span className="font-bold italic">
            ‘CASUALS by Archana Solanki.’
          </span>
          <br />
          <br />
          <span className="font-medium">
            This isn’t just another brand in a crowded market.
          </span>{" "}
          It’s your new go-to for everyday pieces that feel like ‘you’ —{" "}
          <span className="italic text-gray-800">
            effortlessly cool, comfortable, and on trend.
          </span>
          <br />
          You won’t find our styles in every closet. We design for{" "}
          <span className="font-semibold">Gen Z and Millennials</span> who want
          to feel good and look good simultaneously.
          <br />
          <br />
          Whether you're working your day job, exploring the city, or just being
          yourself, our pieces{" "}
          <span className="underline underline-offset-4">
            move with you and speak for you
          </span>
          .
          <br />
          <br />
          <span className="font-semibold text-gray-800">
            Because what you wear should feel just as original as you are.
          </span>
        </p>
      </div>

      {/* Image Content (30%) */}
      <div className="w-full md:w-[30%] mr-28 hidden md:block">
        <div className="relative overflow-hidden rounded-2xl  group">
          <img
            src={logo}
            alt="Designer"
            className="w-full h-[28rem] object-cover transform group-hover:scale-105 transition duration-700 ease-in-out"
          />
          <div className="absolute inset-0 rounded-2xl group-hover:bg-black/5 transition duration-700"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutDesigner;
