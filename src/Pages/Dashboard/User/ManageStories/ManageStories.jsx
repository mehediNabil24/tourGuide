import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../Hooks/useAuth";

Modal.setAppElement("#root");

const ManageStories = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  
  const { register, handleSubmit, reset } = useForm();

  // Fetch stories
  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/stories/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

   // Mutation to delete a story
   const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosPublic.delete(`/stories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["stories", user?.email]);
    },
  });

  // Mutation to update a story
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedStory }) => {
      await axiosPublic.put(`/stories/${id}`, updatedStory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["stories", user?.email]);
      setModalIsOpen(false);
    },
  });

  // Open Edit Modal
  const openEditModal = (story) => {
    console.log("Opening Modal:", story); // Debugging
    setSelectedStory(story);
    reset({ story: story.story, image: story.image });
    setModalIsOpen(true);
  };

  // Handle Edit Submission
  const onSubmit = (data) => {
    updateMutation.mutate({
      id: selectedStory._id,
      updatedStory: { story: data.story, image: data.image },
    });
  };

  if (isLoading) return <p>Loading stories...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold text-center">Total Stories added by me:{stories.length}</h1>
    <div className="grid grid-cols-1 gap-4 p-6">
      
      {stories?.map((story) => (
        <div key={story._id} className="bg-white shadow-md rounded-lg p-4">
          <img src={story.image} alt="Story" className=" w-[100%] md:h-[50%] h-[250px] object-cover rounded" />
          <h3 className="text-xl">{story.story}</h3>

          <div className="flex justify-between mt-4">
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => openEditModal(story)}>
              Edit
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteMutation.mutate(story._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Story Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      >
        <h2 className="text-2xl mb-4">Edit Story</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Story:</label>
          <input className="border p-2 w-full" {...register("story")} required />

          <label>Image URL:</label>
          <input className="border p-2 w-full" {...register("image")} required />

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Update
            </button>
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setModalIsOpen(false)}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
    </div>
  );
};

export default ManageStories;
