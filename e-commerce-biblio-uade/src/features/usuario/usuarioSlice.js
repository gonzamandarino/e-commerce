import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../auth/authSlice';

export const fetchUsuarios = createAsyncThunk(
    'usuario/fetchUsuarios',
    async (_, thunkAPI) => {
        const token = selectToken(thunkAPI.getState());
        try {
            const response = await axios.get('http://localhost:4002/usuarios/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }
);

export const isAdmin = createAsyncThunk(
    'usuario/isAdmin',
    async (_, thunkAPI) => {
        const token = selectToken(thunkAPI.getState());
        try {
            const response = await axios.get('http://localhost:4002/usuarios/admin', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data; // Assuming this returns a boolean or an object indicating admin status
        } catch (error) {
            console.error('Error al obtener datos de usuario:', error);
            throw error;
        }
    }
);

export const obtenerIdUsuario = createAsyncThunk(
    'usuario/obtenerIdUsuario',
    async (nombre, thunkAPI) => {
        const token = selectToken(thunkAPI.getState());
        try {
            const response = await axios.get('http://localhost:4002/usuarios/buscarId', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { "nombre": nombre }
            });
            return response.data.id;
        } catch (error) {
            console.error('Error al obtener el ID del usuario:', error);
            throw new Error('Error al obtener el ID del usuario');
        }
    }
);

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: {
        usuarioId: null,
        isAdmin: false,
        status: 'idle',
        error: null,
        items: []  // Aquí se almacenarán los usuarios obtenidos
    },
    reducers: {
        setUsuarioId: (state, action) => {
            state.usuarioId = action.payload;
        },
        resetUsuarioId: (state) => {
            state.usuarioId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(obtenerIdUsuario.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(obtenerIdUsuario.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.usuarioId = action.payload;
            })
            .addCase(obtenerIdUsuario.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUsuarios.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsuarios.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchUsuarios.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(isAdmin.fulfilled, (state, action) => {
                state.isAdmin = action.payload;
            });
    },
});

export const { setUsuarioId, resetUsuarioId } = usuarioSlice.actions;

export const selectUsuarioId = (state) => state.usuario.usuarioId;
export const selectUsuarioStatus = (state) => state.usuario.status;
export const selectUsuarioError = (state) => state.usuario.error;
export const selectIsAdmin = (state) => state.usuario.isAdmin;

export const selectItems = (state) => state.usuario.items;

export default usuarioSlice.reducer;
