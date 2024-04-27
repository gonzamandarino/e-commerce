import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/cartContext";

const ShoppingCart = () => {
    const [cart, setCart] = useContext(CartContext);
    const [showAlert, setShowAlert] = useState(false);

    // Calcular la cantidad total de artículos en el carrito
    const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

    // Calcular el precio total sumando el precio de cada artículo multiplicado por su cantidad
    const totalPrice = cart.reduce((acc, curr) => acc + curr.quantity * curr.precio, 0);

    const handleCheckout = () => {
        setShowAlert(true);
        setCart([]);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const getStockInfo = (productId) => {
        setTimeout(() => {
            // información de stock del producto del backend
            const stockInfo = {
                productId: productId,
                stock: Math.floor(Math.random() * 10) + 1 // Simulo stock
            };
        }, 1000);
    };

    useEffect(() => {
        cart.forEach(item => {
            getStockInfo(item.productId);
        });
    }, []); // Solo se llama a esta función cuando el componente se inicializa

    // Renderizar el componente ShoppingCart
    return (
        <div className="cart-container">
            {/* Mostrar la alerta solo si showAlert es true */}
            {showAlert && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    ¡Compra realizada con éxito!
                    {/* Botón para cerrar la alerta */}
                    <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                </div>
            )}
            <div>
                <h2>Carrito de compras</h2>
                <div>Items in cart: {quantity}</div>
                <div>Total: ${totalPrice}</div>
                <button onClick={handleCheckout} className="btn btn-warning ">Checkout</button>
                <div>
                    {cart.map(item => (
                        <div key={item.productId}>
                            <p>{item.productName}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price per item: ${item.precio}</p>
                            <p>Stock available: {item.stock}</p> {/* Mostrar la información de stock */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
