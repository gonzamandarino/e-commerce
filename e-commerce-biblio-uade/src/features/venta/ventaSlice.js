import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectToken } from '../auth/authSlice';

// Define una función asyncThunk para la solicitud POST de ventas
export const postVenta = createAsyncThunk(
    'venta/postVenta',
    async (ventas, { getState, rejectWithValue }) => {
        try {
            const token = selectToken(getState());
            console.log("TOKEN", token);
            console.log("VENTA", ventas);
            const response = await axios.post(
                'http://127.0.0.1:4002/ventas',
                ventas,
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

// Define el slice de ventas
const ventaSlice = createSlice({
    name: 'venta',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postVenta.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postVenta.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(postVenta.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default ventaSlice.reducer;
