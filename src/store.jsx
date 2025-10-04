import { configureStore, createSlice } from "@reduxjs/toolkit";

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    clearCart: () => [],
    removeFromCart: (state, action) => {
      return state.filter((item, index) => index !== action.payload);
    },
  },
});

// User slice (for Profile info)
// User slice (for Profile info)
const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,       // Store MongoDB id
    name: "",
    email: "",
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;  // add _id
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state._id = null;
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});


// Export actions
export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;
export const { setUser, clearUser } = userSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});
