import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../reducers/apiCalls'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch();
    const alert = useAlert()
    const Navigate = useNavigate()
    const {isFetching,error,currentUser} = useSelector(state=>state.userSlice)

    useEffect(()=>{
        if (error) {
          console.log(error);
            alert.error("password or email is incorrect")
        }

      if (currentUser) {
         Navigate("/")
      }
    },[error,Navigate,alert,currentUser])

    const submitHandler = (e) => {
    e.preventDefault()
    login(dispatch,{email,password})
     }
  

  return (
    <>
    {isFetching ? <Loader /> 
    : (
        <>
        <MetaData title={"login"}/>
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                defaultValue=""
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                defaultValue=""
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
        </>
    )
    }
    </>
  )
}

export default Login