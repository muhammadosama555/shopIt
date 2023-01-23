import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedOutlet = () => {

    const {isAuthenticatedUser} = useSelector(state=>state.userSlice)
    const  auth = isAuthenticatedUser;
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedOutlet