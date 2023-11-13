import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import "./user.css";
import { useRef } from "react";
import { useGetUserDetails, useUpdateProfile, useUpdateUserImage } from "../../apiCalls/userApiCalls";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";

export default function User() {

  const usernameInputElement = useRef();
  const emailInputElement = useRef();

  const { userId } = useParams()


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
        userId: userId,
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
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        
      </div>
      <div className="userContainer">
       
        <div className="userShow">
          <div className="userShowTop">
            <img
            src={userDetails?.data?.user?.imgUrl || fallbackImage} 
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userDetails.data.user.username}</span>
              
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{userDetails.data.user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{userDetails.data.user.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userDetails.data.user.email}</span>
            </div>
           
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form onSubmit={handleSubmit} className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  ref={usernameInputElement}
                  defaultValue={userDetails.data.user.username}
                  className="userUpdateInput"
                />
              </div>
             
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  ref={emailInputElement}
                  defaultValue={userDetails.data.user.email}
                  className="userUpdateInput"
                />
              </div>
             
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={userDetails?.data?.user?.imgUrl || fallbackImage} alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                 type="file"
                  id="file"
                   style={{ display: "none" }}
                   onChange={handleFileChange}
                    />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>}
    </>
  );
}
