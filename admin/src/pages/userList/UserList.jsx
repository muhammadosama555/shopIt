import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDeleteUser, useGetUsers } from "../../apiCalls/userApiCalls";
import Loader from '../../components/Loader'


export default function UserList() {
  
  const {isLoading:isUsersLoading, data:users, isError:isUsersError, error:usersError} = useGetUsers()
  const {mutate:deleteUserMutate, isLoading:isDeleteUserLoading, isError:isDeleteUserError, error:deleteUserError} = useDeleteUser();

  if (isUsersLoading) {
    return <Loader/>
  }
  
  if (isUsersError) {
    return <h2>{usersError.message}</h2>
  }

  if (isDeleteUserLoading) {
    return <Loader/>
  }
  
  if (isDeleteUserError) {
    return <h2>{deleteUserError.message}</h2>
  }
  
    const handleDelete = (userId) => {
       deleteUserMutate(userId)
    };
  console.log(users?.data)
  const fallbackImage = '/images/avatar.jpg';

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.imgUrl ? params.row.imgUrl : fallbackImage} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "created on",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
             onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div style={{ padding: "10px 0px" }}>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={users?.data.users}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
