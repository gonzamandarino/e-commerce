import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../auth/authSlice';

// Acción asincrónica para guardar una imagen
export const guardarImagen = createAsyncThunk(
    'imagenes/guardarImagen',
    async (file, { getState }) => {
        const token = selectToken(getState());

        // Configura el FormData para enviar el archivo
        const formData = new FormData();
        formData.append('datosImagen', file);

        try {
            const response = await axios.post('http://localhost:4002/imagenes/guardar', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Especifica el tipo de contenido
                },
            });
            return response.data; // Devuelve el ID de la imagen guardada
        } catch (error) {
            throw error.response.data; // Propaga el error para manejarlo en el componente
        }
    }
);


export const cambiarImagen = createAsyncThunk(
    'imagenes/cambiarImagen',
    async (file, { getState },id) => {
        const token = selectToken(getState());

        // Configura el FormData para enviar el archivo
        const formData = new FormData();
        formData.append('datosImagen', file);

        try {
            const response = await axios.put(`http://localhost:4002/imagenes/guardar/cambiar/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Especifica el tipo de contenido
                },
            });
            return response.data; // Devuelve el ID de la imagen guardada
        } catch (error) {
            throw error.response.data; // Propaga el error para manejarlo en el componente
        }
    }
);

// Acción asincrónica para obtener una imagen por su ID
export const obtenerImagen = createAsyncThunk(
    'imagenes/obtenerImagen',
    async (id) => {
        try {
            const response = await axios.get(`http://localhost:4002/imagenes/${id}`, {
                responseType: 'arraybuffer',
            });
            
            // Crea un blob a partir de los datos de la imagen recibidos
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);

            return { id, imageUrl }; 
        } catch (error) {
            throw error.response.data; 
        }
    }
);


const imagenesSlice = createSlice({
    name: 'imagenes',
    initialState: {
        status: 'idle',
        error: null,
        imagenesPorLibro: {}, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(guardarImagen.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(guardarImagen.fulfilled, (state) => {
                state.status = 'succeeded';
                
            })
            .addCase(guardarImagen.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(obtenerImagen.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(obtenerImagen.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { id, imageUrl } = action.payload;
                state.imagenesPorLibro[id] = imageUrl; 
            })
            .addCase(obtenerImagen.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default imagenesSlice.reducer;
