import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import {  useSelector } from "react-redux";
import { useGetUserDetails, useLogout } from '../../apiCalls/userApiCalls';

const Header = () => {

  const {currentUser} = useSelector(state=>state.userSlice)
  const { cart } = useSelector(state=>state.cartSlice)
  const userId = currentUser?.data._id
  const userCart = cart[userId] || [];

  const { mutate: logoutMutate, isLoading: isLogoutLoading } = useLogout();
 
  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId)

 

  const handleLogout = () => {
    logoutMutate();
    console.log("logout")
  };

  const fallbackImage = '/images/avatar.jpg';
  return (
    <>
      <nav className="flex items-center justify-center px-6 py-4 lg:py-5 xl:py-5 bg-[#fff9ee]">
        <div className="links w-1/3">
          <ul className="flex items-center gap-4 lg:hidden xl:hidden">
            <li>
              <i
                className="text-2xl fa-solid fa-bars"
              ></i>
            </li>
            <li>
              <Link to="/search">
                <i className="text-xl fa-solid fa-magnifying-glass"></i>
              </Link>
            </li>
          
          </ul>
          <ul className="hidden lg:flex xl:flex text-lg gap-4 font-semibold">
            {currentUser ? (
              <>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              
                <li className="py-3 border-b">
                  <Link to="/login" className="text-xl pl-6" id="login_btn">
                    Login
                  </Link>
                </li>
              
            )}
          </ul>
        </div>
        <Link to="/" className="flex gap-2 justify-center logo w-full">
          <img className="h-7" src="images/logo.png" alt="" />
          <h3 className="hidden lg:flex xl:flex text-xl font-semibold pb-1">
            Shoppy Trolly
          </h3>
        </Link>
        <div className="icons w-1/3 pt-1 flex justify-end items-center">
          <ul className="flex items-center gap-4">
            <li className="hidden lg:flex xl:flex lg:text-lg xl:text-lg">
              <Link to="/search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </li>
            {currentUser && (
              <li>
                <Link to={'/profile'}>
                    <div className="Profile">
                      <div
                        className="w-8 h-8 bg-slate-300 rounded-full"
                        style={{
                          backgroundImage: `url("${userDetails?.data.user?.imgUrl}"), url("${fallbackImage}")`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}
                      ></div>
                    </div>
                    </Link>
               
              </li>
            )}
             {currentUser ? 
            <div className="relative">
              {" "}
              {userCart.length === 0 ? null :
              <div className="absolute -right-3 -top-1 rounded-full bg-red-700 text-xs text-white px-1">
                {userCart.length}
              </div> }
              <li>
                {" "}
                <Link to="/cart">
                  <i className="text-xl fa-solid fa-cart-shopping"></i>
                </Link>
              </li>
            </div> : null }

          </ul>
        </div>
      </nav>

      <div
        className={` w-1/2 bg-white absolute lg:hidden xl:hidden hidden}`}
      >
        <ul>
          {currentUser ? (
            <>
              <li className="py-3 border-b">
                  <Link to="/" className="text-xl pl-6"  onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
            </>
            
          ) :(
            <li className="py-3 border-b">
            <Link to="/login" className="text-xl pl-6" id="login_btn">
              Login
            </Link>
          </li>
          )
        }
            
        </ul>
      </div>
    </>
  );
};

export default Header;
