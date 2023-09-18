import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'bookform',
  initialState: [],
  reducers: {
    getDataReducer: (state, action) => {
      const data = action.payload;
      return data;
    }
  }
});

export const { getDataReducer } = dataSlice.actions;

export default dataSlice.reducer;