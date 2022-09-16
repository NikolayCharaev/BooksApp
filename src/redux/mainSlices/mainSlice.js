import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  loading: false,
  error: false,
  errorText: '',
};

export const mainSlices = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setValueText: (state, action) => {},
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    setError: (state) => {
      state.error = !state.error;
    },
    setErrorText: (state, action) => {
        if (action.type === 'main/setErrorText'){
            state.errorText = action.payload
        }
   
    },
  },
});

export const { setValueText, setLoading, setError, setErrorText } = mainSlices.actions;
export default mainSlices.reducer;
