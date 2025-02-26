




import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";



const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api =`https://api.imgbb.com/1/upload?&key=${image_hosting_key}`
const AddStory = () => {

    const axiosPublic = useAxiosPublic();
    
    // const axiosSecure = useAxiosSecure();
  const { register, handleSubmit,reset } = useForm();
  const{user} = useAuth();
  console.log(user);
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
        const userInfo ={
            
            email:user.email,
            name:user.displayName,
            image: res.data.data.display_url,
            story: data.story,
            userImg:user.photoURL


        }
        const menuRes = await axiosPublic.post('/stories',userInfo)
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
              <span className="label-text">Email</span>
            </div>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={user?.email}
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Your Story</span>
             
            </div>
            <textarea {...register('story',{required:true})}
              className="textarea textarea-bordered h-24"
              placeholder="Add your story"
            ></textarea>
           
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
            Add Story 
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStory;
