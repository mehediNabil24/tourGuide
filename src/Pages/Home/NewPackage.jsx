// AllPackage.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import usePackage from '../../Hooks/usePackage';

import NewSectionTitle from '../../Components/SectionTitle/NewSectionTitle';

const NewPackage = () => {
    const [packages] = usePackage();
    const navigate = useNavigate();

    return (
        <div className="py-8 mb-12 md:w-10/12  mx-auto">
            <NewSectionTitle heading='Perfect Holiday' subheading={'Choose Your'} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {packages
                    
                    .map(pkg => (
                        <motion.div key={pkg._id} onClick={() => navigate(`/packageDetails/${pkg._id}`)} className=" shadow-md overflow-hidden relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <img   
                             src={pkg.image} 
                                 alt={pkg.tripTitle} 
                                 className="w-full h-64 object-cover cursor-pointer" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-md font-bold">{pkg.tripTitle}</h3>
                                <p className="text-sm">{pkg.tourType}</p>
                                <p className="text-xl font-semibold">${pkg.price}</p>
                            </div>
                        </motion.div>
                    ))}
            </div>
        </div>
    );
};

export default NewPackage;
