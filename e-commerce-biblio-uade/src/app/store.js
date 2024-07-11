// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import librosReducer from '../features/libros/librosSlice';
import authReducer from '../features/auth/authSlice';
import categoriasReducer from '../features/categorias/categoriasSlice';
import misLibrosReducer from '../features/libros/misLibrosSlice';
import ventaReducer from '../features/venta/ventaSlice'; // Importa el slice de venta

export const store = configureStore({
  reducer: {
    libros: librosReducer,
    categorias: categoriasReducer,
    auth: authReducer,
    misLibros: misLibrosReducer,
    venta: ventaReducer, 
  },
});

export default store;
