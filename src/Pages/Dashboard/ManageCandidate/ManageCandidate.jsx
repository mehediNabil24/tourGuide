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
      <div className="p-4">
      <h2 className="text-2xl text-center mb-4">
          Total Application For Tour Guide: {tourGuides.length}
      </h2>
  
      <div className="overflow-hidden">
          {/* Desktop Table */}
          <table className="hidden md:table w-full border border-gray-300">
              <thead className="bg-gray-100">
                  <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Role</th>
                      <th className="p-2">Delete</th>
                  </tr>
              </thead>
              <tbody>
                  {tourGuides.map((tourGuide, index) => (
                      <tr key={tourGuide._id} className="bg-base-200 border-b">
                          <th className="p-2">{index + 1}</th>
                          <td className="p-2">{tourGuide.name}</td>
                          <td className="p-2">{tourGuide.email}</td>
                          <td className="p-2">
                              {tourGuide.role === 'tourGuide' ? (
                                  'Tour Guide'
                              ) : (
                                  <button 
                                      onClick={() => handleMakeTourGuide(tourGuide)} 
                                      className="btn text-white bg-orange-400 px-3 py-1 rounded-md"
                                  >
                                      Make Tour Guide
                                  </button>
                              )}
                          </td>
                          <td className="p-2">
                              <button 
                                  onClick={() => handleDeleteTourGuide(tourGuide)} 
                                  className="btn btn-ghost text-red-600"
                              >
                                  <FaTrash />
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
  
          {/* Mobile View - Stacked Cards */}
          <div className="md:hidden space-y-4">
              {tourGuides.map((tourGuide, index) => (
                  <div key={tourGuide._id} className="border p-4 rounded-lg bg-base-200 shadow-md">
                      <p className="text-lg font-semibold">#{index + 1}</p>
                      <p><span className="font-semibold">Name:</span> {tourGuide.name}</p>
                      <p><span className="font-semibold">Email:</span> {tourGuide.email}</p>
                      <p>
                          <span className="font-semibold">Role:</span> 
                          {tourGuide.role === 'tourGuide' ? ' Tour Guide' : (
                              <button 
                                  onClick={() => handleMakeTourGuide(tourGuide)} 
                                  className="ml-2 px-3 py-1 bg-orange-400 text-white rounded-md"
                              >
                                  Make Tour Guide
                              </button>
                          )}
                      </p>
                      <button 
                          onClick={() => handleDeleteTourGuide(tourGuide)} 
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                      >
                          <FaTrash />
                      </button>
                  </div>
              ))}
          </div>
      </div>
  </div>
  
    );
};

export default ManageCandidate;