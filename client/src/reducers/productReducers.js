import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    productsData: [],
    productsDetails: [],
    reviews:[],
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
    getAdminProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAdminProductSuccess: (state, action) => {
      state.isFetching = false;
      state.productsData = action.payload;
    },
    getAdminProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    postReviewsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    postReviewsSuccess: (state, action) => {
      state.isFetching = false;
      state.reviews = action.payload;
    },
    postReviewsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
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
  getAdminProductStart,
  getAdminProductSuccess,
  getAdminProductFailure,
  postReviewsStart,
  postReviewsSuccess,
  postReviewsFailure,
} = productSlice.actions;

export default productSlice.reducer;