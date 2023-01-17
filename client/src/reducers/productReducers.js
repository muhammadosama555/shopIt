import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    productsData: [],
    productsDetails: [],
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
   
  }
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  getProductDetailsStart,
  getProductDetailsSuccess,
  getProductDetailsFailure,
} = productSlice.actions;

export default productSlice.reducer;