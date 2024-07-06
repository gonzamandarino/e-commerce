/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from '@mui/material';
import ModificarLibroDialog from './ModificarLibroDialog';
import { deleteLibro } from "../features/libros/librosSlice";

export const CardMod = ({ nombre, precio, id, imagen }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre,
        precio,
        imagen
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
        console.log(formData);
        handleClose();
    };

    const handleDelete = () => {
        dispatch(deleteLibro(id));
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
            </div>
        </div>
        
        <ModificarLibroDialog
            open={open}
            handleClose={handleClose}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
        />
        </>
    );
};

export default CardMod;
