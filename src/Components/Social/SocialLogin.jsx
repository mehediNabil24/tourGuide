import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result =>{
            console.log(result)
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data)
                navigate('/');
            })
        })

    }
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