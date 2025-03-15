import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { FacebookIcon, FacebookShareButton } from 'react-share';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';


const Community = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth(); // Check if user is logged in
    const navigate = useNavigate();

    // Fetch 4 random stories
    const { data: stories = [], refetch } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/stories');
            return res.data;
        }
    });

    // Handle Share Click
    const handleShare = (storyUrl) => {
        if (!user) {
            navigate('/login'); // Redirect to login if not logged in
        }
    };

    return (
        <div className="py-16 bg-gray-100">
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">📖 Tourist Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {stories.map(story => (
                    <div key={story._id} className="border p-4 rounded-lg shadow-lg text-center">
                        <img src={story.image} alt="Story" className="w-full h-40 object-cover rounded-md mb-3" />
                        <p className="text-gray-600 text-left">{story.story}</p>
                        
                        {/* Share Button */}
                        <div className="mt-3">
                            <FacebookShareButton 
                                url={story.image} 
                                quote={story.story}
                                onClick={() => handleShare(story.image)}
                            >
                                <FacebookIcon size={36} round />
                            </FacebookShareButton>
                        </div>
                    </div>
                ))}
            </div>

            
        </div>
        </div>
    );
};

export default Community;
