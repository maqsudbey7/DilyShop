  // store.js
  import { configureStore } from '@reduxjs/toolkit';
  import cartReducer from './cartSlice';
  import authReducer from './authSlice'; // yoki siz yaratgan auth

  const store = configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
    },
  });

  export default store; // ⚠️ Bu default export
