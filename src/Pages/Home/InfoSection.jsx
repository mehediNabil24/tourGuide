import { useQuery } from "@tanstack/react-query";
import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUserTie, FaSmile, FaSuitcaseRolling } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AnimatedCounter = ({ value }) => (
  <CountUp start={0} end={value} duration={10} separator="," />
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
    <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white py-8 px-6 shadow-lg">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {/* Card 1 - Tour Guides */}
          <motion.div
            className="p-6 bg-white/10 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <FaUserTie className="text-white text-3xl mx-auto mb-3" />
            <h2 className="text-4xl font-extrabold">
              {statsLoading ? "..." : <AnimatedCounter value={stats?.totalTourGuides} />}
            </h2>
            <p className="mt-2 text-lg font-medium">Registered Tour Guides</p>
          </motion.div>

          {/* Card 2 - Happy Travelers */}
          <motion.div
            className="p-6 bg-white/10 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <FaSmile className="text-white text-3xl mx-auto mb-3" />
            <h2 className="text-4xl font-extrabold">
              {statsLoading ? "..." : <AnimatedCounter value={stats?.totalClients} />}
            </h2>
            <p className="mt-2 text-lg font-medium">Happy Travelers</p>
          </motion.div>

          {/* Card 3 - Tour Packages */}
          <motion.div
            className="p-6 bg-white/10 rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            
            <FaSuitcaseRolling className="text-white text-3xl mx-auto mb-3" />
            <h2 className="text-4xl font-extrabold">
              {statsLoading ? "..." : <AnimatedCounter value={stats?.totalPackages} />}
            </h2>
            <p className="mt-2 text-lg font-medium">Available Tour Packages</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;