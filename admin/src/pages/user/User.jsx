import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getUserDetails,updateUser } from "../../reducers/apiCalls";
import { useSelector , useDispatch} from "react-redux";
import { useLocation } from "react-router-dom";

import "./user.css";
import { useEffect } from "react";
import { useState } from "react";
import { updateReset } from "../../reducers/userReducers ";

export default function User() {

const [formData,setFormData] = useState({})
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { userDetails,isUpdated } = useSelector(
    (state) => state.userSlice
  );
 
  const userData = userDetails.user
  const dispatch = useDispatch();


  useEffect(() => {
    getUserDetails(dispatch, id);
    console.log(userDetails,id);
    if (isUpdated) {
      dispatch(updateReset())
  }
  }, [dispatch,isUpdated]);



  const submitHandler = (e) => {
    e.preventDefault();
    updateUser(dispatch, formData,id);

  };

  const handleTextChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userData.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.createdAt}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={submitHandler}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  placeholder={userData.name}
                  name="name"
                  onChange={handleTextChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  placeholder={userData.email}
                  name="email"
                  onChange={handleTextChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  placeholder={userData.role}
                  name="role"
                  onChange={handleTextChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
