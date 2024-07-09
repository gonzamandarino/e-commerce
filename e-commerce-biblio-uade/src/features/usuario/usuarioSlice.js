// usuarioSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../auth/authSlice';// Import selectToken from your authSlice or wherever it is defined
import { useSelector } from 'react-redux';

export const obtenerIdUsuario = createAsyncThunk(
    'usuario/obtenerIdUsuario',
    async (nombre) => {

        const token = useSelector(selectToken); // Ensure selectToken is correctly imported and used
        try {

            const response = await axios.get('http://localhost:4002/usuarios/buscarId', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {"nombre": nombre}
            });
            console.log(response.data.id);
            return response.data.id; // Assuming your response format includes an 'id' field
        } catch (error) {
            console.log(token);
            console.error('Error al obtener el ID del usuario:', error);
            throw new Error('Error al obtener el ID del usuario');
        }
    }
);

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: {
        usuarioId: null,
        status: 'idle',
        error: null,
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
            });
    },
});

export const { setUsuarioId, resetUsuarioId } = usuarioSlice.actions;

export const selectUsuarioId = (state) => state.usuario.usuarioId;
export const selectUsuarioStatus = (state) => state.usuario.status;
export const selectUsuarioError = (state) => state.usuario.error;

export default usuarioSlice.reducer;
