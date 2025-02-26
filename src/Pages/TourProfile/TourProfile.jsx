import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const TourProfile = () => {
    const {
        _id, email,name,image
    } = useLoaderData();
    console.log(email);

    const axiosPublic = useAxiosPublic();

    const { data: stories = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['storyMan'], 
        queryFn: async () => {
            const res = await axiosPublic.get(`/stories/${email}`);
            return res.data;
        }
    });

   
    return (
        <div >

<div className=" card bg-base-100 w-96 shadow-xl">
    
  <figure className="px-10 pt-10 ">
    <img
      src={image}
      alt="Shoes"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{name}</h2>
    <p>{email}</p>
    <div>
    {stories.length > 0 ? (
            stories.map((story, index) => (
                <p key={index}>Stories: {story.story}</p>
            ))
        ) : (
            <p>No stories found.</p>
        )}
      
    </div>
  </div>
</div>
      
    </div>
    );
};

export default TourProfile;