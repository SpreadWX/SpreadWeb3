import { configureStore } from '@reduxjs/toolkit';
import roleReducer from './role';
import notificationReducer from './notification';

export const store = configureStore({
  reducer: {
    role: roleReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
