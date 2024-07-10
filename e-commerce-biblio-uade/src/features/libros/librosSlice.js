import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../auth/authSlice';

export const fetchLibros = createAsyncThunk('libros/fetchLibros', async () => {
    const response = await axios.get('http://localhost:4002/libros');
    return response.data;
});

export const getLibroByID = createAsyncThunk('libros/getLibroByID', async (libro_id) => {
    const response = await axios.get(`http://localhost:4002/libros/${libro_id}`);
    return response.data;
});

export const deleteLibro = createAsyncThunk(
    'libros/deleteLibro',
    async (id, { getState }) => {
        const token = selectToken(getState());
        await axios.delete(`http://localhost:4002/libros/eliminar/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return id;
    }
);



export const addStockLibro = createAsyncThunk(
    // 'libros/deleteLibro',
    // async (id, { getState }) => {
    //     const token = selectToken(getState());
    //     await axios.delete(`http://localhost:4002/libros/eliminar`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //         data: { id },
    //     });
    //     return id;
    // }
);






export const addLibro = createAsyncThunk(
    'libros/addLibro',
    async (libro, { getState }) => {
        const token = selectToken(getState());

        const data = {
            nombre: libro.nombre,
            descripcion: libro.descripcion,
            precio: parseFloat(libro.precio),
            autor: libro.autor,
            cate: libro.cate,
            usuarioId: libro.usuarioId,
            stock: libro.stock
        };

        console.log(data);
        console.log(token);
        const response = await axios.post('http://localhost:4002/libros',data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

const librosSlice = createSlice({
    name: 'libros',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        selectedLibro: null, // Agregar un campo para almacenar el libro seleccionado
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
            .addCase(getLibroByID.fulfilled, (state, action) => {
                state.selectedLibro = action.payload;
            })
            .addCase(deleteLibro.fulfilled, (state, action) => {
                state.items = state.items.filter((libro) => libro.id !== action.payload);
            })
            .addCase(addLibro.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export default librosSlice.reducer;
