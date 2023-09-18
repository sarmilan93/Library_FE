import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../redux/bookSlice';

const bookStore = configureStore({
  reducer: {
    bookform: bookReducer
  }
});

export default bookStore;