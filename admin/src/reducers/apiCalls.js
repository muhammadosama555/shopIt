import axios from "axios"
import { loginStart,
         loginSuccess,
         loginFailure,
         registerStart,
         registerSuccess,
         registerFailure,
         logoutSuccess,
         logoutFailure,
         updateStart,
         updateSuccess,
         updateFailure,
         getUsersStart,
         getUsersSuccess,
         getUsersFailure,
         deleteUser,
         getUserDetailsStart,
         getUserDetailsSuccess,
         getUserDetailsFailure,
 } from "./userReducers ";
 import { persistor } from "../store";
import { deleteProduct,
         getProductDetailsFailure,
         getProductDetailsStart,
         getProductDetailsSuccess,
         getProductFailure,
         getProductStart,
         getProductSuccess,
         postNewProductFailure,
         postNewProductStart,
         postNewProductSuccess,
         updateProductFailure,
         updateProductStart,
         updateProductSuccess,
         } from "./productReducers";



//  admin to login

export const login = async (dispatch,user) => {
  dispatch(loginStart())
  try {
    const res = await axios.post("/api/v1/login",user)
    dispatch(loginSuccess((res.data)))
  } catch (error) {
    dispatch(loginFailure())
  }
} 

 //  logout the admin

 export const logout = async (dispatch) => {
  try {
    await axios.get("/api/v1/logout")
    persistor.purge();
    dispatch(logoutSuccess())
  } catch (error) {
    console.log(error);
    dispatch(logoutFailure())
  }
} 

//  get all users

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart())
  try {
    const res = await axios.get("/api/v1/admin/users")
    dispatch(getUsersSuccess((res.data)))
  } catch (error) {
    console.log(error)
    dispatch(getUsersFailure())
  }
} 

//  delete single user

export const DeleteUser = async (dispatch,id) => {
  try {
    const res = await axios.delete(`/api/v1/admin/user/${id}`)
    dispatch(deleteUser((id)))
  } catch (error) {
    console.log(error)

  }
} 
  
//  get user details

export const getUserDetails = async (dispatch,id) => {
  dispatch(getUserDetailsStart())
  try {
    const res = await axios.get(`/api/v1/admin/user/${id}`)
    dispatch(getUserDetailsSuccess((res.data)))
  } catch (error) {
    console.log(error)
    dispatch(getUserDetailsFailure())
  }
} 

//  update user data 

export const updateUser = async (dispatch,userData,id) => {
  dispatch(updateStart());
  try {
    console.log(userData);
    const res = await axios.put(`/api/v1/admin/user/${id}`,userData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    dispatch(updateSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(updateFailure());
  }
};

// create new user

export const register = async (dispatch,userData) => {
  dispatch(registerStart())
  try {
    console.log(userData);
    const res = await axios.post("/api/v1/register",userData,{
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    dispatch(registerSuccess((res.data)))
  } catch (error) {
    console.log(error);
    dispatch(registerFailure())
  }
}

//  get all products

export const getProducts = async (dispatch) => {
  dispatch(getProductStart())
  try {
    const res = await axios.get("/api/v1/admin/products")
    dispatch(getProductSuccess((res.data)))
  } catch (error) {
    console.log(error)
    dispatch(getProductFailure())
  }
} 

//  delete single product

export const DeleteProduct = async (dispatch,id) => {
  try {
    const res = await axios.delete(`/api/v1/admin/product/${id}`)
    dispatch(deleteProduct((id)))
  } catch (error) {
    console.log(error)

  }
} 

//  get product details

export const getProductDetails = async (dispatch,id) => {
  dispatch(getProductDetailsStart())
  try {
    const res = await axios.get(`/api/v1/product/${id}`)
    dispatch(getProductDetailsSuccess((res.data)))
  } catch (error) {
    console.log(error)
    dispatch(getProductDetailsFailure())
  }
} 

//  update product data 

export const updateproduct = async (dispatch,productData,id) => {
  dispatch(updateProductStart());
  try {
    console.log(productData);
    const res = await axios.put(`/api/v1/admin/product/${id}`,productData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(updateProductFailure());
  }
};


//  post new product 

export const postNewProduct = async (dispatch,productData) => {
  dispatch(postNewProductStart());
  try {
    console.log(productData);
    const res = await axios.post("/api/v1/admin/product/new",productData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    dispatch(postNewProductSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(postNewProductFailure());
  }
};