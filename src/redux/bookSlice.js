import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'bookform',
  initialState: [],
  reducers: {
    getBooksReducer: (state, action) => {
      const data = action.payload;
      console.log(state, action)
      return data;
    }
  }
});

export const { getBooksReducer } = bookSlice.actions;

export default bookSlice.reducer;