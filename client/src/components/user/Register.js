import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../../reducers/apiCalls'
import MetaData from '../layout/MetaData'

const Register = () => {

    const [user,setUser] = useState({
      name:"",
      email:"",
      password:""
    })

    const {name,email,password} = user
    const [avatar,setAvatar] = useState('')
    const [previewAvatar,setPreviewAvatar] = useState("images/avatar.png")
    const dispatch = useDispatch();
    const alert = useAlert()
    const Navigate = useNavigate()
    const {isFetching,error,currentUser} = useSelector(state=>state.userSlice)

    useEffect(()=>{
        if (error) {
            alert.error(error)
        }

      if (currentUser) {
         Navigate("/")
      }
    },[error,Navigate,alert])

    const submitHandler = (e) => {
      e.preventDefault()

      register(dispatch,{name,email,password,avatar})
     }
  
     const onchange = (e) => {
      if (e.target.name === "avatar") {
        
        const reader = new FileReader()
        reader.addEventListener("load", function () { 
          setPreviewAvatar(reader.result)
             setAvatar(reader.result)
        }, false);
        reader.readAsDataURL(e.target.files[0])
      } else {
        setUser({
         ...user,
         [e.target.name]:e.target.value
        })
        
      }
     }

  return (
    <>
    <MetaData title={"register"} />
    <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" id="name_field" className="form-control" name="name" defaultValue={name} onChange={onchange} />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name='email'
                defaultValue={email}
                onChange={onchange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name='password'
                defaultValue={password}
                onChange={onchange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              src={previewAvatar}
                              className='rounded-circle'
                              alt='preview avatar'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='avatar'
                          accept='images/*'
                          onChange={onchange}
                      />
                      <label className='custom-file-label' htmlFor='avatar'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled = {isFetching ? true : false}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>
    </>
  )
}

export default Register