/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Select from 'react-select';
import { useSelector } from 'react-redux';

function ModificarLibroDialog({ open, handleClose, handleChange, handleSubmit, formData }) {
    const categorias = useSelector((state) => state.categorias.items);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const categoriaOptions = categorias.map(categoria => ({
        value: categoria.categoria_id,
        label: categoria.nombre
    }));

    const handleCategoryChange = (selectedOptions) => {
        const categoriasSeleccionadas = selectedOptions.map(option => ({
            categoria_id: option.value,
            nombre: option.label
        }));
        handleChange({ target: { name: 'cate', value: categoriasSeleccionadas } });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange({ target: { name, value } });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modificar Libro</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="nombre"
                    label="Título"
                    type="text"
                    fullWidth
                    value={formData.nombre}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="autor"
                    label="Autor"
                    type="text"
                    fullWidth
                    value={formData.autor}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="descripcion"
                    label="Descripción"
                    type="text"
                    fullWidth
                    value={formData.descripcion}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="precio"
                    label="Precio"
                    type="number"
                    fullWidth
                    value={formData.precio}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="stock"
                    label="Cantidad"
                    type="number"
                    fullWidth
                    value={formData.stock}
                    onChange={handleInputChange}
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
                {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
                {formData.imagen && !selectedFile && <p>Imagen actual: {formData.imagen}</p>}
                
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
                <Button onClick={handleSubmit}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModificarLibroDialog;
