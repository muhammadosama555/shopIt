import axios from "axios"
import {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    getProductDetailsStart,
    getProductDetailsSuccess,
    getProductDetailsFailure,
  } from "./productReducers";
  
  export const getProducts = async (dispatch,currentPage=1,keyword="",price,category) => {
    dispatch(getProductStart());
    try {
      let url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
      if (category) {
       url = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;

      }
     
      const res = await axios.get(url);
      dispatch(getProductSuccess(res.data));
    } catch (error) {
      dispatch(getProductFailure());
    }
  };


  export const getProductsDetails = async (dispatch,id) => {
    dispatch(getProductDetailsStart());
    try {
      const res = await axios.get(`/api/v1/product/${id}`);
      dispatch(getProductDetailsSuccess(res.data));
    } catch (error) {
      dispatch(getProductDetailsFailure());
    }
  };