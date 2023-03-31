import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RoleState {
  message: string;
  open: boolean;
  severity: string;
}

const initialState: RoleState = {
  message: '',
  open: false,
  severity: 'success',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<{ message: string; severity?: string }>) => {
      if (action.payload) {
        state.message = action.payload.message;
        state.severity = action.payload?.severity || 'success';
        state.open = true;
      }
    },
    onClose: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessage, onClose } = notificationSlice.actions;

export default notificationSlice.reducer;
