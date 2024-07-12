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
            return response.data;
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

export const actualizarRol = createAsyncThunk(
    'usuario/actualizarRol',
    async ({ id, nuevoRol }, thunkAPI) => {
        const token = selectToken(thunkAPI.getState());
        try {
            const response = await axios.patch(`http://127.0.0.1:4002/usuarios/rol/${id}`, 
            { rol: nuevoRol },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el rol del usuario:', error);
            throw error;
        }
    }
);

export const eliminarUsuario = createAsyncThunk(
    'usuario/eliminarUsuario',
    async (userId, thunkAPI) => {
        const token = selectToken(thunkAPI.getState());
        try {
            await axios.delete(`http://127.0.0.1:4002/usuarios/eliminar/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return userId;
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error;
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
        items: []
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
            })
            .addCase(actualizarRol.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(actualizarRol.fulfilled, (state, action) => {
                state.status = 'succeeded';
                
                const updatedUserIndex = state.items.findIndex(user => user.id === action.payload.id);
                if (updatedUserIndex !== -1) {
                    state.items[updatedUserIndex] = action.payload;
                }
            })
            .addCase(actualizarRol.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(eliminarUsuario.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(eliminarUsuario.fulfilled, (state, action) => {
                state.status = 'succeeded';
                
                state.items = state.items.filter(user => user.id !== action.payload);
            })
            .addCase(eliminarUsuario.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
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
