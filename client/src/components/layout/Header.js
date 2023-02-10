import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css"
import Search from "./Search";
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, logout } from "../../reducers/apiCalls";
import { current } from "@reduxjs/toolkit";
import { clearCart } from "../../reducers/cartReducers";

const Header = () => {
  const dispatch = useDispatch();
  const {isFetching,error,currentUser} = useSelector(state=>state.userSlice)
  const {products} = useSelector((state)=>state.cartSlice)
  const [toogleSidebar,setToogleSidebar] = useState(false)

  // console.log(currentUser);
//   useEffect(()=>{
//     loadUser(dispatch)
//  },[error])

const logoutHandler = () => {
  logout(dispatch)
}

  return (
    <>
     
  <nav className="flex items-center justify-center px-6 py-4 lg:py-5 xl:py-5 bg-[#fff9ee]">
    <div className="links w-1/3">
      <ul className="flex items-center gap-4 lg:hidden xl:hidden">
        <li><i class="text-2xl fa-solid fa-bars" onClick={()=>setToogleSidebar(!toogleSidebar)}></i></li>
        <li><Link to="/search"><i class="text-xl fa-solid fa-magnifying-glass"></i></Link></li>
        { !isFetching && !currentUser ?
         <li className="py-3 border-b"><Link to="/login" className="text-xl pl-6" id="login_btn">
            Login
          </Link></li> :
          <li className="py-3 border-b"><Link to="/" className="text-xl pl-6" onClick={logoutHandler}>
          Logout
        </Link></li>
          }
      </ul>
      <ul class="hidden lg:flex xl:flex text-lg gap-4 font-semibold">
      {currentUser ? (
        <>
              {currentUser.user && currentUser.user.role !== "admin" ? (
                <li><Link to="/orders/me" >Orders</Link></li>
              ) : (
                <li><Link to="/dashboard">Dashboard</Link></li>
              )}
                <Link to="/" onClick={logoutHandler}>Logout</Link>
             </>
          ) : 
            !isFetching  &&  <li className="py-3 border-b"><Link to="/login" className="text-xl pl-6" id="login_btn">
            Login
          </Link></li>
          }

        {/* <li><a href="login.html">Login</a></li>
        <li><a href="shipping.html">Shipping</a></li>
        <li><a href="listreviews.html">Reviews</a></li>
        <li><a href="confirmorder.html">Reviews</a></li>
        <li><a href="forgotpassword.html">Reviews</a></li>
        <li><a href="changepassword.html">Reviews</a></li>
        <li><a href="newpassword.html">Reviews</a></li> */}
      </ul>
    </div>
    <Link to="/" className="flex gap-2 justify-center logo w-full">
      <img className="h-7" src="images/logo.png" alt=""/>
      <h3 className="hidden lg:flex xl:flex text-xl font-semibold pb-1">Shoppy Trolly</h3>
    </Link>
    <div className="icons w-1/3 pt-1 flex justify-end items-center">
      <ul className="flex items-center gap-4">
        <li className="hidden lg:flex xl:flex lg:text-lg xl:text-lg">
          <Link to="/search"><i className="fa-solid fa-magnifying-glass"></i></Link>
          </li>
        {currentUser && <li>
          <Link to = "/me"><i class="text-xl fa-solid fa-user"></i></Link>
              <span className="text-white">{currentUser.user && currentUser.user.name}</span>
        </li>}
        <div className="relative"> <div class="absolute -right-3 -top-1 rounded-full bg-red-700 text-xs text-white px-1">{products.length}</div>
          <li> <Link to="/cart"><i class="text-xl fa-solid fa-cart-shopping"></i></Link></li>
        </div>
      </ul>
    </div>
  </nav>

  <div class={` w-1/2 bg-white absolute lg:hidden xl:hidden ${toogleSidebar ? "" : "hidden"}`}>
    <ul>
    {currentUser && (
        <>
              {currentUser.user && currentUser.user.role !== "admin" ? (
                <li className="py-3 border-b"><Link to="/orders/me" className="text-xl pl-6">Orders</Link></li>
              ) : (
                <li className="py-3 border-b"><Link to="/dashboard"className="text-xl pl-6">Dashboard</Link></li>
              )}
             </>
          ) 
          }
    </ul>
  </div>

      {/* <nav className="navbar row">
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
            {products.length}
          </span>
          </Link>

          <button value='Clear cart' onClick={handleClearCart}>Clear</button>

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
      </nav> */}
    </>
  );
};

export default Header;
