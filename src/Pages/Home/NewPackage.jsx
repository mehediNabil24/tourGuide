// AllPackage.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
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
                        <div key={pkg._id} className=" shadow-md overflow-hidden relative">
                            <img  onClick={() => navigate(`/packageDetails/${pkg._id}`)} 
                             src={pkg.image} 
                                 alt={pkg.tripTitle} 
                                 className="w-full h-64 object-cover cursor-pointer" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-md font-bold">{pkg.tripTitle}</h3>
                                <p className="text-sm">{pkg.tourType}</p>
                                <p className="text-xl font-semibold">${pkg.price}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default NewPackage;
