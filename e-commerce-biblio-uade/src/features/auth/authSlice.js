// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticateUser = createAsyncThunk(
    'auth/authenticateUser',
    async ({ nombre, pass }) => {
        const response = await axios.post('http://localhost:4002/api/v1/auth/authenticate', { nombre: nombre, pass: pass });
        return response.data.token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAuthenticated: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.token = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { setToken, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
