/* eslint-disable no-param-reassign */
import { createStore, action } from 'easy-peasy';

const store = createStore({
  auth: false,
  setAuth: action((state, payload) => {
    state.auth = payload;
  }),
});

export default store;
