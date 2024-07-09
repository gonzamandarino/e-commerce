// src/features/categorias/categoriaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategorias = createAsyncThunk('categorias/fetchCategorias', async () => {
    const response = await axios.get('http://localhost:4002/categoria');
    return response.data;
});

const categoriaSlice = createSlice({
    name: 'categorias',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategorias.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategorias.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCategorias.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default categoriaSlice.reducer;
