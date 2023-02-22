import {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        users : [],
        userDetails : [],
        currentUser: null,
        isFetching: false,
        error: false,
        isAuthenticatedUser:false,
        isUpdated: false,
        isCreated: false,
    },
    reducers: {
        loginStart: (state) => {
          state.isFetching = true;
        },
        loginSuccess: (state,action) => {
          state.isFetching = false;
          state.error = false;
          state.currentUser = action.payload;
          state.isAuthenticatedUser = true;
        },
        loginFailure: (state) => {
          state.isFetching = false;
           state.error = true;          
        },
        registerStart: (state) => {
          state.isFetching = true;
        },
        registerSuccess: (state) => {
          state.isFetching = false;
          state.error = false;
          state.isCreated = true
        },
        registerFailure: (state) => {
          state.isFetching = false;
           state.error = true;          
        },
        createdReset: (state) => {
          state.isCreated = false;        
        },
        logoutSuccess: (state) => {
          state.isFetching = false;
          state.error = false;
          state.currentUser = null;
          state.isAuthenticatedUser = false;
        },
        logoutFailure: (state) => {
          state.isFetching = false;
           state.error = true            
        },
        updateStart: (state) => {
          state.isFetching = true;
          
        },
        updateSuccess: (state,action) => {
          state.isFetching = false;
          state.error = false;
          state.isUpdated = action.payload.success
        },
        updateReset: (state) => {
          state.isUpdated = false
        },
        updateFailure: (state) => {
          state.isFetching = false;
           state.error = true            
        },
        getUsersStart: (state) => {
          state.isFetching = true;
          
        },
        getUsersSuccess: (state,action) => {
          state.isFetching = false;
          state.users = action.payload
        },
        getUsersFailure: (state) => {
          state.isFetching = false
          state.error = true
        },
        deleteUser: (state,action) => {
          state.users.users = state.users.users.filter(user => user._id !== action.payload);         
        },
        updateUser: (state,action) => {
          state.users = state.users.map(user => {
            if (user._id === action.payload.id) {
              return action.payload;
            }
            return user;
          });
        },
        getUserDetailsStart: (state) => {
          state.isFetching = true;
          
        },
        getUserDetailsSuccess: (state,action) => {
          state.isFetching = false;
          state.userDetails = action.payload
        },
        getUserDetailsFailure: (state) => {
          state.isFetching = false
          state.error = true
        },           
        
    }
})

export const {
              loginStart,
              loginSuccess,
              loginFailure,
              registerStart,
              registerSuccess,
              registerFailure,
              logoutSuccess,
              logoutFailure,
              updateStart,
              updateSuccess,
              updateReset,
              updateFailure,
              getUsersStart,
              getUsersSuccess,
              getUsersFailure,
              deleteUser,
              getUserDetailsStart,
              getUserDetailsSuccess,
              getUserDetailsFailure,
              createdReset,
            } = userSlice.actions
export default userSlice.reducer