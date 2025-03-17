import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { FaUsers } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdAutoStories } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { TbPackages } from "react-icons/tb";



const AdminHome = () => {
    const {user} = useAuth();
    const axiosPublic =useAxiosPublic();
  const { data: stats, isLoading: statsLoading } = useQuery({
     queryKey: ["dashboardStats"],
     queryFn: async () => {
       try {
         const [tourGuides, clients, packages,stories] = await Promise.all([
           axiosPublic.get("/tourGuides"),
           axiosPublic.get("/users"),
           axiosPublic.get("/package"),
           axiosPublic.get('/stories')
         ]);
 
         return {
           totalTourGuides: tourGuides?.data?.length || 0,
           totalClients: clients?.data?.length || 0,
           totalPackages: packages?.data?.length || 0,
           totalStories: stories?.data?.length || 0
         };
       } catch (error) {
         console.error("Error fetching stats:", error);
         return null;
       }
     },
   });
    if (statsLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h2 className='text-3xl font-semibold my-6'>
                <span>Hi,Welcome </span>
                {
                    user?.displayName? user.displayName: "Back"
                }
            </h2>
            <div className="stats shadow">
  <div className="stat bg-[#C4DAD2]">
    <div className="stat-figure text-secondary ">
     <FaUser className='text-4xl  text-[#6A9C89]'></FaUser>
    </div>
    <div className="stat-title">Total TourGuides</div>
    <div className="stat-value">{stats.totalTourGuides}</div>
    
  </div>

  <div className="stat bg-[#C4DAD2]">
    <div className="stat-figure text-secondary">
    <FaUsers className='text-4xl  text-[#6A9C89]'></FaUsers>
    </div>
    <div className="stat-title">Total Users</div>
    <div className="stat-value">{stats.totalClients}</div>
    
  </div>

  <div className="stat bg-[#C4DAD2]">
    <div className="stat-figure text-secondary">
    <TbPackages className='text-4xl  text-[#6A9C89]'></TbPackages>
    </div>
    
    <div className="stat-title">Total Packages</div>
    <div className="stat-value">{stats.totalPackages}</div>
   
  </div>

  <div className="stat bg-[#C4DAD2]">
    <div className="stat-figure text-secondary">
    <MdAutoStories className='text-4xl text-[#6A9C89]'></MdAutoStories>
    </div>
    
    <div className="stat-title">Total Stories</div>
    <div className="stat-value">{stats.totalStories}</div>
   
  </div>
</div>
            
        </div>
    );
};

export default AdminHome;