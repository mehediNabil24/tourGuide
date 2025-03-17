import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result);
                const loginTime = new Date().toISOString(); // Current timestamp
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    firstLogin: loginTime,
                    lastLogin: loginTime
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate(location.state ? location.state : '/');
                    });
            })
            .catch(error => {
                console.error("Google sign-in error:", error);
            });
    };

    return (
        <div className='text-center'>
            <div className='divider'></div>
            <div>
                <button onClick={handleGoogleSignIn} className='btn text-blue-600 '>
                    <FaGoogle className='mr-2 text-blue-600'></FaGoogle>Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
