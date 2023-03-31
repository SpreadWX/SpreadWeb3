import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import {} from '@/store/notification';
import { useSelector, useDispatch } from 'react-redux';
import { onClose } from '@/store/notification';
import type { RootState } from '@/store';
import { AlertColor } from '@mui/material';

const Notification = () => {
  const { message, open, severity } = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(onClose());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity as AlertColor} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
