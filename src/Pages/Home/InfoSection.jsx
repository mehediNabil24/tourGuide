import { useQuery } from "@tanstack/react-query";
import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaStar, FaFacebook, FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AnimatedCounter = ({ value }) => (
  <CountUp start={0} end={value} duration={2} separator="," />
);

const InfoSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      try {
        const [tourGuides, clients, packages] = await Promise.all([
          axiosPublic.get("/tourGuides"),
          axiosPublic.get("/users"),
          axiosPublic.get("/package"),
        ]);

        return {
          totalTourGuides: tourGuides?.data?.length || 0,
          totalClients: clients?.data?.length || 0,
          totalPackages: packages?.data?.length || 0,
        };
      } catch (error) {
        console.error("Error fetching stats:", error);
        return null;
      }
    },
  });

  return (
    <div className="bg-[#003C43] text-white py-8 mb-10  md:mx-0">
      <div className="container mx-auto px-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {/* Card 1 */}
          <motion.div
            className="p-4 bg-white/10 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold">
              {statsLoading ? "Loading..." : <AnimatedCounter value={stats?.totalTourGuides} />}
            </h2>
            <p className="mt-2 text-lg">Registered Tour Guides</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="p-4 bg-white/10 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold">
              {statsLoading ? "Loading..." : <AnimatedCounter value={stats?.totalClients} />}
            </h2>
            <p className="mt-2 text-lg">Happy Travelers</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="p-4 bg-white/10 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold">
              {statsLoading ? "Loading..." : <AnimatedCounter value={stats?.totalPackages} />}
            </h2>
            <p className="mt-2 text-lg">Available Tour Packages</p>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 border-t border-white/20 pt-4 flex flex-wrap justify-center gap-4 sm:gap-6">
          <motion.div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}>
            <FaStar className="text-yellow-400 w-6 h-6" />
            <span className="text-lg">Rating 4.9</span>
          </motion.div>

          <motion.div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}>
            <FaFacebook className="text-blue-500 w-6 h-6" />
            <span className="text-lg">Followers 10K</span>
          </motion.div>

          <motion.div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}>
            <FaGoogle className="text-red-500 w-6 h-6" />
            <span className="text-lg">Reviews 4.7</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
