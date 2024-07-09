// src/features/misLibros/misLibrosSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../auth/authSlice';

// Async thunk para obtener los libros del usuario
export const getMisLibros = createAsyncThunk('misLibros/getMisLibros', async (_, { rejectWithValue, getState }) => {
    try {
        const token = selectToken(getState());
        const response = await axios.get('http://localhost:4002/libros/mislibros', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        console.log(token);
        return response.data;
    } catch (error) {
        // Manejo de errores específico para el frontend
        console.error('Error al obtener mis libros:', error);
        
        return rejectWithValue(error.message);
    }
});


const misLibrosSlice = createSlice({
    name: 'misLibros',
    initialState: {
        items: [null],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMisLibros.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMisLibros.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(getMisLibros.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default misLibrosSlice.reducer;
