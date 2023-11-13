import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserDetails, useUpdateProfile, useUpdateUserImage } from "../../apiCalls/userApiCalls";
import Loader from "../layout/Loader";

const UpdateProfile = () => {
 
  const usernameInputElement = useRef();
  const emailInputElement = useRef();

  const { currentUser } = useSelector(state => state.userSlice) || null
  const userId = currentUser.data._id


  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId)
  const { mutate: updateUserImageMutate, isLoading: isUpdateUserImageLoading, isError: isUpdateUserImageError, error: updateUserImageError, } = useUpdateUserImage();
console.log(userDetails?.data)
  const {
      mutate: updateProfileMutate,
      isLoading: isUpdateProfileLoading,
      isError: isUpdateProfileError,
      error: updateProfileError,
    } = useUpdateProfile();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        username: usernameInputElement.current?.value,
        email: emailInputElement.current?.value,
       userId : userId,
      };

      console.log(data)
      updateProfileMutate(data);
   
    };

    const handleFileChange = (e) => {
      const imageData = {
        userId: userId,
        image: e.target.files[0],
      };
      updateUserImageMutate(imageData);
    };


    const fallbackImage = '/images/avatar.jpg';

  return (
    <>
  {isUserLoading ? <Loader/> : 
      <div className="register flex justify-center items-center mt-20 mb-10 box-border px-6">
        <div className="w-ful max-w-lg lg:w-2/5 xl:w-2/5 bg-white shadow-xl px-8 pt-10 pb-5 mx-6 rounded-md">
          <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
            <h1 className="text-4xl font-semibold pb-3">Update Profile</h1>
            <div className="flex flex-col ">
              <label className="text-xl pb-2" for="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                placeholder="Enter your name"
                name="username"
                defaultValue={userDetails.data.user.username}
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
                placeholder="Enter your email"
                name="email"
                defaultValue={userDetails.data.user.email}
                ref={emailInputElement}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl pb-2" for="avatar_upload">
                Avatar
              </label>
              <div className="flex items-center">
                <div className="">
                  <figure className="w-10 mr-3">
                    <img 
                      src={userDetails.data.user?.imgUrl || fallbackImage}
                     className="" alt="image" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                   type="file"
                   id="file"
                   accept="image/*"
                    className="custom-file-input"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-5 pb-3">
              <button
                className="text-white font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all"
                id="register_button"
                type="submit"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>}

    </>
  );
};

export default UpdateProfile;
