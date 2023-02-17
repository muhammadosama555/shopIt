import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../reducers/apiCalls";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { isFetching, error, currentUser } = useSelector(
    (state) => state.userSlice
  );
  const location = useLocation();
  console.log(location);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error("password or email is incorrect");
    }

    if (currentUser) {
      Navigate("/");
    }
  }, [error, Navigate, alert, currentUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"login"} />
          <div className="login flex justify-center mt-20 mb-10">
            <div className="bg-white shadow-xl px-8 pt-10 pb-5 mx-6 rounded-md w-[360px] sm:w-[450px] md:w-[500px] lg:w-[500px] xl:w-[500px]">
              <form onSubmit={submitHandler}>
                <h1 className="text-4xl font-semibold pb-5">Login</h1>
                <div className="flex flex-col gap-5 mb-3">
                  <div className="flex flex-col">
                    <label className="text-xl pb-2" htmlFor="email_field">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email_field"
                      className="px-3 py-3 rounded-md shadow-md focus:shadow-md"
                      placeholder="Enter your email"
                      defaultValue=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-xl pb-2"htmlFor="password_field">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password_field"
                      className="px-3 py-3 rounded-md shadow-md focus:shadow-md"
                      placeholder="Password"
                      defaultValue=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Link to="/password/forgot"  className="flex justify-end mb-4 hover:text-red-color">
                  Forgot Password?
                </Link>

                <div className="flex justify-center mt-5 pb-3">
                  <button
                    className="text-white font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all"
                    id="login_button"
                    type="submit"
                  >
                    LOGIN
                  </button>
                </div>

                <Link
                  to="/register"
                  className="flex justify-end mb-4 hover:text-red-color"
                >
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
