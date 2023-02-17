import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/apiCalls";

const Header = () => {
  const dispatch = useDispatch();
  const { isFetching, currentUser } = useSelector((state) => state.userSlice);
  const { products } = useSelector((state) => state.cartSlice);
  const [toogleSidebar, setToogleSidebar] = useState(false);

  const logoutHandler = () => {
    logout(dispatch);
  };

  return (
    <>
      <nav className="flex items-center justify-center px-6 py-4 lg:py-5 xl:py-5 bg-[#fff9ee]">
        <div className="links w-1/3">
          <ul className="flex items-center gap-4 lg:hidden xl:hidden">
            <li>
              <i
                className="text-2xl fa-solid fa-bars"
                onClick={() => setToogleSidebar(!toogleSidebar)}
              ></i>
            </li>
            <li>
              <Link to="/search">
                <i className="text-xl fa-solid fa-magnifying-glass"></i>
              </Link>
            </li>
            {/* {!isFetching && !currentUser && (
              <li className="py-3 border-b">
                <Link to="/login" className="text-xl pl-6" id="login_btn">
                  Login
                </Link>
              </li>
            ) 
            } */}
          </ul>
          <ul className="hidden lg:flex xl:flex text-lg gap-4 font-semibold">
            {currentUser ? (
              <>
                {currentUser.user && currentUser.user.role !== "admin" ? (
                  <li>
                    <Link to="/orders/me">Orders</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                )}
                <Link to="/" onClick={logoutHandler}>
                  Logout
                </Link>
              </>
            ) : (
              !isFetching && (
                <li className="py-3 border-b">
                  <Link to="/login" className="text-xl pl-6" id="login_btn">
                    Login
                  </Link>
                </li>
              )
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
                <Link to="/me">
                  <i className="text-xl fa-solid fa-user"></i>
                </Link>
                <span className="text-white">
                  {currentUser.user && currentUser.user.name}
                </span>
              </li>
            )}
            <div className="relative">
              {" "}
              <div className="absolute -right-3 -top-1 rounded-full bg-red-700 text-xs text-white px-1">
                {products.length}
              </div>
              <li>
                {" "}
                <Link to="/cart">
                  <i className="text-xl fa-solid fa-cart-shopping"></i>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>

      <div
        className={` w-1/2 bg-white absolute lg:hidden xl:hidden ${
          toogleSidebar ? "" : "hidden"
        }`}
      >
        <ul>
          {currentUser ? (
            <>
              {currentUser.user && currentUser.user.role !== "admin" ? (
                <li className="py-3 border-b">
                  <Link to="/orders/me" className="text-xl pl-6">
                    Orders
                  </Link>
                </li>
              ) : (
                <li className="py-3 border-b">
                  <Link to="/dashboard" className="text-xl pl-6">
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="py-3 border-b">
                  <Link to="/" className="text-xl pl-6"  onClick={logoutHandler}>
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
