// service/getLibros.js
import axios from 'axios';

const getLibros = async () => {
    try {
        const response = await axios.get('http://localhost:4002/libros');
        return response.data;
    } catch (error) {
        console.error('Error fetching libros:', error);
        return [];
    }
};

export default getLibros;
