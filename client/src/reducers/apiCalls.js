import axios from "axios"
import {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    getProductDetailsStart,
    getProductDetailsSuccess,
    getProductDetailsFailure,
    getAdminProductStart,
    getAdminProductSuccess,
    getAdminProductFailure,
    postReviewsStart,
    postReviewsSuccess,
    postReviewsFailure,
  } from "./productReducers";
import { loginStart,
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
         updateFailure,
         updatePasswordStart,
         updatePasswordSuccess,
         updatePasswordFailure,
         getUsersStart,
         getUsersSuccess,
         getUsersFailure,
 } from "./userReducers ";

 import { persistor } from "../store";
import { clearCart, saveShippingInfo } from "./cartReducers";

//  get all the products
  
  export const getProducts = async (dispatch,currentPage=1,keyword="",price=[0,99999],category,ratings=0) => {
    dispatch(getProductStart());
    try {
      let url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${ratings}`;
      console.log(url);
      if (category) {
       url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating[gte]=${ratings}`;

      }
     
     
      const res = await axios.get(url);
      dispatch(getProductSuccess(res.data));
    } catch (error) {
      dispatch(getProductFailure());
      console.log(error);
    }
  };

//  get all the products details

  export const getProductsDetails = async (dispatch,id) => {
    dispatch(getProductDetailsStart());
    try {
      const res = await axios.get(`/api/v1/product/${id}`);
      dispatch(getProductDetailsSuccess(res.data));
    } catch (error) {
      
      dispatch(getProductDetailsFailure());
      
    }
  };

//  user to login

  export const login = async (dispatch,user) => {
    dispatch(loginStart())
    try {
      const res = await axios.post("/api/v1/login",user)
      dispatch(loginSuccess((res.data)))
    } catch (error) {
      dispatch(loginFailure())
    }
  } 

// user to get register

  export const register = async (dispatch,userData) => {
    dispatch(registerStart())
    try {
      console.log(userData);
      const res = await axios.post("/api/v1/register",userData)
      dispatch(registerSuccess((res.data)))
    } catch (error) {
      console.log(error);
      dispatch(registerFailure())
    }
  }

  //  load the user

  export const loadUser = async (dispatch) => {
    dispatch(loadStart())
    try {
      const res = await axios.get("/api/v1/me")
      dispatch(loadSuccess((res.data)))
    } catch (error) {
      dispatch(loadFailure())
    }
  }

  //  logout the user

  export const logout = async (dispatch) => {
    try {
      await axios.get("/api/v1/logout")
      persistor.purge();
      dispatch(logoutSuccess())
      dispatch(clearCart())
    } catch (error) {
      dispatch(logoutFailure())
    }
  } 

  // update the user profile

  export const updateProfile = async (dispatch,userData) => {
    dispatch(updateStart())
    try {
      const res = await axios.put("/api/v1/me/update",userData)
      dispatch(updateSuccess((res.data)))
    } catch (error) {
      dispatch(updateFailure())
    }
  }

  // update the user password

  export const updatePassword = async (dispatch,passwords) => {
    dispatch(updatePasswordStart())
    try {
      const res = await axios.put("/api/v1/password/update",passwords)
      dispatch(updatePasswordSuccess((res.data)))
    } catch (error) {
      dispatch(updatePasswordFailure())
    }
  }

  // save userShipping info

  export const userShippingInfo = async (dispatch,info) => {
    dispatch(saveShippingInfo(info))
    
  }

  //  get all the (Admin) products details

  export const getAdminProducts = async (dispatch) => {
    dispatch(getAdminProductStart());
    try {
      const res = await axios.get("/api/v1/admin/products");
      dispatch(getAdminProductSuccess(res.data));
    } catch (error) {
      dispatch(getAdminProductFailure());
    }
  };

  //  get all users

  export const getAllUsers = async (dispatch) => {
    dispatch(getUsersStart())
    try {
      const res = await axios.get("/api/v1/admin/users")
      dispatch(getUsersSuccess((res.data)))
    } catch (error) {
      dispatch(getUsersFailure())
    }
  } 

  // user to post reviews

  export const postReviews = async (dispatch,reviewData) => {
    dispatch(postReviewsStart())
    try {
      console.log(reviewData);
      const res = await axios.put("/api/v1/review",reviewData)
      dispatch(postReviewsSuccess((res.data)))
    } catch (error) {
      console.log(error);
      dispatch(postReviewsFailure())
    }
  }


  