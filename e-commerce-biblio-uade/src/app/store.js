import { configureStore } from '@reduxjs/toolkit';
import librosReducer from '../features/libros/librosSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    libros: librosReducer,
    auth: authReducer,
  },
});

export default store;
