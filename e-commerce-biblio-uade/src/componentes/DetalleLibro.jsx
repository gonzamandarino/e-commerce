import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLibroByID } from "../features/libros/librosSlice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export const DetalleLibro = ({ open, handleClose, libroId }) => {
  const dispatch = useDispatch();
  const libro = useSelector((state) => state.libros.selectedLibro);

  useEffect(() => {
    if (open) {
      dispatch(getLibroByID(libroId));
    }
  }, [dispatch, libroId, open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{libro?.nombre} - {libro?.autor}</DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          height="400"
          image={libro?.imagen}
          alt={libro?.nombre}
        />
        <DialogContentText>
          <Typography variant="h6" component="div" gutterBottom>
            Precio: ${libro?.precio}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {libro?.resumen}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button size="small" variant="contained" onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

DetalleLibro.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  libroId: PropTypes.string.isRequired,
};

export default DetalleLibro;
