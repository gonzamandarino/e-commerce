// src/redux/librosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { selectToken } from '../auth/authSlice';

export const fetchLibros = createAsyncThunk('libros/fetchLibros', async () => {
    const response = await api.get('/libros');
    return response.data;
    });

    export const deleteLibro = createAsyncThunk(
    'libros/deleteLibro',
    async (id, { getState }) => {
        const token = selectToken(getState());
        await api.delete(`/libros/eliminar`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { id },
        });
        return id;
    }
    );

    const librosSlice = createSlice({
    name: 'libros',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLibros.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchLibros.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(fetchLibros.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(deleteLibro.fulfilled, (state, action) => {
            state.items = state.items.filter((libro) => libro.id !== action.payload);
        });
    },
});

export default librosSlice.reducer;
