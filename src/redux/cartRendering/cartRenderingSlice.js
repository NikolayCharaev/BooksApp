import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  text: '',
};

export const cartRendering = createSlice({
  name: 'rendering',
  initialState,
  reducers: {
    setFullCart: (state, action) => {
      state.cart = action.payload;
    },
    setDeleteCart: (state) => {
      state.cart = [];
      state.text = ''
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
  
  },
});

export const { setFullCart, setDeleteCart, setText } = cartRendering.actions;
export default cartRendering.reducer;
