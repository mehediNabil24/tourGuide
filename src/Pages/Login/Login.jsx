import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/Social/SocialLogin';
import Lottie from 'lottie-react';
import loginLottie from '../../../public/Animation - 1740608324413.json'


const Login = () => {
  // const captchaRef = useRef(null)
  const [disabled,setDisabled] =useState(true)

  const {userLogin} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
 
  const from = location.state?.from?.pathname || '/';
  console.log(location.state)

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
        <Helmet><title>Ghure Ashi | Login</title></Helmet>
        <div className='max-w-screen-xl mx-auto'>
        <div className=" bg-base-200 hero min-h-screen ">
        
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
           
            <Lottie animationData={loginLottie}></Lottie>
          </div>
          <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-xl">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
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
                {/* to do : make disabled true */}
                <button disabled={false} className="btn btn-primary">Login</button>
                {/* <input className="btn btn-primary" type="submit" value='Login'/> */}
              </div>
            <p><small>New Here? <Link to={'/signup'}> Create An Account</Link></small></p>
            <SocialLogin></SocialLogin>
            </form>
          </div>
        </div>
      </div>
      </div>
        </>
    );
};

export default Login;