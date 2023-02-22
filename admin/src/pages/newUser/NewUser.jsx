import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../reducers/apiCalls";
import { createdReset } from "../../reducers/userReducers ";
import "./newUser.css";

export default function NewUser() {

const [formData,setFormData] = useState({})
const dispatch = useDispatch()
const Navigate = useNavigate()

const { isCreated } = useSelector(
  (state) => state.userSlice
);

  const submitHandler = (e) => {
    e.preventDefault();
    register(dispatch, formData);
    if (isCreated) {
      dispatch(createdReset())
      Navigate("/users")
  }
  };

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={submitHandler}>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text"
           placeholder="john"
           name="name"
           onChange={handleTextChange}
            />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email"
           placeholder="john@gmail.com"
           name="email"
           onChange={handleTextChange}
            />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password"
           placeholder="password"
           name="password"
           onChange={handleTextChange}
            />
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
