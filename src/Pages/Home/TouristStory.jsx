import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import NewSectionTitle from '../../Components/SectionTitle/NewSectionTitle';

const TouristStory = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth(); // Check if user is logged in
    const navigate = useNavigate();

    // Fetch 4 random stories
    const { data: stories = [] } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/randomStories');
            return res.data;
        }
    });

    // Handle Share Click
    const handleShare = (storyUrl) => {
        if (!user) {
            navigate('/login', { state: { from: location.pathname } }); // Redirect to login if not logged in
        }
    };

    return (
        <div className="container mx-auto py-6">
            <NewSectionTitle heading='Tourist Stories' subheading={'📖'} />
            {/* <h2 className="text-2xl font-bold text-center mb-6"> Tourist Stories</h2> */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {stories?.slice(0,2).map(story => (
                    <div key={story._id} className="border p-4 rounded-lg shadow-lg text-center">
                        <img src={story.image} alt="Story" className="w-full h-40 object-cover rounded-md mb-3" />
                        <p className="text-gray-600 text-left">{story.story}</p>
                        
                        {/* Share Button (Only if logged in) */}
                        <div className="mt-3">
                            {user ? (
                                <FacebookShareButton 
                                    url={story.image} 
                                    quote={story.story}
                                >
                                    <FacebookIcon  size={36} round />
                                </FacebookShareButton>
                            ) : (
                                <button 
                                    onClick={handleShare} 
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Login to Share
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Stories Button */}
            <div className="text-center mt-6">
                <button 
                    onClick={() => navigate('/community')}
                    className="px-5 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
                >
                    View All Stories
                </button>
            </div>
        </div>
    );
};

export default TouristStory;
