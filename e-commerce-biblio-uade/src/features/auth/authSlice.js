import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async ({ nombre, pass }) => {
        const response = await axios.post('http://localhost:4002/api/v1/auth/authenticate', { "nombre": nombre, "pass": pass });
        console.log("EL TOKEN ES", response.data);
        return response.data.access_token;
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ nombre, pass, role }) => {
        const response = await axios.post('http://localhost:4002/api/v1/auth/register', { nombre, pass, role });
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAuthenticated: false,
        status: 'idle',
        error: null,
        username: '', // Nuevo campo para el nombre de usuario
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.username = ''; // Limpiar el nombre de usuario al cerrar sesión
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.username = action.payload.username; // Guardar el nombre de usuario
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                // Aquí puedes manejar la respuesta después del registro si es necesario
                // Por ejemplo, actualizar el estado de autenticación si el registro es exitoso
                state.token = action.payload.token; // Actualiza el token después del registro si es relevante
                state.isAuthenticated = true; // Establece la autenticación como verdadera después del registro
                state.username = action.payload.username; // Guarda el nombre de usuario registrado
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { setToken, setUsername, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUsername = (state) => state.auth.username;

export default authSlice.reducer;
