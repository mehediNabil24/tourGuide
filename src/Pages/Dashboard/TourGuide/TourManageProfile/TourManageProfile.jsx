import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../Hooks/useAuth";


Modal.setAppElement("#root"); // For accessibility

const TourManageProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
 
  const axiosPublic = useAxiosPublic();
  const { user: authUser } = useAuth();

  // Fetch user data
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", authUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tourGuides/${authUser?.email}`);
      return res.data || { role: "user" }; // Default role as "user"
    },
  });

  // Mutation for updating user
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      await axiosPublic.put(`/tourGuides/${authUser?.email}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      setIsOpen(false);
    },
  });

  const { register, handleSubmit, setValue } = useForm();

  // Prefill form when modal opens
  const openModal = () => {
    setIsOpen(true);
    setValue("name", user?.name || "");
    setValue("image", user?.image || "");
    setValue("email", user?.email || "");
    setValue("role", user?.role || "user");
  };

  const closeModal = () => setIsOpen(false);

  const onSubmit = (data) => {
    mutation.mutate({ name: data.name, image: data.image });
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Welcome, {user?.name}!</h2>
      <div className="flex flex-col items-center">
        <img
          src={user?.image || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4"
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")} // Fallback if image URL is broken
        />
        <p className="text-lg font-semibold">{user?.name}</p>
        <p className="text-gray-600">Email: {user?.email}</p>
        <p className="text-gray-700 font-medium">Role: {user?.role || "user"}</p>

        <button onClick={openModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Edit Profile
        </button>

        
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onRequestClose={closeModal} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20" overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-gray-700">Name:</label>
          <input {...register("name")} className="w-full border px-3 py-2 rounded mt-1" />

          <label className="block text-gray-700 mt-2">Profile Image URL:</label>
          <input {...register("image")} className="w-full border px-3 py-2 rounded mt-1" />

          <label className="block text-gray-700 mt-2">Email:</label>
          <input {...register("email")} disabled className="w-full border px-3 py-2 bg-gray-100 rounded mt-1 cursor-not-allowed" />

          <label className="block text-gray-700 mt-2">Role:</label>
          <input {...register("role")} disabled className="w-full border px-3 py-2 bg-gray-100 rounded mt-1 cursor-not-allowed" />

          <div className="mt-4 flex justify-between">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TourManageProfile;
