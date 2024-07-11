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
    'libros/addStockLibro',
    async ({ libro_id, stockAsumar }, { getState, rejectWithValue }) => {
        try {
            const token = selectToken(getState());
            console.log("TOKEN", token);
            console.log("STOCK A SUMAR", stockAsumar);
            console.log("ID DEL LIBRO", libro_id);
            const response = await axios.put(
                `http://localhost:4002/libros/stock/${libro_id}`,
                stockAsumar,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return { libro_id, stock: response.data };
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
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
            stock: libro.stock,
            imagen: libro.imagen
        };

        const response = await axios.post('http://localhost:4002/libros', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const updateLibro = createAsyncThunk(
    'libros/updateLibro',
    async ({ libro_id, libroActualizado }, { getState, rejectWithValue }) => {
        try {
            const token = selectToken(getState());
            const response = await axios.put(
                `http://localhost:4002/libros/${libro_id}`,
                libroActualizado,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const librosSlice = createSlice({
    name: 'libros',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        selectedLibro: null,
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
            })
            .addCase(addStockLibro.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addStockLibro.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { libro_id, stock } = action.payload;
                const libro = state.items.find((libro) => libro.id === libro_id);
                if (libro) {
                    libro.stock = stock;
                }
            })
            .addCase(addStockLibro.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })
            .addCase(updateLibro.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateLibro.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedLibro = action.payload;
                const index = state.items.findIndex((libro) => libro.id === updatedLibro.id);
                if (index !== -1) {
                    state.items[index] = updatedLibro;
                }
            })
            .addCase(updateLibro.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default librosSlice.reducer;
