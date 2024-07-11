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

// Acción asincrónica para obtener una imagen por su ID
export const obtenerImagen = createAsyncThunk(
    'imagenes/obtenerImagen',
    async (id) => {
        try {
            const response = await axios.get(`http://localhost:4002/imagenes/${id}`, {
                responseType: 'arraybuffer', // Indica que la respuesta es un array de bytes
            });
            
            // Crea un blob a partir de los datos de la imagen recibidos
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);

            return { id, imageUrl }; // Devuelve el ID y la URL de la imagen para mostrarla en el frontend
        } catch (error) {
            throw error.response.data; // Propaga el error para manejarlo en el componente
        }
    }
);

// Slice de Redux para manejar el estado de las imágenes
const imagenesSlice = createSlice({
    name: 'imagenes',
    initialState: {
        status: 'idle',
        error: null,
        imagenesPorLibro: {}, // Objeto para almacenar las URLs de las imágenes por libro_id
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(guardarImagen.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(guardarImagen.fulfilled, (state) => {
                state.status = 'succeeded';
                // No se está usando directamente en este ejemplo
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
                state.imagenesPorLibro[id] = imageUrl; // Almacena la URL de la imagen por libro_id
            })
            .addCase(obtenerImagen.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default imagenesSlice.reducer;
