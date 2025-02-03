// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import appReducer from './appStore';
const store = configureStore({
  reducer: { auth: authReducer, app: appReducer },
});

export default store;
