

import { FaUtensils } from "react-icons/fa";


import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";


const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api =`https://api.imgbb.com/1/upload?expiration=600000&key=${image_hosting_key}`
const TourGuideApplication = () => {

    const axiosPublic = useAxiosPublic();
    
    // const axiosSecure = useAxiosSecure();
  const { register, handleSubmit,reset } = useForm();
  const{user} = useAuth();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0]}
    const res= await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
            'Content-Type':'multipart/form-data'
        }
    })
    console.log(res.data)
    if(res.data.success)
    {
        const tourGuideInfo ={
            name:user.displayName,
            email:user.email,
            image: res.data.data.display_url,


        }
        const menuRes = await axiosPublic.post('/tourGuideApply',tourGuideInfo)
        console.log(menuRes.data)
        if(menuRes.data.insertedId){
            Swal.fire({
                title: ` is added`,
                text: "Good Job",
                icon: "success"
              });
        }
        reset();
    }
    
}
  return (
    <div>
      <SectionTitle
        heading={"Tour Guide Form "}
        subheading={"Join As A Tour Guide"}
      ></SectionTitle>
      <div>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={user.displayName}
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={user.email}
            />
          </label>

          

          

          <div className="form-control w-full">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full "
              defaultValue={user.image_url}
            />
          </div>

          <button className="btn">
            Apply for Tour Guide 
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourGuideApplication;
