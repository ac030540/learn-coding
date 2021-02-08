/* eslint-disable no-param-reassign */
import { createStore, action } from 'easy-peasy';

const store = createStore({
  auth: false,
  setAuth: action((state, payload) => {
    state.auth = payload;
  }),
  snackbarStates: {
    open: false,
    handleSnackbarClose: null,
    severity: 'success',
    message: 'No message',
  },
  setSnackbarStates: action((state, payload) => {
    const { open, handleSnackbarClose, severity, message } = payload;
    state.snackbarStates = {
      ...state.snackbarStates,
      open,
      handleSnackbarClose,
      severity,
      message,
    };
  }),
  setSnackbarOpen: action((state, payload) => {
    state.snackbarStates = {
      ...state.snackbarStates,
      open: payload,
    };
  }),
});

export default store;
