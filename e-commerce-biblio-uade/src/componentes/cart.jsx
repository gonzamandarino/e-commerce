import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/cartContext";

const ShoppingCart = () => {
    const [cart, setCart] = useContext(CartContext);
    const [showAlert, setShowAlert] = useState(false);

    const quantity = cart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    const totalPrice = cart.reduce(
        (acc, curr) => acc + curr.quantity * curr.precio, 0);

    const handleCheckout = () => {
        // como enviar una solicitud al servidor para procesar la compra.
        setShowAlert(true);
        setCart([]);

        // Ocultar la alerta después de 3 segundos
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (
        <div className="cart-container">
            {/* Mostrar la alerta solo si showAlert es true */}
            {showAlert && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    ¡Compra realizada con éxito!
                    <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                </div>
            )}
            <div>
                <div>Items in cart: {quantity}</div>
                <div>Total: ${totalPrice}</div>
                <button onClick={handleCheckout} className="btn btn-primary">Checkout</button>
            </div>
        </div>
    );
};

export default ShoppingCart;
