import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaTrash, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const MakeAdmin = () => {
    const axiosPublic = useAxiosPublic()
    const {data: users= [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{

            const res = await axiosPublic.get('/users');
            return res.data;

        }
    })
    const handleDeleteUser = ((users)=>{
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
                  
                    axiosPublic.delete(`/users/${users._id}`)
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
    const handleMakeAdmin = users =>{
      axiosPublic.patch(`/users/admin/${users._id}`)
      .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount>0){
          refetch()
          
Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${users.name} is an admin now!`,
  showConfirmButton: false,
  timer: 1500
});
        }
      })

    }
    return (
      <div className="p-4">
      <h2 className="text-4xl text-center mb-4">Add Admin</h2>
  
      <div className="overflow-hidden">
          {/* Desktop Table */}
          <table className="hidden md:table w-full border border-gray-300">
              <thead className="bg-gray-100">
                  <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Role</th>
                      <th className="p-2">Action</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user, index) => (
                      <tr key={user._id} className="bg-base-200 border-b">
                          <th className="p-2">{index + 1}</th>
                          <td className="p-2">{user.name}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">
                              {user.role === 'admin' ? 'Admin' : (
                                  <button 
                                      onClick={() => handleMakeAdmin(user)} 
                                      className="btn text-white bg-blue-400 px-3 py-1 rounded-md"
                                  >
                                      Make Admin
                                  </button>
                              )}
                          </td>
                          <td className="p-2">
                              <button 
                                  onClick={() => handleDeleteUser(user)} 
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
              {users.map((user, index) => (
                  <div key={user._id} className="border p-4 rounded-lg bg-base-200 shadow-md">
                      <p className="text-lg font-semibold">#{index + 1}</p>
                      <p><span className="font-semibold">Name:</span> {user.name}</p>
                      <p><span className="font-semibold">Email:</span> {user.email}</p>
                      <p>
                          <span className="font-semibold">Role:</span> 
                          {user.role === 'admin' ? ' Admin' : (
                              <button 
                                  onClick={() => handleMakeAdmin(user)} 
                                  className="ml-2 px-3 py-1 bg-blue-400 text-white rounded-md"
                              >
                                  Make Admin
                              </button>
                          )}
                      </p>
                      <button 
                          onClick={() => handleDeleteUser(user)} 
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

export default MakeAdmin;