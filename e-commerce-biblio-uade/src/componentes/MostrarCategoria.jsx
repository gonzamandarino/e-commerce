// src/components/MostrarCategorias.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategorias, selectCategorias, selectCategoriasStatus, selectCategoriasError, eliminarCategoria } from '../features/categorias/categoriasSlice';
import { Button } from '@mui/material';

const MostrarCategorias = () => {
    const dispatch = useDispatch();
    const categorias = useSelector(selectCategorias);
    const categoriasStatus = useSelector(selectCategoriasStatus);
    const error = useSelector(selectCategoriasError);

    useEffect(() => {
        dispatch(fetchCategorias());
    }, [dispatch]);

    const handleEliminarCategoria = (id) => {
        if (window.confirm('¿Estás seguro que deseas eliminar esta categoría?')) {
            dispatch(eliminarCategoria(id));
        }
    };

    return (
        <div className="container mt-4">
            <h2>Categorías Disponibles</h2>
            {categoriasStatus === 'loading' && <p>Cargando categorías...</p>}
            {categoriasStatus === 'failed' && <p>{error}</p>}
            {categoriasStatus === 'succeeded' && categorias.length > 0 ? (
                <ul className="list-group">
                    {categorias.map((categoria) => (
                        <li key={categoria.id} className="list-group-item">
                            <strong>{categoria.nombre}</strong>: {categoria.descripcion}
                            <Button onClick={() => handleEliminarCategoria(categoria.id)} variant="contained" color="error">
                                Borrar
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay categorías disponibles</p>
            )}
        </div>
    );
};

export default MostrarCategorias;
