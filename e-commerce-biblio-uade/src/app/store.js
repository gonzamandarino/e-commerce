// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import librosReducer from '../features/libros/librosSlice';
import authReducer from '../features/auth/authSlice';
import categoriasReducer from '../features/categorias/categoriasSlice'
import misLibrosReducer from'../features/libros/misLibrosSlice';

export const store = configureStore({
  reducer: {
    libros: librosReducer,
    categorias: categoriasReducer,
    auth: authReducer,
    misLibros: misLibrosReducer,
  },
});

export default store;