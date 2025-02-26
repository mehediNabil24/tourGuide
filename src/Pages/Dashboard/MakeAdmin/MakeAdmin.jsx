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
        <div>
            <h2 className="text-4xl">Add Admin</h2>

            <div className="overflow-x-auto">
  <table className="table w-full mt-5">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user,index)=>  <tr key={user._id} className="bg-base-200">
            <th>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                {
                  user.role === 'admin' ? 'Admin':  <button onClick={()=>{handleMakeAdmin(user)}} className="btn btn-lg text-white text-xl bg-blue-400">MakeAdmin</button>
                }

            </td>
            <td>
                 <button onClick={()=>{handleDeleteUser(user)}} className="btn btn-ghost btn-lg text-red-600"><FaTrash></FaTrash></button>
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

export default MakeAdmin;