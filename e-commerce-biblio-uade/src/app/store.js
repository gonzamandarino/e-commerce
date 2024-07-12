// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import librosReducer from '../features/libros/librosSlice';
import authReducer from '../features/auth/authSlice';
import categoriasReducer from '../features/categorias/categoriasSlice';
import misLibrosReducer from '../features/libros/misLibrosSlice';
import ventaReducer from '../features/venta/ventaSlice'; // Importa el slice de venta
import imagenesReducer from '../features/imagenes/imagenesSlice'; // Importa el slice de venta
import usuarioReducer from '../features/usuario/usuarioSlice';
export const store = configureStore({
  reducer: {
    libros: librosReducer,
    categorias: categoriasReducer,
    auth: authReducer,
    misLibros: misLibrosReducer,
    venta: ventaReducer, 
    imagenes: imagenesReducer,
    usuario: usuarioReducer,
  },
});

export default store;
