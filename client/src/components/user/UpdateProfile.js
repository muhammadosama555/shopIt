import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile,loadUser } from '../../reducers/apiCalls'
import { updateReset } from '../../reducers/userReducers '
import MetaData from '../layout/MetaData'

const UpdateProfile = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [avatar,setAvatar] = useState('')
    const [previewAvatar,setPreviewAvatar] = useState("images/avatar.png")
    const dispatch = useDispatch();
    const alert = useAlert()
    const Navigate = useNavigate()
    const {isFetching,error,currentUser,isUpdated} = useSelector(state=>state.userSlice)
    const user = currentUser.user

    useEffect(()=>{
      if (user) {
        setName(user.name)
        setEmail(user.email)
        setPreviewAvatar(user.avatar.url)
     }

      if (error) {
            alert.error(error)
        }

      if (isUpdated) {
          alert.success("user is updated sucessfully")
          loadUser(dispatch)
          Navigate('/me')
          dispatch(updateReset())
        }
    },[error,Navigate,alert,dispatch,isUpdated])

    const submitHandler = (e) => {
      e.preventDefault()
      updateProfile(dispatch,{name,email,avatar})
     }
  
     const onchange = (e) => {
        
        const reader = new FileReader()
        reader.addEventListener("load", function () { 
          setPreviewAvatar(reader.result)
             setAvatar(reader.result)
        }, false);
        reader.readAsDataURL(e.target.files[0])

     }

  return (
    <>
    <MetaData title={"update profile"} />
    <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                defaultValue=''
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                defaultValue=''
                                onChange={(e)=>setEmail(e.target.value)}
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
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='images/*'
                                        onChange={onchange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled = {isFetching ? true : false}>Update</button>
                    </form>
                </div>
            </div>
    </>
  )
}

export default UpdateProfile