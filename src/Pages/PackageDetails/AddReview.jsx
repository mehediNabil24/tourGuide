import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';

const AddReview = () => {
    const { user } = useAuth(); // Fetch logged-in user details
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // Mutation function to post the review
  const postReview = async (data) => {
    const response = await axios.post('/api/reviews', data);
    return response.data;
  };

  const { mutate: submitReview, isLoading, isError, error } = useMutation(postReview);

  // Form submit handler
  const onSubmit = (data) => {
    submitReview({
        ...data, name:user.name, email:user.email, image:user.image});
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Submit Your Review</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6">
          {/* Review Text */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="review">
              Your Review
            </label>
            <textarea
              id="review"
              {...register('review', { required: 'Review is required' })}
              className="w-full px-4 py-2 border rounded-lg"
              rows="4"
            />
            {errors.review && <p className="text-red-500 text-sm">{errors.review.message}</p>}
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="rating">
              Rating (1 to 5)
            </label>
            <input
              type="number"
              id="rating"
              {...register('rating', { 
                required: 'Rating is required', 
                min: { value: 1, message: 'Rating must be at least 1' }, 
                max: { value: 5, message: 'Rating must be at most 5' } 
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button 
              type="submit" 
              disabled={isLoading} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>

          {/* Error Message */}
          {isError && <p className="text-red-500 text-sm">{error?.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddReview;
