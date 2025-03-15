import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  // Mutation to update booking after payment
  const updateBookingMutation = useMutation({
    mutationFn: async (data) => {
      await axiosPublic.post(`/payments`, data);
    },
    onSuccess: () => {
      navigate("/my-bookings");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    if (!stripe || !elements) return;

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    const paymentData = {
      bookingId: booking._id,
      amount: booking.price,
      paymentMethodId: paymentMethod.id,
    };

    updateBookingMutation.mutate(paymentData);
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
      <CardElement className="border p-3 rounded" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        disabled={processing}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
