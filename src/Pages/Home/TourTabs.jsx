import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useNavigate } from 'react-router-dom';
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
        <div className="container mx-auto p-6">
            <Tabs>
                <TabList className="flex gap-4 mb-6">
                    <Tab 
                        className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400"
                        selectedClassName="bg-red-500 text-white"
                    >
                        Our Packages
                    </Tab>
                    <Tab 
                        className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400"
                        selectedClassName="bg-red-500 text-white"
                    >
                        Meet Our Tour Guides
                    </Tab>
                </TabList>

                {/* Packages Tab */}
                <TabPanel>
                    <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {packages.map(pkg => (
                            <div key={pkg._id} className="border p-4 rounded-lg shadow-lg">
                                <img src={pkg.image} alt={pkg.tripTitle} className="w-full h-40 object-cover rounded-md" />
                                <h3 className="text-lg font-bold mt-2">{pkg.tripTitle}</h3>
                                <p className="text-gray-600">{pkg.tourType}</p>
                                <p className="text-lg font-semibold text-green-600">${pkg.price}</p>
                                <button
                                    onClick={() => navigate(`/packageDetails/${pkg._id}`)}
                                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-6">
                <button 
                    onClick={() => navigate('/package')}
                    className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    View All Packages
                </button>
            </div>

                    </div>
                </TabPanel>

                {/* Tour Guides Tab */}
                <TabPanel>
                    <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {guides.map(guide => (
                            <div key={guide._id} className="border p-4 rounded-lg shadow-lg text-center">
                                <img src={guide.image} alt={guide.name} className="w-24 h-24 mx-auto rounded-full" />
                                <h3 className="text-lg font-bold mt-2">{guide.name}</h3>
                                <p className="text-gray-600">{guide.email}</p>
                                <button
                                    onClick={() => navigate(`/tourGuide/${guide._id}`)}
                                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    View Profile
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TourTabs;
