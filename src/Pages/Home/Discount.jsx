import React from "react";
import { FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import backgroundImage from "../../../src/assets/home/about-one-img-1.e526a0a5.png"; // Replace with actual image path

const DiscountSection = () => {
  return (
    <div className="relative bg-white py-16  lg:flex lg:items-center lg:justify-between">
      {/* Left Side - Image with Overlay */}
      <div className="relative lg:w-1/2">
        {/* Background Image */}
        <div
          className="relative rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
          }}
        >
          {/* Discount Text */}
          <div className="absolute top-24 left-48 text-sky-400 text-4xl font-bold">
            <span className="italic">30%</span>
            <span className="text-black"> Discount</span>
          </div>

          {/* Call-to-Action Box */}
          <div className="absolute bottom-10 left-48 bg-white p-4 shadow-lg rounded-lg flex items-center space-x-3">
            <FaPhoneAlt className="text-sky-500 text-2xl" />
            <div>
              <p className="text-gray-600 text-sm">BOOK TOUR NOW</p>
              <p className="text-xl font-bold text-gray-900">01533379952</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Text Content */}
      <div className="lg:w-1/2 lg:pl-16 mt-10 lg:mt-0">
        <p className="text-sky-500 italic text-lg">Get to know us</p>
        <h1 className="text-5xl font-bold text-gray-900 mt-2">
          Plan Your Trip with <span className="text-gray-800">Mama TourDE</span>
        </h1>
        <p className="text-gray-600 mt-4">
          There are many variations of passages available, but the majority
          have suffered alteration in some form, by injected randomised words
          which don’t look even slightly.
        </p>

        {/* Bullet Points */}
        <ul className="mt-6 space-y-4">
          <li className="flex items-center text-lg text-gray-900">
            <FaCheckCircle className="text-sky-500 mr-3" />
            Invest in your simply neighborhood
          </li>
          <li className="flex items-center text-lg text-gray-900">
            <FaCheckCircle className="text-sky-500 mr-3" />
            Support people in free text extreme need
          </li>
          <li className="flex items-center text-lg text-gray-900">
            <FaCheckCircle className="text-sky-500 mr-3" />
            Largest global industrial business community
          </li>
        </ul>

        {/* Call to Action Button */}
        <button className="mt-6 bg-sky-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-red-600 transition">
          BOOK WITH US NOW
        </button>
      </div>
    </div>
  );
};

export default DiscountSection;
