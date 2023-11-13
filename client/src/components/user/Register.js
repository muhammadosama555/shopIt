import React, { useEffect, useRef, useState } from "react";
import { useCreateUser } from "../../apiCalls/userApiCalls";


const Register = () => {
  const usernameInputElement = useRef();
  const emailInputElement = useRef();
  const passwordInputElement = useRef();
  const contactInputElement = useRef();


  const { mutate: createUserMutate, isLoading: isCreateUserLoading, isError: isCreateUserError, error: createUserError, } = useCreateUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: usernameInputElement.current?.value,
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
      contact: contactInputElement.current?.value,
    };


    createUserMutate(data);

  };


  return (
    <>
     
      <div className="register flex justify-center items-center mt-20 mb-10 box-border px-6">
        <div className="w-ful max-w-lg lg:w-2/5 xl:w-2/5 bg-white shadow-xl px-8 pt-10 pb-5 mx-6 rounded-md">
          <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-semibold pb-3">Register</h1>
            <div className="flex flex-col ">
              <label className="text-xl pb-2" for="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                name='username'
                placeholder='micheal'
                ref={usernameInputElement}
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-xl pb-2" for="email_field">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                name='email'
                placeholder='micheal@gmail.com'
                ref={emailInputElement}
              />
            </div>

            <div className="flex flex-col ">
              <label className="text-xl pb-2" for="password_field">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                name='password'
                placeholder='password'
                ref={passwordInputElement}
              />
            </div>
            

            <div className="flex justify-center mt-5 pb-3">
              <button
                className="text-white font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all"
                id="register_button"
                type="submit"
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
