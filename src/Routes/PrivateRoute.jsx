import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation;
    if(loading){
        return <span className="loading loading-infinity loading-md"></span>
    }
    if (user) {
        return children;
    }
    return <Navigate to={'/login'} state={location.pathname} replace></Navigate>
};

export default PrivateRoute;