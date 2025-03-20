import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/Social/SocialLogin";
import axios from "axios";

const SignUp = () => {
  const { user, createNewUser, setUser, updatedUserProfile } =
    useContext(AuthContext);
  const [showError, setShowError] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    
    const password = e.target.password.value;
    const image = e.target.image.files[0];
    const formData = new FormData()
    formData.append('image',image)

    //send image data to img_bb
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_hosting_key}`,formData)
   const image_url = data.data.display_url;

    if (password.length < 7) {
      setShowError("Password must be at least 6 characters");
      return;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
    if (!regex.test(password)) {
      setShowError(
        "Password should include one uppercase, one lowercase, and one special character"
      );
      return ;
    }

    createNewUser(email, password)
      .then((result) => {
        setUser(result.user);
        updatedUserProfile({ displayName: name, photoURL: image_url })
          .then(() => {
            const loginTime = new Date().toISOString(); // Get current timestamp
            const userInfo = {
              name,
              email,
               image,
              firstLogin: loginTime, // Store first login time
              lastLogin: loginTime   // Store last login time
            };

            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  console.log("New user added:", userInfo.email);
                  console.log("First Login:", userInfo.firstLogin);
                  console.log("Last Login:", userInfo.lastLogin);

                  navigate("/");
                  setUser({ ...user, displayName: name, photoURL: photo });
                  Swal.fire({
                    title: "User created successfully",
                    icon: "success",
                    draggable: true
                  });
                }
              })
              .catch(error => console.error("Error saving user:", error));
          })
          .catch(error => console.error("Profile update error:", error));
      })
      .catch(error => {
        setShowError(error.message);
      });
  };

  return (
    <>
      <Helmet><title>Bistro Boss | Sign Up</title></Helmet>
      <div className="flex flex-col justify-center items-center p-10">
        <h2 className="text-2xl font-semibold pb-2 text-center">
          Register your account
        </h2>
        <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control rounded-none">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Name" className="input input-bordered" name="name" required />
            </div>
            {showError && <p className="text-red-500">{showError}</p>}
            <div className="form-control rounded-none">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              {/* <input type="text" placeholder="Photo URL" className="input input-bordered" name="photo" required /> */}
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div className="form-control rounded-none">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Email" className="input input-bordered" name="email" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="Password" className="input input-bordered" name="password" required />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-neutral rounded-none">
                Register
              </button>
            </div>
          </form>
          <p className="font-semibold text-center">
            Already have an account? <Link className="text-red-500" to={"/login"}>Login</Link>
          </p>
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default SignUp;
