import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../reducers/apiCalls";
import MetaData from "../layout/MetaData";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("images/avatar.png");
  const dispatch = useDispatch();
  const alert = useAlert();
  const Navigate = useNavigate();
  const { isFetching, error, currentUser } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (currentUser) {
      Navigate("/");
    }
  }, [error, Navigate, alert, currentUser]);

  const submitHandler = (e) => {
    e.preventDefault();

    register(dispatch, { name, email, password});
    if (currentUser) {
      Navigate("/");
    }
  };

  const onchange = (e) => {
    if (e.target.name === "avatar") {
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
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <MetaData title={"register"} />
      <div class="register flex justify-center items-center mt-20 mb-10 box-border px-6">
        <div class="w-ful max-w-lg lg:w-2/5 xl:w-2/5 bg-white shadow-xl px-8 pt-10 pb-5 mx-6 rounded-md">
          <form class="flex flex-col w-full gap-5"  onSubmit={submitHandler}>
            <h1 class="text-4xl font-semibold pb-3">Register</h1>
            <div class="flex flex-col ">
              <label class="text-xl pb-2" for="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                class="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                placeholder="Enter your name"
                name="name"
                onChange={onchange}
              />
            </div>
            <div class="flex flex-col ">
              <label class="text-xl pb-2" for="email_field">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                class="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                placeholder="Enter your email"
                name="email"
                onChange={onchange}
              />
            </div>

            <div class="flex flex-col ">
              <label class="text-xl pb-2" for="password_field">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                class="px-3 py-3 rounded-md bg-white shadow-md focus:shadow-md"
                placeholder="Password"
                name="password"
                onChange={onchange}
              />
            </div>
            <div class="flex flex-col">
              <label class="text-xl pb-2" for="avatar_upload">
                Avatar
              </label>
              <div class="flex items-center">
                <div class="">
                  <figure class="w-10 mr-3">
                    <img src={previewAvatar} class="" alt="preview avatar" />
                  </figure>
                </div>
                <div class="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    class="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onchange}
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-center mt-5 pb-3">
              <button
                class="text-white font-semibold bg-red-color w-full py-4 rounded-md hover:bg-[#910811] hover:transition-all"
                id="register_button"
                type="submit"
                disabled={isFetching ? true : false}
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>


      {/* <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                defaultValue={name}
                onChange={onchange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                onChange={onchange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                onChange={onchange}
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
                      alt="preview avatar"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="avatar"
                    accept="images/*"
                    onChange={onchange}
                  />
                  <label className="custom-file-label" htmlFor="avatar">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={isFetching ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Register;
