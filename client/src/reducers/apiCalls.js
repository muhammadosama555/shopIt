import axios from "axios"
import {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    getProductDetailsStart,
    getProductDetailsSuccess,
    getProductDetailsFailure,
  } from "./productReducers";
  
  export const getProducts = async (dispatch,currentPage=1) => {
    dispatch(getProductStart());
    try {
      const res = await axios.get(`/api/v1/products?page=${currentPage}`);
      console.log(res.data);
      dispatch(getProductSuccess(res.data));
    } catch (error) {
      dispatch(getProductFailure());
    }
  };


  export const getProductsDetails = async (dispatch,id) => {
    dispatch(getProductDetailsStart());
    try {
      const res = await axios.get(`/api/v1/product/admin/${id}`);
      dispatch(getProductDetailsSuccess(res.data));
    } catch (error) {
      dispatch(getProductDetailsFailure());
    }
  };