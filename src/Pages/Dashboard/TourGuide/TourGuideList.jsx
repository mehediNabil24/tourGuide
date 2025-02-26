import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const TourGuideList = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch data using React Query
    const { data: guides = [], refetch } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tourGuides');
            return res.data;
        }
    });

    return (
        <div>
            <h2 className="text-xl font-semibold">Tour Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide) => (
                    <div key={guide._id} className="p-4 border rounded-lg shadow-md">
                        <img src={guide.image} alt={guide.name} className="w-full h-40 object-cover rounded-md" />
                        <h3 className="mt-2 text-lg font-bold">{guide.name}</h3>
                        <p className="text-gray-600">{guide.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourGuideList;
