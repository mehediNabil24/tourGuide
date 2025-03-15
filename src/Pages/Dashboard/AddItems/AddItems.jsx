import { FaUtensils } from "react-icons/fa";

import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;
const AddItems = () => {
  const axiosPublic = useAxiosPublic();

  // const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      const packageItem = {
        tripTitle: data.tripTitle,
        category: data.category,
        price: parseFloat(data.price),
        description: data.description,
        duration: data.duration,
        location: data.location,
        image: res.data.data.display_url,
      };
      const menuRes = await axiosPublic.post("/package", packageItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        Swal.fire({
          title: ` is added`,
          text: "Good Job",
          icon: "success",
        });
      }
      reset();
    }
  };
  return (
    <div>
      <SectionTitle
        heading={"Add a Package"}
        subheading={"What's New?"}
      ></SectionTitle>
      <div>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Trip Title</span>
            </div>
            <input
              {...register("tripTitle", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              autoComplete="off"
            />
          </label>

          <div className="flex gap-2 ">
            {/* category  */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full "
                autoComplete="off"
              >
                <option disabled selected>
                  Choose Category
                </option>
                <option value="adventure">Adventure</option>
                <option value="cultural">Cultural</option>
                <option value="nature">Nature</option>
                <option value="historical">Historical</option>
                <option value="beach">Beach</option>
              </select>
            </label>

            {/* price  */}
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tour Description"
            ></textarea>
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <input
              {...register("location", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              autoComplete="off"
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Duration</span>
            </div>
            <input
              {...register("duration", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              autoComplete="off"
            />
          </label>

          <div className="form-control w-full">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full "
            />
          </div>

          <button className="btn">
            Add Package 
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
