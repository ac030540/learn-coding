/* eslint-disable no-param-reassign */
import { createStore, action } from 'easy-peasy';

const store = createStore({
  auth: null,
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
    const { open, severity, message } = payload;
    state.snackbarStates = {
      ...state.snackbarStates,
      open,
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
