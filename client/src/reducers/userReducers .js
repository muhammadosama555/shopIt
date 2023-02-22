import {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isAuthenticatedUser:false,
        isUpdated: false,
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
        registerSuccess: (state,action) => {
          state.isFetching = false;
          state.error = false;
          state.currentUser = action.payload;
        },
        registerFailure: (state) => {
          state.isFetching = false;
           state.error = true;          
        },
        loadStart: (state) => {
          state.isFetching = true;
          
        },
        loadSuccess: (state,action) => {
          state.isFetching = false;
          state.error = false;
          state.currentUser = action.payload
        },
        loadFailure: (state) => {
          state.isFetching = false;
           state.error = true            
        },
        logoutSuccess: (state,action) => {
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
        updatePasswordStart: (state) => {
          state.isFetching = true;
          
        },
        updatePasswordSuccess: (state,action) => {
          state.isFetching = false;
          state.error = false;
          state.isUpdated = action.payload.success
        },
        updatePasswordReset: (state,action) => {
          state.isUpdated = false
        },
        updatePasswordFailure: (state) => {
          state.isFetching = false;
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
              loadStart,
              loadSuccess,
              loadFailure,
              logoutSuccess,
              logoutFailure,
              updateStart,
              updateSuccess,
              updateReset,
              updateFailure,
              updatePasswordStart,
              updatePasswordSuccess,
              updatePasswordReset,
              updatePasswordFailure,
            } = userSlice.actions
export default userSlice.reducer