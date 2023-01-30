// import {createSlice} from "@reduxjs/toolkit";
// const cartSlice = createSlice({
//     name: "cartSlice",
//     initialState: {
//         products: [],
//         quantity: 0,
//         total: 0
//     },
//     reducers: {
//         addProduct: (state, action) => {
//             state.quantity +=1;
//             state.products.push(action.payload);
//             state.total += action.payload.quantity*action.payload.price
//         },
//         updateQty: (state, action) => {
//             state.products = action.payload;
//         }
//     }
// })

// export const {addProduct,updateQty} = cartSlice.actions
// export default cartSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  shippingInfo: {},
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item  = action.payload;
      const existingItemIndex = state.products.findIndex(cartItem => cartItem._id === item._id);
      if (existingItemIndex !== -1) {
        state.products[existingItemIndex].quantity += item.quantity;
      } else {
        state.products.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.products = state.products.filter(item => item._id !== itemId);
    },
    clearCart: state => {
      state.products = []
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.products.findIndex(item => item._id === itemId);
      state.products[itemIndex].quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.products.findIndex(item => item._id === itemId);
      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
      }
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      },
    },
});

export const { addToCart,
               removeFromCart,
               clearCart,
               increaseQuantity,
               decreaseQuantity,
               saveShippingInfo,
             } = cartSlice.actions;

export default cartSlice.reducer;
