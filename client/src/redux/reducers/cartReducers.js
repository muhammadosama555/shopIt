// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {}, // Stores the selected courses with quantities
  shippingInfo: {}, // Stores shipping information
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, userId, quantity } = action.payload;

      // Create a user-specific cart if it doesn't exist
      if (!state.cart[userId]) {
        state.cart[userId] = [];
      }

      const existingProductIndex = state.cart[userId].findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex === -1) {
        // If it's a new product for this user, add it to their cart
        state.cart[userId].push({ ...product, userId, quantity });
      } else {
        // If the product already exists, update its quantity
        state.cart[userId][existingProductIndex].quantity += quantity;
      }
    },
    removeFromCart: (state, action) => {
      const { productId, userId } = action.payload;
      if (state.cart[userId]) {
        const existingProductIndex = state.cart[userId].findIndex(
          (product) => product._id === productId
        );
        if (existingProductIndex !== -1) {
          state.cart[userId].splice(existingProductIndex, 1);
        }
      }
    },
    increaseQuantity: (state, action) => {
      const { productId, userId } = action.payload;
      if (state.cart[userId]) {
        const existingProductIndex = state.cart[userId].findIndex(
          (product) => product._id === productId
        );
        if (existingProductIndex !== -1) {
          state.cart[userId][existingProductIndex].quantity += 1;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const { productId, userId } = action.payload;
      if (state.cart[userId]) {
        const existingProductIndex = state.cart[userId].findIndex(
          (product) => product._id === productId
        );
        if (existingProductIndex !== -1) {
          if (state.cart[userId][existingProductIndex].quantity > 1) {
            state.cart[userId][existingProductIndex].quantity -= 1;
          }
        }
      }
    },
    clearCart: (state, action) => {
      const { userId } = action.payload;
      // Clear the user's cart
      state.cart[userId] = [];
    },
    saveShippingInfo: (state, action) => {
      const { shippingInfo, userId } = action.payload;
      // Update the shipping information for this user
      state.shippingInfo[userId] = shippingInfo;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  saveShippingInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
