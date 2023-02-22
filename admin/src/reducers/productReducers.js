import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    productsData: [],
    productsDetails: [],
    isUpdated : false,
    isPosted : false,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.productsData = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getProductDetailsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductDetailsSuccess: (state, action) => {
      state.isFetching = false;
      state.productsDetails = action.payload;
    },
    getProductDetailsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteProduct: (state,action) => {
      state.productsData.products = state.productsData.products.filter(product => product._id !== action.payload);         
    },
    updateProductStart: (state) => {
      state.isFetching = true;
    },
    updateProductSuccess: (state,action) => {
      state.isFetching = false;
      state.error = false;
      state.isUpdated = true
    },
    updateProductReset: (state) => {
      state.isUpdated = false
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
       state.error = true            
    },
    postNewProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    postNewProductSuccess: (state) => {
      state.isFetching = false;
      state.isPosted = true;
    },
    postNewProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    isPostedReset: (state) => {
      state.isPosted = false
    },
    
  }
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  getProductDetailsStart,
  getProductDetailsSuccess,
  getProductDetailsFailure,
  postReviewsStart,
  postReviewsSuccess,
  postReviewsFailure,
  deleteProduct,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  updateProductReset,
  postNewProductStart,
  postNewProductSuccess,
  postNewProductFailure,
  isPostedReset,
} = productSlice.actions;

export default productSlice.reducer;