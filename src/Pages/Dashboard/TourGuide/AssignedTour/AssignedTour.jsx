import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const AssignedTours = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [rejectModal, setRejectModal] = useState(null);

  // Fetch assigned tours
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/booking?tourGuideEmail=${user?.email}`);
      return res.data;
    },
  });

  // Mutation to update booking status
  const updateBooking = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosPublic.patch(`/booking/${id}`, { status });
    },
    onSuccess: () => queryClient.invalidateQueries(["bookings", user?.email]),
  });

  const handleAccept = (id) => updateBooking.mutate({ id, status: "Accepted" });

  const handleReject = (id) => {
    updateBooking.mutate({ id, status: "Rejected" });
    setRejectModal(null);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
    <h2 className="text-xl font-bold mb-4 text-center">My Assigned Tours</h2>

    <div className="overflow-hidden">
        {/* Desktop Table */}
        <table className="hidden md:table w-full border border-gray-300">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border p-2">Package</th>
                    <th className="border p-2">Tourist</th>
                    <th className="border p-2">Tour Date</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                    <tr key={booking._id} className="border text-center">
                        <td className="border p-2">{booking.tripTitle}</td>
                        <td className="border p-2">{booking.touristEmail}</td>
                        <td className="border p-2">{new Date(booking.tourDate).toLocaleDateString()}</td>
                        <td className="border p-2">${booking.price}</td>
                        <td className="border p-2">{booking.status}</td>
                        <td className="border p-2 flex gap-2 justify-center">
                            <button
                                disabled={booking.status !== "In Review"}
                                onClick={() => handleAccept(booking._id)}
                                className={`px-4 py-2 border rounded ${booking.status === "In Review" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700 cursor-not-allowed"}`}
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => setRejectModal(booking._id)}
                                className="px-4 py-2 bg-red-500 text-white border rounded"
                            >
                                Reject
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Mobile View - Stacked Cards */}
        <div className="md:hidden space-y-4">
            {bookings.map((booking) => (
                <div key={booking._id} className="border p-4 rounded-lg bg-base-200 shadow-md">
                    <p><span className="font-semibold">Package:</span> {booking.tripTitle}</p>
                    <p><span className="font-semibold">Tourist:</span> {booking.touristEmail}</p>
                    <p><span className="font-semibold">Tour Date:</span> {new Date(booking.tourDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Price:</span> ${booking.price}</p>
                    <p><span className="font-semibold">Status:</span> {booking.status}</p>
                    <div className="flex gap-2 mt-2">
                        <button
                            disabled={booking.status !== "In Review"}
                            onClick={() => handleAccept(booking._id)}
                            className={`px-4 py-2 border rounded ${booking.status === "In Review" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700 cursor-not-allowed"}`}
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => setRejectModal(booking._id)}
                            className="px-4 py-2 bg-red-500 text-white border rounded"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>

    {/* Reject Confirmation Modal */}
    {rejectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <p className="text-lg font-semibold">Are you sure you want to reject this tour?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={() => setRejectModal(null)} className="px-4 py-2 border bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={() => handleReject(rejectModal)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Confirm Reject
                    </button>
                </div>
            </div>
        </div>
    )}
</div>

  );
};

export default AssignedTours;
