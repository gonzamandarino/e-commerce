// src/features/categorias/categoriaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../auth/authSlice';

export const fetchCategorias = createAsyncThunk('categorias/fetchCategorias', async () => {
    const response = await axios.get('http://localhost:4002/categoria');
    return response.data;
});

export const postCategoria = createAsyncThunk('categorias/postCategoria', async (categoriaData, { rejectWithValue, getState }) => {
    try {
        const token = selectToken(getState());
        const response = await axios.post('http://localhost:4002/categoria', categoriaData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al agregar categoría:', error);
        return rejectWithValue(error.message);
    }
});

export const eliminarCategoria = createAsyncThunk('categorias/eliminarCategoria', async (id, { rejectWithValue, getState }) => {
    try {
        const token = selectToken(getState());
        const response = await axios.delete(`http://127.0.0.1:4002/categoria/borrar/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        return rejectWithValue(error.message);
    }
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
            })
            .addCase(postCategoria.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postCategoria.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload); 
            })
            .addCase(postCategoria.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(eliminarCategoria.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(eliminarCategoria.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(categoria => categoria.id !== action.payload.id);
            })
            .addCase(eliminarCategoria.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectCategorias = (state) => state.categorias.items;
export const selectCategoriasError = (state) => state.categorias.error;
export const selectCategoriasStatus = (state) => state.categorias.status;

export default categoriaSlice.reducer;
