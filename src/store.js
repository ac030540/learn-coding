/* eslint-disable no-param-reassign */
import { createStore, action } from 'easy-peasy';

const store = createStore({
  auth: null,
  setAuth: action((state, payload) => {
    state.auth = payload;
  }),
  level: 'Beginner',
  setLevel: action((state, payload) => {
    state.level = payload;
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
  debug: false,
  setDebug: action((state, payload) => {
    state.debug = payload;
  }),
  status: {},
  setStatus: action((state, payload) => {
    state.status = payload;
  }),
  output: '',
  setOutput: action((state, payload) => {
    state.output = payload;
  }),
  showConfetti: false,
  setShowConfetti: action((state, payload) => {
    state.showConfetti = payload;
  }),
});

export default store;
