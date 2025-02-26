import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactModal from "react-modal";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";


ReactModal.setAppElement("#root"); // Important for accessibility

const AdminManageProfile = () => {
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
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
          onClick={() => setEditModal(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal (React Modal) */}
      <ReactModal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        contentLabel="Edit Profile"
        className="bg-white p-6 rounded-lg shadow-xl w-96 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={adminData.name}
            onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
          />
          <label>Photo URL:</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={adminData.photo}
            onChange={(e) => setAdminData({ ...adminData, photo: e.target.value })}
          />
          <label>Role:</label>
          <input type="text" className="border p-2 rounded bg-gray-200" value={adminData.role} disabled />
          <label>Email:</label>
          <input type="text" className="border p-2 rounded bg-gray-200" value={adminData.email} disabled />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-300">
            Cancel
          </button>
          <button
            onClick={() => {
              axiosPublic.patch(`/adminCollection/${user?.email}`, adminData);
              setEditModal(false);
            }}
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Save Changes
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default AdminManageProfile;
