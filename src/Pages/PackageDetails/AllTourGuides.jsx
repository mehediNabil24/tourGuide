import React from 'react';
import useGuides from '../../Hooks/useGuides';
import { useNavigate } from 'react-router-dom';

const AllTourGuides = () => {
    const [guides]= useGuides();
    const navigate = useNavigate();
    return (
        <div>
             <h2 className="text-3xl font-bold text-center mb-6">Tour Guides</h2>
            
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {guides.map(guide => (
            <div key={guide._id} className="border p-4 rounded-lg shadow-lg text-center">
                <img src={guide.image} alt={guide.name} className="w-24 h-24 mx-auto rounded-full" />
                <h3 className="text-lg font-bold mt-2">{guide.name}</h3>
                <p className="text-gray-600">{guide.email}</p>
                <button
                    onClick={() => navigate(`/tourGuide/${guide._id}`)}
                    className="mt-3 px-4 py-2 bg-[#003C43] text-white rounded-md hover:bg-blue-600"
                >
                    View Profile
                </button>
            </div>
        ))}
    </div>
    </div>
    );
};

export default AllTourGuides;