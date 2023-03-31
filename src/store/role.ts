import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum ERole {
  Mentor = 'M',
  Student = 'S',
  Peer = 'P',
}

export interface RoleState {
  value: ERole | null;
}

const initialState: RoleState = {
  value: null,
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    changeRole: (state, action: PayloadAction<ERole>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeRole } = roleSlice.actions;

export default roleSlice.reducer;
