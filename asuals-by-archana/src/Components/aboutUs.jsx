import React from "react";
import logo from "../assets/Logo.png";

const AboutDesigner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 px-6 py-16 rounded-3xl">
      {/* Text Content (70%) */}
      <div className="w-full md:w-[70%] md:pl-28 text-center md:text-left">
        <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900 leading-snug tracking-tight">
          About Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed space-y-2">
            <span className="font-semibold text-gray-900">
              At Casuals by Archana Solanki, we’re redefining what “casual” means.
            </span>
            <br />
            <br />
            We are not here to chase trends,{" "}
            <span className="font-medium text-gray-800">we are here to create them for you.</span>{" "}
            Each drop is a{" "}
            <span className="italic font-semibold">limited edition collection</span>, designed to make you feel stand out effortlessly.
            <br />
            <br />
            Every garment is made with{" "}
            <span className="font-semibold">high-quality fabrics</span> for everyday comfort, without compromising on style.{" "}
            <span className="italic">We design with ‘you’ in mind.</span>
            <br />
            <br />
            You won’t find our styles in every closet. Whether you are{" "}
            <span className="underline underline-offset-4">working a day job, exploring the city, or just being yourself</span>, our smart casuals move with you.
            <br />
            <br />
            <span className="font-semibold text-gray-800">
              This brand is particularly built for millennials and Gen Z
            </span>{" "}
            who want to stand out without trying too hard, our casual wear blends{" "}
            <span className="font-medium">comfort, uniqueness, and style</span> altogether.
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
          <div className="absolute inset-0 rounded-2xl  transition duration-700"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutDesigner;
