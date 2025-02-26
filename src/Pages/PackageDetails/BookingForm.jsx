import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useGuides from "../../Hooks/useGuides";

const BookingForm = ({ _id, tripTitle, price }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [guides] = useGuides(); // Fetch guides using hook
  const { user } = useAuth(); // Fetch logged-in user details
  const axiosPublic = useAxiosPublic();

  const [selectedGuideEmail, setSelectedGuideEmail] = useState(""); // Store the selected guide ID

  // Mutation for form submission
  const bookingMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/bookings", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          title: "Booking Successful",
          text: `Your booking for ${tripTitle} is confirmed!`,
          icon: "success",
        });
        reset(); // Reset the form after successful submission
      }
    },
    onError: (error) => {
      Swal.fire({
        title: "Booking Failed",
        text: error.message,
        icon: "error",
      });
    },
  });

  const onSubmit = (data) => {
    bookingMutation.mutate({
      ...data,
      packageId:_id,
      tripTitle,
      touristName: user?.name,
      touristEmail: user?.email,
      touristImage: user?.image,
      price,
      tourGuideEmail: selectedGuideEmail, // Send guide ID to the database
      status:'Pending'
    });
  };

  const handleGuideChange = (event) => {
    const selectedName = event.target.value;
    const guide = guides.find((g) => g.name === selectedName);
    setSelectedGuideEmail(guide?.email || ""); // Set the guide ID
    setValue("tourGuide", selectedName); // Update the form value
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Book Your Tour</h2>

      {/* Tourist Name (Read-only) */}
      <div className="mb-3">
        <label className="block font-medium">Tourist Name:</label>
        <input type="text" value={user?.displayName || ""} readOnly className="w-full p-2 border rounded bg-gray-100" />
      </div>

      {/* Tourist Email (Read-only) */}
      <div className="mb-3">
        <label className="block font-medium">Tourist Email:</label>
        <input type="email" value={user?.email || ""} readOnly className="w-full p-2 border rounded bg-gray-100" />
      </div>

      {/* Tourist Image (Read-only) */}
      <div className="mb-3">
        <label className="block font-medium">Tourist Image:</label>
        <img src={user?.image || "/default-avatar.png"} alt="Tourist" className="w-16 h-16 rounded-full" />
      </div>

      {/* Tour Date */}
<div className="mb-3">
  <label className="block font-medium">Tour Date:</label>
  <Controller
    name="tourDate"
    control={control}
    defaultValue={null}
    rules={{ required: "Tour date is required" }} // Add validation rule here
    render={({ field }) => (
      <DatePicker
        {...field}
        selected={field.value}
        onChange={(date) => field.onChange(date)}
        className="w-full p-2 border rounded"
        placeholderText="Select a date"
      />
    )}
  />

</div>

{/* Tour Guide Selection */}
<div className="mb-3">
  <label className="block font-medium">Tour Guide:</label>
  <select
    {...register("tourGuide", { required: "Tour guide is required" })} // Add validation rule here
    className="w-full p-2 border rounded"
    onChange={handleGuideChange}
  >
    <option value="">Select a guide</option>
    {guides?.map((guide) => (
      <option key={guide.id} value={guide.name}>
        {guide.name}
      </option>
    ))}
  </select>
 
</div>


      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={bookingMutation.isLoading}
      >
        {bookingMutation.isLoading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
};

export default BookingForm;
