import { createSlice } from '@reduxjs/toolkit';

const selectedClientSlice = createSlice({
  name: 'selectedClient',
  initialState: null,
  reducers: {
    setSelectedClient: (state, action) => action.payload,
    clearSelectedClient: () => null,
  },
});

export const { setSelectedClient, clearSelectedClient } = selectedClientSlice.actions;
export default selectedClientSlice.reducer;
