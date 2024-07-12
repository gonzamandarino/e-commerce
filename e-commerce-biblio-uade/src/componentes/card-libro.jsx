/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/cartContext";
import { Button } from '@mui/material';
import DetalleLibro from './DetalleLibro';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerImagen } from "../features/imagenes/imagenesSlice";

const Card = ({ nombre, precio, libro_id, stock, imagen }) => { // Agrega imagen como prop
    const [cart, setCart] = useContext(CartContext);
    const [open, setOpen] = useState(false);
    const [stockCount, setStockCount] = useState(stock);
    const dispatch = useDispatch();
    const imageUrl = useSelector((state) => state.imagenes.imagenesPorLibro[imagen]); // Usa imagen como clave

    useEffect(() => {
        if (imagen && !imageUrl) {
            dispatch(obtenerImagen(imagen)); // Llama a la acción para obtener la imagen si aún no está cargada
        }
    }, [dispatch, imagen, imageUrl]);

    const addToCart = () => {
        setCart((currItems) => {
            const isItemsFound = currItems.find((item) => item.libro_id === libro_id);
            if (isItemsFound) {
                return currItems.map((item) => {
                    if (item.libro_id === libro_id) {
                        return { ...item, quantity: item.quantity + 1, nombre };
                    } else {
                        return item;
                    }
                });
            } else {
                return [...currItems, { libro_id, quantity: 1, precio, nombre }];
            }
        });
        setStockCount(stockCount - 1); // Reducir el stock al agregar un libro
    };

    const removeItem = () => {
        setCart((currItems) => {
            if (currItems.find((item) => item.libro_id === libro_id)?.quantity === 1) {
                return currItems.filter((item) => item.libro_id !== libro_id);
            } else {
                return currItems.map((item) => {
                    if (item.libro_id === libro_id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
        setStockCount(stockCount + 1); // Incrementar el stock al sacar un libro
    };

    const getQuantityById = () => {
        return cart.find((item) => item.libro_id === libro_id)?.quantity || 0;
    };

    const quantityPerItem = getQuantityById();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="card-img-top text-center ">
                {imageUrl ? (
                    <img
                        src={imageUrl} // Utiliza la URL de la imagen obtenida por imagen
                        alt={nombre}
                        className="photo w-75"
                        width={"25%"}
                        height={"150px"}
                        onClick={handleOpen}
                        style={{ cursor: 'pointer' }}
                    />
                ) : (
                    <div className="placeholder-image">Imagen no disponible</div>
                )}
                <div className="card-body">
                    <div className="card-price">${precio}</div>
                    <div className="card-title fw-bold fs-4">{nombre}</div>
                    {stockCount === 0 ? (
                        <Button
                            variant="outlined"
                            className="item-add-Button"
                            onClick={addToCart}
                            disabled={true}
                        >
                            Agregar
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            className="item-add-Button"
                            onClick={addToCart}
                        >
                            Agregar
                        </Button>
                    )}
                    {quantityPerItem > 0 && (
                        <Button
                            variant="outlined"
                            className="item-minus-Button"
                            onClick={removeItem}
                        >
                            Sacar
                        </Button>
                    )}
                </div>
            </div>
            <DetalleLibro open={open} handleClose={handleClose} libroId={libro_id} />
        </>
    );
};
export default Card;
