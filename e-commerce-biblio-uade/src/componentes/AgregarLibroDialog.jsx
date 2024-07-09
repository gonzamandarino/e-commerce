/* eslint-disable react/prop-types */
// src/componentes/AgregarLibroDialog.jsx
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Select from 'react-select';
import { useSelector } from 'react-redux';

function AgregarLibroDialog({ open, handleClose, handleChange, handleSubmit, formData, handleFileChange, handleCategoryChange }) {
    const categorias = useSelector((state) => state.categorias.items);

    //const isFormComplete = formData.titulo && formData.autor && formData.descripcion && formData.precio && formData.categorias.length > 0;

    const categoriaOptions = categorias.map(categoria => ({
        value: categoria.categoria_id,  // Asegúrate de que esto coincida con el nombre correcto del campo ID
        label: categoria.nombre
    }));

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar Libro</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="nombre"
                    label="Título"
                    type="text"
                    fullWidth
                    value={formData.nombre}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="autor"
                    label="Autor"
                    type="text"
                    fullWidth
                    value={formData.autor}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="descripcion"
                    label="Descripción"
                    type="text"
                    fullWidth
                    value={formData.descripcion}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="precio"
                    label="Precio"
                    type="number"
                    fullWidth
                    value={formData.precio}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="stock"
                    label="Cantidad"
                    type="number"
                    fullWidth
                    value={formData.stock}
                    onChange={handleChange}
                />
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span">
                        Subir Imagen
                    </Button>
                </label>
                {formData.imagen && <p>Archivo seleccionado: {formData.imagen.name}</p>}

                <Select
                    isMulti
                    options={categoriaOptions}
                    value={categoriaOptions.filter(option => formData.cate.some(c => c.categoria_id === option.value))}
                    onChange={handleCategoryChange}
                    placeholder="Seleccionar categorías"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={false}>Agregar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AgregarLibroDialog;
