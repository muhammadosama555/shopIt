import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updatePassword } from '../../reducers/apiCalls'
import { updatePasswordReset } from '../../reducers/userReducers '
import MetaData from '../layout/MetaData'

const UpdatePassword = () => {

    const [oldPassword,setOldPassword] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch();
    const alert = useAlert()
    const Navigate = useNavigate()
    const {isFetching,error,currentUser,isUpdated} = useSelector(state=>state.userSlice)
    const user = currentUser.user

    useEffect(()=>{

      if (error) {
            alert.error(error)
        }

      if (isUpdated) {
          alert.success("password is updated sucessfully")
          Navigate('/me')
          dispatch(updatePasswordReset())
        }
    },[error,Navigate,alert,dispatch,isUpdated])

    const submitHandler = (e) => {
      e.preventDefault()
      updatePassword(dispatch,{oldPassword,password})
     }
  

  return (
    <>
    <MetaData title={"change password"} />
    <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                defaultValue=''
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                defaultValue=''
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled = {isFetching ? true : false}>Update Password</button>
                    </form>
                </div>
            </div>
    </>
  )
}

export default UpdatePassword