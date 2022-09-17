import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  loading: false,
  error: false,
  errorText: '',
  counterPagination: 8,
  book: [],
};

export const mainSlices = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setValue: (state, action) => {
            state.value = action.payload
            console.log(action.payload)
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    setError: (state) => {
      state.error = !state.error;
    },
    setErrorText: (state, action) => {
      if (action.type === 'main/setErrorText') {
        state.errorText = action.payload;
      }
    },
    setCounterPagination: (state) => {
      state.counterPagination += 4;
    },
    setBook: (state, action) => {
      state.book.push(action.payload);
      console.log(state.book);
    },
  },
});

export const { setValue, setLoading, setError, setErrorText, setCounterPagination, setBook } =
  mainSlices.actions;
export default mainSlices.reducer;
