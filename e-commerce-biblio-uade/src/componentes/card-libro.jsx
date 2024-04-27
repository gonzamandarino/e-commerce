import React, { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import {Button} from '@mui/material';

export const Card = ({ nombre, precio, id, imagen }) => {
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id);
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { id, quantity: 1, precio }];
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

  return (
    <div className="item-box ">

      {quantityPerItem > 0 && (
        <div className="item-quantity">{quantityPerItem}</div>
      )}

      <div className="bg-warning">{nombre}</div>
      <img src={imagen} width="80" height="55" />
      <div className="item-precio">${precio}</div>

      {quantityPerItem === 0 ? (
        <Button variant="outlined" className="item-add-Button" onClick={() => addToCart()}>
          Agregar
        </Button>
      ) : (
        <Button  variant="outlined" className="item-plus-Button" onClick={() => addToCart()}>
          Agregar
        </Button>
      )}

      {quantityPerItem > 0 && (
        <Button variant="outlined" className="item-minus-Button" onClick={() => removeItem(id)}>
          Sacar
        </Button>
      )}
    </div>
  );
};
