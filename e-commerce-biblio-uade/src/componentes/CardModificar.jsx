/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from '@mui/material';
import ModificarLibroDialog from './ModificarLibroDialog';
import { deleteLibro, addStockLibro, updateLibro } from "../features/libros/librosSlice";

export const CardMod = ({ nombre, precio, libro_id, imagen, descripcion, autor }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [cantidad, setCantidad] = useState(1);
    const [formData, setFormData] = useState({
        nombre,
        precio,
        imagen,
        descripcion,
        autor,
        cate: []
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateLibro({ libro_id, libroActualizado: formData }));
        handleClose();
    };

    const handleDelete = () => {
        dispatch(deleteLibro(libro_id));
    };

    const handleStock = () => {
        dispatch(addStockLibro({ libro_id, stockAsumar: cantidad }));
        alert("Se agregó el stock!");
    };

    const handleCantidadChange = (e) => {
        setCantidad(Number(e.target.value));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            imagen: file
        });
    };

    return (
        <>
            <div className="card-img-top text-center">
                <img src={imagen} alt={nombre} className="photo w-75" width={"25%"} height={"150px"} />
                <div className="card-body">
                    <div className="card-price">${precio}</div>
                    <div className="card-title fw-bold fs-4">{nombre}</div>
                    <Button variant="outlined" className="item-modify-Button" onClick={handleClickOpen}>
                        Modificar
                    </Button>
                    <Button variant="outlined" className="item-delete-Button" onClick={handleDelete}>
                        Borrar
                    </Button>
                    <TextField
                        type="number"
                        label="Cantidad"
                        value={cantidad}
                        onChange={handleCantidadChange}
                        inputProps={{ min: 1 }}
                    />
                    <Button variant="outlined" className="item-stock-Button" onClick={handleStock}>
                        Sumar stock
                    </Button>
                </div>
            </div>

            <ModificarLibroDialog
                open={open}
                handleClose={handleClose}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                handleFileChange={handleFileChange}
            />
        </>
    );
};

export default CardMod;
