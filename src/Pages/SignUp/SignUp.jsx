import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
// import { AuthContext } from "../Context/AuthProvider";
// import { AuthContext } from './AuthProvider';

const SignUp = () => {
  const { user, createNewUser, setUser, updatedUserProfile } =
    useContext(AuthContext);
  const [showError, setShowError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    if (password.length < 7) {
      setShowError("password must be 6 character");
      return;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
    if (!regex.test(password)) {
      setShowError(
        "password should include one uppercase, one lowercase and one special character"
      );
      return;
    }

    // console.log(name, email, photo, password);

    createNewUser(email, password)
      .then((result) => {
        // console.log(result.user);
        setUser(result.user);
        updatedUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
            setUser({ ...user, displayName: name, photoURL: photo });
            Swal.fire({
              title: "User created sucessfully",
              icon: "success",
              draggable: true
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })

      // Navigate to a specific route after success

      .catch((error) => {
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
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              name="name"
              required
            />
          </div>
          {showError && <p className="text-red-500">{showError}</p>}
          <div className="form-control rounded-none">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              name="photo"
              required
            />
          </div>
          <div className="form-control rounded-none">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              name="email"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              name="password"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-neutral rounded-none">
              Register
            </button>
          </div>
        </form>
        <p className="font-semibold text-center">
          Already have an account?{" "}
          <Link className="text-red-500" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default SignUp;
