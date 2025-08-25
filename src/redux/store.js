import { configureStore } from '@reduxjs/toolkit';
import selectedClientReducer from '../slices/selectedClientSlice.js';

const store = configureStore({
  reducer: {
    selectedClient: selectedClientReducer,
  },
});

export default store;
