/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/cartContext";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import ModificarLibroDialog from './ModificarLibroDialog'; // Asegúrate de que la ruta es correcta

    export const CardMod = ({ nombre, precio, id, imagen }) => {
    const [cart, setCart] = useContext(CartContext);
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

    //TODO Poner para que se guarde en la bd y se borre en la bd
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleClose();
    };

    const deleteItem = (id) => {
        console.log(`Eliminar libro con id: ${id}`);
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
            <Button variant="outlined" className="item-delete-Button" onClick={() => deleteItem(id)}>
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
