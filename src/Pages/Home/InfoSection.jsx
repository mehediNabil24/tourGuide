import React from "react";
import { FaStar, FaFacebook, FaGoogle } from "react-icons/fa";

const InfoSection = () => {
  return (
    <div className="bg-blue-900 text-white py-8 mb-10 mx-4 md:mx-0">
      <div className="container mx-auto px-4">
        {/* Main Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {/* Card 1 */}
          <div className="p-4 bg-white/10 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold">200+</h2>
            <p className="mt-2 text-lg">Exotic Destinations</p>
          </div>
          {/* Card 2 */}
          <div className="p-4 bg-white/10 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold">50K+</h2>
            <p className="mt-2 text-lg">Happy Travelers</p>
          </div>
          {/* Card 3 */}
          <div className="p-4 bg-white/10 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold">1.5M+</h2>
            <p className="mt-2 text-lg">Tours Completed</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 border-t border-white/20 pt-4 flex flex-wrap justify-center gap-4 sm:gap-6">
          {/* Review 1 */}
          <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg">
            <FaStar className="text-yellow-400 w-6 h-6" />
            <span className="text-lg">Rating 4.9</span>
          </div>
          {/* Review 2 */}
          <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg">
            <FaFacebook className="text-blue-500 w-6 h-6" />
            <span className="text-lg">Followers 10K</span>
          </div>
          {/* Review 3 */}
          <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg">
            <FaGoogle className="text-red-500 w-6 h-6" />
            <span className="text-lg">Reviews 4.7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
