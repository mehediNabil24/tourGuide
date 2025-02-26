import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaTrash, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ManageCandidate = () => {
    const axiosPublic = useAxiosPublic()
    const {data: tourGuides= [], refetch} = useQuery({
        queryKey: ['tourGuides'],
        queryFn: async()=>{

            const res = await axiosPublic.get('/tourGuideApply');
            return res.data;

        }
    })
    const handleDeleteTourGuide = ((tourGuides)=>{
         Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                  
                    axiosPublic.delete(`/tourGuides/${tourGuides._id}`)
                    .then(res=>{
                        if(res.data.deletedCount>0){
                                Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                      
        
                        }
                        refetch();
        
                    })
                    }
                  });

    })
    const handleMakeTourGuide = tourGuides =>{
      axiosPublic.patch(`/users/tourGuides/${tourGuides._id}`)
      .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount>0){
          refetch()
          
Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${tourGuides.name} is a Tour Guide now!`,
  showConfirmButton: false,
  timer: 1500
});
        }
      })

    }
    return (
        <div>
            <h2 className="text-2xl">Total Application For TourGuide : {tourGuides.length}</h2>

            <div className="overflow-x-auto">
  <table className="table w-full mt-5">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        tourGuides.map((tourGuide,index)=>  <tr key={tourGuide._id} className="bg-base-200">
            <th>{index+1}</th>
            <td>{tourGuide.name}</td>
            <td>{tourGuide.email}</td>
            <td>
  {tourGuide.role === 'tourGuide' ? (
    'Tour Guide'
  ) : (
    <button onClick={() => handleMakeTourGuide(tourGuide)} className="btn btn-lg text-white text-xl bg-orange-400">
      MakeTourGuide
    </button>
  )}
</td>

            <td>
                 <button onClick={()=>{handleDeleteTourGuide(tourGuide)}} className="btn btn-ghost btn-lg text-red-600"><FaTrash></FaTrash></button>
            </td>
          </tr>
        )
      }
     
    
    </tbody>
  </table>
</div>
            
        </div>
    );
};

export default ManageCandidate;