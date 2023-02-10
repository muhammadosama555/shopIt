import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile, loadUser } from "../../reducers/apiCalls";
import { updateReset } from "../../reducers/userReducers ";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("images/avatar.png");
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { isFetching, error, currentUser, isUpdated } = useSelector(
    (state) => state.userSlice
  );
  const user = currentUser.user;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPreviewAvatar(user.avatar.url);
    }

    if (error) {
      alert.error(error);
    }

    if (isUpdated) {
      alert.success("user is updated sucessfully");
      loadUser(dispatch);
      Navigate("/me");
      dispatch(updateReset());
    }
  }, [error, Navigate, alert, dispatch, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateProfile(dispatch, { name, email, avatar });
  };

  const onchange = (e) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function() {
        setPreviewAvatar(reader.result);
        setAvatar(reader.result);
      },
      false
    );
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <MetaData title={"update profile"} />
      <div className="register flex justify-center items-center mt-20 mb-10 box-border px-6">
        <div className="w-ful max-w-lg lg:w-2/5 xl:w-2/5 bg-white shadow-xl px-8 pt-10 pb-5 mx-6 rounded-md">
          <form className="flex flex-col w-full gap-5" onSubmit={submitHandler}>
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
                defaultValue=''
                onChange={(e)=>setName(e.target.value)}
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
                defaultValue=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl pb-2" for="avatar_upload">
                Avatar
              </label>
              <div className="flex items-center">
                <div className="">
                  <figure className="w-10 mr-3">
                    <img src={previewAvatar} class="" alt="image" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onchange}
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
      </div>

{/* 
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                defaultValue=""
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                defaultValue=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={previewAvatar}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onchange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={isFetching ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default UpdateProfile;
