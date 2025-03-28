import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/Social/SocialLogin';
import Lottie from 'lottie-react';
import loginLottie from '../../../public/Animation - 1740608324413.json';

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { userLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   loadCaptchaEnginge(6);
  // }, []);

  const handleLogin = e => {
    e.preventDefault();
    userLogin(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: 'Login Successful!',
          icon: 'success',
          draggable: true
        });
        navigate(from, { replace: true });
      });
  };

  const handleRoleLogin = (role) => {
    if (role === 'admin') {
      setEmail('2020-1-60-20@std.ewubd.edu');
      setPassword('Aa@123456');
    } else if (role === 'tourGuide') {
      setEmail('safayet12@gmail.com');
      setPassword('Aa@123456');
    } else if (role === 'user') {
      setEmail('adnan13@gmail.com');
      setPassword('Aa@123456');
    }
  };

  // const handelValidateCaptcha = e => {
  //   const user_captcha_value = e.target.value;
  //   setDisabled(!validateCaptcha(user_captcha_value));
  // };

  return (
    <>
      <Helmet><title>Ghure Ashi | Login</title></Helmet>
      <div className='max-w-screen-xl mx-auto'>
        <div className="bg-base-200 hero min-h-screen">
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
                  <input 
                    type="email" 
                    placeholder="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="input input-bordered" 
                    required 
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="input input-bordered" 
                    required 
                  />
                </div>
                {/* <div className="form-control">
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input 
                    onBlur={handelValidateCaptcha} 
                    type="text" 
                    name='captcha' 
                    className="input input-bordered" 
                    placeholder="Type captcha here" 
                    required 
                  />
                </div> */}
                <div className="form-control mt-6">
                  <button disabled={false} className="btn btn-primary">Login</button>
                </div>
                <p><small>New Here? <Link to={'/signup'}>Create An Account</Link></small></p>
                <SocialLogin />
              </form>

              {/* 🚀 Quick Role Login Buttons */}
              <div className="flex justify-around mb-2">
                <button onClick={() => handleRoleLogin('admin')} className="btn bg-[#6A9C89]">Admin</button>
                <button onClick={() => handleRoleLogin('tourGuide')} className="btn bg-[#6A9C89]">Tour Guide</button>
                <button onClick={() => handleRoleLogin('user')} className="btn bg-[#6A9C89]">User</button>
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
