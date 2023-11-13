import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useGetUserDetails, useLogout } from "../../apiCalls/userApiCalls";
import { useSelector } from "react-redux";

export default function Topbar() {

  const {currentUser} = useSelector(state=>state.userSlice)
  const userId = currentUser?.data._id

  const { mutate: logoutMutate, isLoading: isLogoutLoading } = useLogout();
 
  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId)
console.log(userDetails)
 

  const handleLogout = () => {
    logoutMutate();
  };

  const fallbackImage = '/images/avatar.jpg';
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ShopIt-admin</span>
        </div>
        <div className="topRight"> 
        <div>
        <button className="logoutButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {userDetails?.data.user.imgUrl ? (
            <img src={userDetails.data.user.imgUrl} alt="User Avatar" className="topAvatar" />
          ) : (
            <img src={fallbackImage} alt="Fallback Avatar" className="topAvatar" />
          )}
        </div>
      </div>
    </div>
  );
}
