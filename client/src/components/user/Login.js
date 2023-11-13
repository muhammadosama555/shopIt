import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../apiCalls/userApiCalls';

const Login = () => {
  const emailInputElement = useRef();
  const passwordInputElement = useRef();

  const {
    mutate: userMutate,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
    };
    userMutate(data);
  };

  return (
     
          <div className="login flex justify-center mt-20 mb-10">
            <div className="bg-white shadow-xl px-8 pt-10 pb-5 mx-6 rounded-md w-[360px] sm:w-[450px] md:w-[500px] lg:w-[500px] xl:w-[500px]">
              <form onSubmit={handleSubmit}>
                <h1 className="text-4xl font-semibold pb-5">Login</h1>
                <div className="flex flex-col gap-5 mb-3">
                  <div className="flex flex-col">
                    <label className="text-xl pb-2" >
                      Email
                    </label>
                    <input
                      type='email'
                      className="px-3 py-3 rounded-md shadow-md focus:shadow-md"
                      placeholder="Enter your email"
                      name="email"
                    ref={emailInputElement}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label className="text-xl pb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      className="px-3 py-3 rounded-md shadow-md focus:shadow-md"
                      placeholder="Password"
                      name="password"
                    ref={passwordInputElement}
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
                        {isUserLoading ? "Loging In" : "Login In"}
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

  );
};

export default Login;
