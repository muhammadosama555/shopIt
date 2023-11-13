import { useRef } from "react";
import "./newUser.css";
import { useCreateUser } from "../../apiCalls/userApiCalls";

export default function NewUser() {

  const usernameInputElement = useRef();
  const emailInputElement = useRef();
  const passwordInputElement = useRef();


  const { mutate: createUserMutate, isLoading: isCreateUserLoading, isError: isCreateUserError, error: createUserError, } = useCreateUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: usernameInputElement.current?.value,
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
    };


    createUserMutate(data);

  };

  return (
    <div className="newUser">
    <h1 className="newUserTitle">New User</h1>
    <form className="newUserForm" onSubmit={handleSubmit}>
      <div className="newUserItem">
        <label>Username</label>
        <input type="text" placeholder="Username" ref={usernameInputElement} required />
      </div>
      <div className="newUserItem">
        <label>Email</label>
        <input type="email" placeholder="Email" ref={emailInputElement} required />
      </div>
      <div className="newUserItem">
        <label>Password</label>
        <input type="password" placeholder="Password" ref={passwordInputElement} required />
      </div>
      <button className="newUserButton" type="submit">
        Create
      </button>
    </form>
  </div>
  );
}
