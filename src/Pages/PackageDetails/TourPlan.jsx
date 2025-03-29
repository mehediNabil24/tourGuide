import { FaHiking, FaUtensils, FaCameraRetro } from "react-icons/fa";

const TourPlan = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
       

        <div className="space-y-8">
          {/* Morning */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <div className="text-4xl text-blue-600 mr-4">
              <FaHiking />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Morning: Adventure & Exploration</h3>
              <p className="text-gray-600">Explore scenic hiking trails and enjoy a morning nature walk.</p>
            </div>
          </div>

          {/* Afternoon */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <div className="text-4xl text-green-600 mr-4">
              <FaUtensils />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Afternoon: Local Cuisine & Culture</h3>
              <p className="text-gray-600">Enjoy a culinary experience with local dishes and cultural performances.</p>
            </div>
          </div>

          {/* Evening */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
            <div className="text-4xl text-orange-500 mr-4">
              <FaCameraRetro />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Evening: Photography & Sightseeing</h3>
              <p className="text-gray-600">Capture stunning views, visit historical sites, and relax in scenic spots.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPlan;
