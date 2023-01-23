import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css"
import Search from "./Search";
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logout } from "../../reducers/apiCalls";
import { current } from "@reduxjs/toolkit";

const Header = () => {
  const dispatch = useDispatch();
  const {isFetching,error,currentUser} = useSelector(state=>state.userSlice)

  // console.log(currentUser);
//   useEffect(()=>{
//     loadUser(dispatch)
//  },[error])

const logoutHandler = () => {
  logout(dispatch)
}

  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
            <img src="/images/logo.png" alt="logo" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search/>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{textDecoration:"none"}}>
         <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
          </Link>

          {currentUser ? (
            <div className="ml-4 dropdown d-inline">
             <Link to="#!" className="btn dropdown-toogle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <figure className="avatar avatar-nav">
                <img src={currentUser.user.avatar && currentUser.user.avatar.url} alt={currentUser && currentUser.user.name} className="rounded-circle" />
              </figure>
              <span className="text-white">{currentUser.user && currentUser.user.name}</span>
             </Link>
             <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
              {currentUser.user && currentUser.user.role !== "admin" ? (
                <Link to="/orders/me" className="dropdown-item">Orders</Link>
              ) : (
                <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
              )}
                <Link to="/me" className="dropdown-item">Profile</Link>
                <Link to="/" className="dropdown-item text-danger" onClick={logoutHandler}>Logout</Link>
             </div>
            </div>
          ) : 
            !isFetching &&  <Link to="/login" className="btn ml-4" id="login_btn">
            Login
          </Link>
          }
         
        </div>
      </nav>
    </>
  );
};

export default Header;
