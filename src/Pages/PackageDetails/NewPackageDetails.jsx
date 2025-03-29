import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useGuides from "../../Hooks/useGuides";
import PackageHero from "./PackageHero";
import TabPacakge from "./TabPacakge";

const NewPackageDetails = () => {
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
      packageId: _id,
      tripTitle,
      touristName: user?.name,
      touristEmail: user?.email,
      touristImage: user?.image,
      price,
      tourGuideEmail: selectedGuideEmail, // Send guide ID to the database
      status: "Pending",
    });
  };

  const handleGuideChange = (event) => {
    const selectedName = event.target.value;
    const guide = guides.find((g) => g.name === selectedName);
    setSelectedGuideEmail(guide?.email || ""); // Set the guide ID
    setValue("tourGuide", selectedName); // Update the form value
  };
  const {
    _id,
    image,
    category,
    price,
    duration,
    location,
    description,
    tripTitle,
  } = useLoaderData();

  const navigate = useNavigate();
  return (
    <div>
        <PackageHero></PackageHero>
    <div className="w-11/12 mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tour Details */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-600">
              <div className="flex flex-col items-center">
                <span className="text-red-500 text-lg">⏳</span>
                <span>{duration}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-red-500 text-lg">🗺</span>
                <span>{category}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-red-500 text-lg">👥</span>
                <span>30 People</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-red-500 text-lg">🧑‍✈️</span>
                <span>05 People</span>
              </div>
            </div>
          </div>

          {/* Tour Image */}
          <img src={image} alt="Tour" className="w-full rounded-lg shadow-lg" />

          {/* Tour Title */}
          <h2 className="text-2xl font-bold mt-4">
            <span className="text-red-500">📍 {location}</span>
            <br />
            San Francisco Golden Gate Bridge.
          </h2>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {Array(3)
              .fill()
              .map((_, i) => (
                <span key={i} className="text-red-500 text-xl">
                  ★
                </span>
              ))}
          </div>

          {/* Buttons */}
          <TabPacakge description={description}></TabPacakge>
         
        </div>

        {/* Booking Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-lg font-bold mb-4">
            Book This Tour{" "}
            <span className="text-red-500 float-right text-xl">${price}</span>{" "}
            <span className="text-sm">Per Person</span>
          </h3>

          {/* <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-2 border rounded-lg"
            />
            <select className="w-full p-2 border rounded-lg">
              <option>Tickets Type</option>
              <option>Adult</option>
              <option>Child</option>
            </select>
            <div className="flex gap-2">
              <select className="w-1/2 p-2 border rounded-lg">
                <option>Adult</option>
                <option>1</option>
                <option>2</option>
              </select>
              <select className="w-1/2 p-2 border rounded-lg">
                <option>Child</option>
                <option>0</option>
                <option>1</option>
              </select>
            </div>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
            />
            <textarea
              placeholder="Your message"
              className="w-full p-2 border rounded-lg"
            />
            <button className="w-full bg-red-500 text-white p-3 rounded-lg">
              Book Now
            </button>
          </form> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Tourist Name (Read-only) */}
            <div className="mb-3">
              <label className="block font-medium">Tourist Name:</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Tourist Email (Read-only) */}
            <div className="mb-3">
              <label className="block font-medium">Tourist Email:</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Tourist Image (Read-only) */}
            <div className="mb-3">
              <label className="block font-medium">Tourist Image:</label>
              <img
                src={user?.image || "/default-avatar.png"}
                alt="Tourist"
                className="w-16 h-16 rounded-full"
              />
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
                {...register("tourGuide", {
                  required: "Tour guide is required",
                })} // Add validation rule here
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
        </div>
      </div>
    </div>
    </div>
  );
};

export default NewPackageDetails;
