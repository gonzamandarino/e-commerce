// src/services/authService.js
import api from '../api/api';

export const authenticateUser = async (username, password) => {
    try {
        const response = await api.post('/api/v1/auth/authenticate', { nombre: username, pass: password });
        return response.data.token; // Devuelve el token
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
};
