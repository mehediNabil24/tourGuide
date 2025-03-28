import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";


import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../Hooks/useAuth";

const stripePromise = loadStripe("pk_test_51Qsi1fGdqRxHYXkK1NCLLfeVqNJWwB4TuQfL27hFEMJDMQfIUhwcfF1HFqoLb9ppb1M32mfOsHBC6ZbY8XG84cHe00bxwLOj3W");

const MyBooking = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch user bookings
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/bookings/${user?.email}`);
      return res.data;
    },
  });

  // Mutation for canceling a booking
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      await axiosPublic.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings", user?.email]);
    },
  });

  if (isLoading) return <p>Loading bookings...</p>;

  return (
    <div className="p-6">
    <h2 className="text-2xl font-bold mb-4 text-center">My Bookings</h2>

    <div className="overflow-hidden">
        {/* Desktop Table */}
        <table className="hidden md:table w-full border border-gray-300">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border px-4 py-2">Package</th>
                    <th className="border px-4 py-2">Tour Guide</th>
                    <th className="border px-4 py-2">Tour Date</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings?.map((booking) => (
                    <tr key={booking._id} className="text-center border-b">
                        <td className="border px-4 py-2">{booking.tripTitle}</td>
                        <td className="border px-4 py-2">{booking.tourGuide}</td>
                        <td className="border px-4 py-2">{new Date(booking.tourDate).toLocaleDateString()}</td>
                        <td className="border px-4 py-2">${booking.price}</td>
                        <td className="border px-4 py-2">{booking.status || "Pending"}</td>
                        <td className="border px-4 py-2 flex gap-2 justify-center">
                            {booking.status === "Pending" && (
                                <>
                                    <button
                                        onClick={() => navigate(`/payment/${booking._id}`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                    >
                                        Pay
                                    </button>
                                    <button
                                        onClick={() => cancelMutation.mutate(booking._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Mobile View - Stacked Cards */}
        <div className="md:hidden space-y-4">
            {bookings?.map((booking) => (
                <div key={booking._id} className="border p-4 rounded-lg bg-base-200 shadow-md">
                    <p><span className="font-semibold">Package:</span> {booking.tripTitle}</p>
                    <p><span className="font-semibold">Tour Guide:</span> {booking.tourGuide}</p>
                    <p><span className="font-semibold">Tour Date:</span> {new Date(booking.tourDate).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Price:</span> ${booking.price}</p>
                    <p><span className="font-semibold">Status:</span> {booking.status || "Pending"}</p>
                    {booking.status === "Pending" && (
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => navigate(`/payment/${booking._id}`)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Pay
                            </button>
                            <button
                                onClick={() => cancelMutation.mutate(booking._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
</div>

  );
};

export default MyBooking;
