// src/components/MostrarCategorias.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategorias, selectCategorias, selectCategoriasStatus, selectCategoriasError, actualizarCategoria } from '../features/categorias/categoriasSlice';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const MostrarCategorias = () => {
    const dispatch = useDispatch();
    const categorias = useSelector(selectCategorias);
    const categoriasStatus = useSelector(selectCategoriasStatus);
    const error = useSelector(selectCategoriasError);
    const [openDialog, setOpenDialog] = useState(false);
    const [categoriaToUpdate, setCategoriaToUpdate] = useState({ id: null, nombre: '', descripcion: '' });

    useEffect(() => {
        dispatch(fetchCategorias());
    }, [dispatch]);

        // Use useEffect to log categoriaToUpdate after it's updated
        useEffect(() => {
            console.log("Categoria actualizada:", categoriaToUpdate);
        }, [categoriaToUpdate]);
    
    const handleModificarClick = (categoria) => {
        const updatedCategoria = {
            id: categoria.categoria_id,
            nombre: categoria.nombre,
            descripcion: categoria.descripcion
        };
        setCategoriaToUpdate(updatedCategoria, () => {
            // Este console.log mostrará el estado actualizado
            console.log("Categoria actualizada:", categoriaToUpdate);
        });
        setOpenDialog(true);
    };
    
    

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategoriaToUpdate({ ...categoriaToUpdate, [name]: value });
    };

    const handleActualizarCategoria = () => {
        dispatch(actualizarCategoria({ categoriaActualizada: categoriaToUpdate }));
        setOpenDialog(false);
    };

    return (
        <div className="container mt-4">
            <h2>Categorías Disponibles</h2>
            {categoriasStatus === 'loading' && <p>Cargando categorías...</p>}
            {categoriasStatus === 'failed' && <p>{error}</p>}
            {categoriasStatus === 'succeeded' && categorias.length > 0 ? (
                <ul className="list-group">
                    {categorias.map((categoria) => (
                        <li key={categoria.categoria_id} className="list-group-item">
                            <strong>{categoria.nombre}</strong>: {categoria.descripcion}
                            <Button onClick={() => handleModificarClick(categoria)}>
                                Modificar
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay categorías disponibles</p>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Modificar Categoría</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={categoriaToUpdate.nombre}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Descripción"
                        type="text"
                        fullWidth
                        value={categoriaToUpdate.descripcion}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleActualizarCategoria} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MostrarCategorias;
