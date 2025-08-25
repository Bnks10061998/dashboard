import { configureStore } from '@reduxjs/toolkit';
import selectedClientReducer from '../Slices/selectedClientSlice';

const store = configureStore({
  reducer: {
    selectedClient: selectedClientReducer,
  },
});

export default store;
