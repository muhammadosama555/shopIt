import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminOutlet = () => {

    const {isAuthenticatedUser,currentUser} = useSelector(state=>state.userSlice)
    let userRole = '';
    if(currentUser){
        userRole=currentUser.user.role
    } 
        
    const  auth = isAuthenticatedUser;
    return auth && userRole == "admin" ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedAdminOutlet