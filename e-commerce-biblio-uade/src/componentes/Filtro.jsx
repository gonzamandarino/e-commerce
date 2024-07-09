/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategorias } from '../features/categorias/categoriasSlice';

const Filtro = ({ onFilterChange }) => {
    const dispatch = useDispatch();
    const categorias = useSelector((state) => state.categorias.items);

    useEffect(() => {
        dispatch(fetchCategorias());
    }, [dispatch]);

    useEffect(() => {
        console.log('Categorías:', categorias);
    }, [categorias]);

    return (
        <div className="filtro-container">
            <select onChange={(e) => onFilterChange(e.target.value)} className="form-select">
                <option value="">Todas las categorías</option>
                {categorias.map((categoria, index) => (
                    <option key={index} value={categoria.nombre}>
                        {categoria.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filtro;
