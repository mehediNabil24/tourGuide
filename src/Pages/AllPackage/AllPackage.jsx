// import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import usePackage from "../../Hooks/usePackage";






const AllPackage = () => {
    const [packages] = usePackage();
    const navigate = useNavigate();

     
      return (
        <div className="py-16 bg-gray-100">
        <div className='mb-12'>
              <SectionTitle heading='From Our Packages' subheading={'Explore Packages'}></SectionTitle>
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
    </div>
    </div>
      );
  };
  
  export default AllPackage;