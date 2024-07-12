import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async ({ nombre, pass }) => {
        const response = await axios.post('http://localhost:4002/api/v1/auth/authenticate', { "nombre": nombre, "pass": pass });
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
        username: '', 
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
            state.username = ''; 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.username = action.payload.username; 
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload.token; 
                state.isAuthenticated = true; 
                state.username = action.payload.username; 
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
