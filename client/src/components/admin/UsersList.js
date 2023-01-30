import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { MDBDataTable } from 'mdbreact'
import { getAllUsers } from '../../reducers/apiCalls'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { deleteUser } from '../../reducers/userReducers '


const UsersList = () => {

const {users,isFetching,error} = useSelector((state)=>state.userSlice)
const dispatch = useDispatch()
const alert = useAlert()
const allUsers = users.users

useEffect(()=>{
    getAllUsers(dispatch)
    if (error) {
        alert.error(error)
    }
},[dispatch,error])
console.log(allUsers);

// const deleteHandler = () => {
//     dispatch(deleteUser(allUsers._id))
// }

const setUsers = () => {
    const data = {
        columns : [
            {
                label : "User ID",
                field : "id",
                sort : "asc"
            },
            {
                label : "Name",
                field : "name",
                sort : "asc"
            },
            {
                label : "Email",
                field : "email",
                sort : "asc"
            },
            {
                label : "Role",
                field : "role",
                sort : "asc"
            },
            {
                label : "Actions",
                field : "actions",
                sort : "asc"
            },
        ],
        rows : []
    }

    allUsers.forEach(user => {
        data.rows.push({
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role,
            actions : 
            <>
            <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                <i className='fa fa-pencil'></i>
            </Link>
            <button onClick={()=>dispatch(deleteUser(user._id))} className='btn btn-danger ml-2 py-1 px-2'>
                <i className='fa fa-trash'></i>
            </button>
            </> 
        })
    });
    return data
}

  return (
    <>
    <MetaData title={"All Users"}/>
    <div className='row'>
        <div className='col-14 col-md-2'>
            <Sidebar/>
        </div>
        <div className='col-12 col-md-10'>
            <>
            <h1 className='my-5'>All Users</h1>
            {isFetching ? <Loader/> :(
             <MDBDataTable
             data={setUsers()}
             className="px-3"
             bordered
             striped
             hover
             />
            )}
            </>
        </div>
    </div>
    </>
  )
}

export default UsersList