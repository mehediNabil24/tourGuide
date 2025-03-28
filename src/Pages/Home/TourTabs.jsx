import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useNavigate } from 'react-router-dom';
import { animate, motion } from 'framer-motion';
import usePackage from '../../Hooks/usePackage';
import useGuides from '../../Hooks/useGuides';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const TourTabs = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    
    const [guides] = useGuides();

    // Fetch 4 random stories
    const { data: packages = [] } = useQuery({
        queryKey: ['randomPackage'],
        queryFn: async () => {
            const res = await axiosPublic.get('/randomPackages');
            return res.data;
        }
    });

    return (
        <div className="container mx-auto py-6">
            <Tabs>
            <TabList className="flex gap-4 mb-6 border-b-2 border-gray-300">
  <Tab 
    className="px-4 py-2 rounded-md cursor-pointer bg-gray-300 text-gray-800 hover:bg-blue-400 hover:text-white transition duration-300"
    selectedClassName="!bg-blue-500 !text-white font-bold border-b-4 border-blue-800"
  >
    Our Packages
  </Tab>
  <Tab 
    className="px-4 py-2 rounded-md cursor-pointer bg-gray-300 text-gray-800 hover:bg-blue-400 hover:text-white transition duration-300"
    selectedClassName="!bg-blue-500 !text-white font-bold border-b-4 border-blue-800"
  >
    Meet Our Tour Guides
  </Tab>
</TabList>


                {/* Packages Tab */}
                <TabPanel>
    <div>
        <motion.div
            variants={{
                hidden: { opacity: 0 },
                show: { 
                    opacity: 1, 
                    transition: { staggerChildren: 0.3, delayChildren: 0.2 } 
                } 
            }} 
            initial="hidden" 
            animate="show" 
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            {packages.map((pkg, index) => (
                <motion.div
                    key={pkg._id} 
                   initial={{ opacity: 0, y: 100 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.3 }}
                   
                    className="border p-4 rounded-lg shadow-lg " whileHover={{ scale:1.1, y: -5 }}
                >
                    <motion.img src={pkg.image} alt={pkg.tripTitle} className="w-full h-40 object-cover  rounded-md transition-transform duration-500 ease-in-out "   />
                    <h3 className="text-lg font-bold mt-2">{pkg.tripTitle}</h3>
                    <p className="text-gray-600">{pkg.tourType}</p>
                    <p className="text-lg font-semibold text-green-600">${pkg.price}</p>
                    <button
                        onClick={() => navigate(`/packageDetails/${pkg._id}`)}
                        className="mt-3 px-4 py-2 bg-[#003C43] text-white rounded-md hover:bg-blue-600"
                    >
                        View Details
                    </button>
                </motion.div>
            ))}
        </motion.div>

        <div className="text-center mt-6">
            <button 
                onClick={() => navigate('/package')}
                className="px-5 py-2 bg-[#003C43] text-white rounded-md hover:bg-blue-600"
            >
                View All Packages
            </button>
        </div>
    </div>
</TabPanel>




                {/* Tour Guides Tab */}
                <TabPanel>
                    <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {guides.map((guide) => (
    <motion.div
      key={guide._id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white border border-gray-200 rounded-lg shadow-md p-6 text-center transform transition-all"
    >
      {/* Profile Image with a Border Effect */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img
          src={guide.image}
          alt={guide.name}
          className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-md"
        />
      </div>

      {/* Name & Email */}
      <h3 className="text-xl font-bold text-gray-800">{guide.name}</h3>
      <p className="text-gray-500">{guide.email}</p>

      {/* Fancy Gradient Divider */}
      <div className="w-20 mx-auto my-3 h-1 bg-gradient-to-r from-[#003C43] to-blue-600 rounded-full"></div>

      {/* Profile Button */}
      <button
        onClick={() => navigate(`/tourGuide/${guide._id}`)}
        className="mt-3 px-5 py-2 rounded-md text-white bg-blue-500 hover:from-blue-600 hover:to-[#003C43] shadow-md transition-all duration-300"
      >
        View Profile
      </button>
    </motion.div>
  ))}
</div>

                    
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourTabs;
