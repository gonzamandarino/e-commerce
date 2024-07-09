import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/cartContext";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import DetalleLibro from './DetalleLibro';

export const Card = ({ nombre, precio, id, imagen }) => {
  const [cart, setCart] = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const addToCart = () => {
    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id);
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1, nombre };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { id, quantity: 1, precio, nombre }];
      }
    });
  };

  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getQuantityById = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(id);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="card-img-top text-center">
        <img
          src={imagen}
          alt={nombre}
          className="photo w-75"
          width={"25%"}
          height={"150px"}
          onClick={handleOpen}
          style={{ cursor: 'pointer' }}
        />
        <div className="card-body">
          <div className="card-price">${precio}</div>
          <div className="card-title fw-bold fs-4">{nombre}</div>
          {quantityPerItem === 0 ? (
            <Button variant="outlined" className="item-add-Button" onClick={addToCart}>
              Agregar
            </Button>
          ) : (
            <Button variant="outlined" className="item-plus-Button" onClick={addToCart}>
              Agregar
            </Button>
          )}
          {quantityPerItem > 0 && (
            <Button variant="outlined" className="item-minus-Button" onClick={() => removeItem(id)}>
              Sacar
            </Button>
          )}
        </div>
      </div>
      <DetalleLibro open={open} handleClose={handleClose} libroId={id} />
    </>
  );
};

export default Card;
