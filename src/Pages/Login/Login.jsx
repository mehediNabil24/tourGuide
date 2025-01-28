import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Login = () => {
  // const captchaRef = useRef(null)
  const [disabled,setDisabled] =useState(true)

  const {userLogin} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // const from = location.state?.from?.pathname || '/';

  useEffect(()=>{
    loadCaptchaEnginge(6)
  },[])
    const handleLogin = e =>
    {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
        userLogin(email,password)
        .then(result=>{
          const user = result.user;
          console.log(user)
          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            draggable: true
          });
          navigate(location.state? location.state: '/')
        })
    }
    const handelValidateCaptcha =(e)=>{
      const user_captcha_value = e.target.value;
      if(validateCaptcha(user_captcha_value)){
        setDisabled(false)

      }
      else{
        setDisabled(true)
      }

    }
    return (
        <>
        <Helmet><title>Bistro Boss | Login</title></Helmet>
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input onBlur={handelValidateCaptcha} type="text"  name='captcha' className="input input-bordered" placeholder="type captcha here" required />
                {/* <button onClick={handelValidateCaptcha} className="btn btn-outline btn-xs mt-2">Validate</button> */}
              </div>
              <div className="form-control mt-6">
                <button disabled={disabled} className="btn btn-primary">Login</button>
                {/* <input className="btn btn-primary" type="submit" value='Login'/> */}
              </div>
            <p><small>New Here? <Link to={'/signup'}> Create An Account</Link></small></p>
            </form>
          </div>
        </div>
      </div>
        </>
    );
};

export default Login;