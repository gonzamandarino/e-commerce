/* eslint-disable react/prop-types */
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

    function ModificarLibroDialog({ open, handleClose, handleChange, handleSubmit, formData }) {
    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modificar Libro</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={formData.nombre}
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
            name="imagen"
            label="Imagen"
            type="text"
            fullWidth
            value={formData.imagen}
            onChange={handleChange}
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
