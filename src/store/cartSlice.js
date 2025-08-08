import { createSlice } from '@reduxjs/toolkit';

// localStorage'dan o'qish
const loadCart = () => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const loadWishlist = () => {
  try {
    const data = localStorage.getItem('wishlist');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
    wishlist: loadWishlist(),
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    incrementItem: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.count += 1;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    decrementItem: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      } else {
        state.items = state.items.filter(i => i.id !== action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      localStorage.setItem('wishlist', JSON.stringify([]));
    },

    wishlists: (state, action) => {
      const exists = state.wishlist.find(item => item.id === action.payload.id);
      if (exists) {
        state.wishlist = state.wishlist.filter(item => item.id !== action.payload.id);
      } else {
        state.wishlist.push(action.payload);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  wishlists,
  decrementItem,
  incrementItem,
  clearCart, // bu yerda
   clearWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;
