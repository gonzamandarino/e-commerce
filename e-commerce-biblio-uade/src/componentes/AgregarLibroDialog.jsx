/* eslint-disable react/prop-types */

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

    function AgregarLibroDialog({ open, handleClose, handleChange, handleSubmit, formData, handleFileChange }) {
    const isFormComplete = formData.titulo && formData.autor && formData.descripcion && formData.imagen && formData.precio;

    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Libro</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            name="titulo"
            label="Título"
            type="text"
            fullWidth
            value={formData.titulo}
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
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSubmit} disabled={!isFormComplete}>Agregar</Button>
        </DialogActions>
        </Dialog>
    );
    }

    export default AgregarLibroDialog;
