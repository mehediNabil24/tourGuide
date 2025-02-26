import { useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Modal from "react-modal";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";

Modal.setAppElement("#root"); // Important for accessibility

const AdminManageProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [editModal, setEditModal] = useState(false);
  const [adminData, setAdminData] = useState({});

  // Fetch Admin Data
  const { data: adminInfo, isLoading: adminLoading } = useQuery({
    queryKey: ["adminInfo", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
    onSuccess: (data) => setAdminData(data),
  });

  // Fetch Dashboard Statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      try {
        const [tourGuides, clients, packages, stories] = await Promise.all([
          axiosPublic.get("/users"),
          axiosPublic.get("/package"),
          axiosPublic.get("/tourGuides"),
          axiosPublic.get("/stories"),
        ]);
  
        return {
          totalTourGuides: tourGuides?.data?.length || 0,
          totalClients: clients?.data?.length || 0,
          totalPackages: packages?.data?.length || 0,
          totalStories: stories?.data?.length || 0,
        };
      } catch (error) {
        console.error("Error fetching stats:", error);
        return null;
      }
    },
  });

    // Mutation for updating user
    const mutation = useMutation({
        mutationFn: async (updatedData) => {
          await axiosPublic.put(`/users/${user?.email}`, updatedData);
        },
        onSuccess: () => {
          QueryClient.invalidateQueries(["user"]);
          setIsOpen(false);
        },
      });
    
      const { register, handleSubmit, setValue } = useForm();
    
      // Prefill form when modal opens
      const openModal = () => {
        setIsOpen(true);
        setValue("name", user?.displayName || "");
        setValue("image", user?.photoURL || "");
        setValue("email", user?.email || "");
        setValue("role", user?.role || "admin");
      };
    
      const closeModal = () => setIsOpen(false);
    
      const onSubmit = (data) => {
        mutation.mutate({ name: data.name, image: data.image });
      };
  
  // Ensure stats is available before rendering
  if (adminLoading || statsLoading || !stats) return <p>Loading...</p>;
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome, {adminInfo?.name} 🎉</h2>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {[
        //   { label: "Total Payment", value: `$${stats.totalPayment}` },
          { label: "Total Tour Guides", value: stats.totalTourGuides },
          { label: "Total Clients", value: stats.totalClients },
          { label: "Total Packages", value: stats.totalPackages },
          { label: "Total Stories", value: stats.totalStories },
        ].map((item, index) => (
          <div key={index} className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">{item.label}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Admin Profile */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <div className="flex items-center gap-4">
          <img src={user?.photoURL} alt="Admin" className="w-20 h-20 rounded-full shadow-md" />
          <div>
            <h3 className="text-xl font-semibold">{adminInfo?.name}</h3>
            <p className="text-gray-600">Role: Admin</p>
            <p className="text-gray-600">Email: {adminInfo?.email}</p>
          </div>
        </div>
        <button onClick={openModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal (React Modal) */}
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

export default AdminManageProfile;
