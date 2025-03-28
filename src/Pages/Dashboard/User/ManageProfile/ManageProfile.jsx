import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../Hooks/useAuth";

Modal.setAppElement("#root"); // For accessibility

const ManageProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user: authUser } = useAuth();

  // Fetch user data
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", authUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${authUser?.email}`);
      return res.data || { role: "user" }; // Default role as "user"
    },
  });

  // Mutation for updating user
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      await axiosPublic.put(`/users/${authUser?.email}`, updatedData);
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
    mutation.mutate({ name: data.name, photo: data.photo });
  };

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 md:mt-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 ">Welcome, {user?.name}!</h2>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Gradient Header */}
      <div className="h-28 bg-gradient-to-r from-blue-500 to-purple-500"></div>

      {/* Profile Section */}
      <div className="flex flex-col items-center -mt-12">
        <img
          src={authUser?.photoURL || "/default-profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
        <h2 className="text-xl font-semibold mt-2">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
        
        {/* Membership Badge */}
        <span className="bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-full mt-2">
          Bronze Member
        </span>
      </div>

      {/* User Information */}
      <div className="p-6">
      <p className="text-gray-500 text-sm">
  🕒 Joined: {user?.firstLogin ? new Date(user.firstLogin).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
</p>
        <p className="text-gray-500 text-sm mt-1">
          🎭 Role: {user?.role || "User"}
        </p>

        {/* Edit Profile Button */}
        <button
          onClick={openModal}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Edit Profile
        </button>

        {/* Apply for Tour Guide Button (if not already a tour guide) */}
        {user?.role !== "tourGuide" && (
          <button
            onClick={() => navigate("/dashboard/tourGuideApply")}
            className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Apply for Tour Guide
          </button>
        )}
      </div>
    </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onRequestClose={closeModal} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20" overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-gray-700">Name:</label>
          <input {...register("name")} className="w-full border px-3 py-2 rounded mt-1" />

          <label className="block text-gray-700 mt-2">Profile Image URL:</label>
          <input {...register("photo")} className="w-full border px-3 py-2 rounded mt-1" />

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

export default ManageProfile;
