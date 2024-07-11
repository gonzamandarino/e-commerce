import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { CartContext } from "../contexts/cartContext";
import { postVenta } from "../features/venta/ventaSlice"; // Importa la acción postVenta

const ShoppingCart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  // Calcular la cantidad total de artículos en el carrito
  const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Calcular el precio total sumando el precio de cada artículo multiplicado por su cantidad
  let totalPrice = cart.reduce((acc, curr) => acc + curr.quantity * curr.precio, 0);

  // Aplicar un descuento del 15% si la cantidad de artículos es mayor a 3
  const discount = quantity > 3 ? 0.15 : 0;
  const discountedPrice = totalPrice * (1 - discount);

  const handleCheckout = () => {
    const ventaData = cart.map(item => ({
      idlibro: item.libro_id,
      cantidad: item.quantity.toString()
    }));

    dispatch(postVenta(ventaData))
      .then(() => {
        setShowAlert(true);
        setCart([]);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        // Manejar el error aquí si es necesario
      });
  };

  // Renderizar el componente ShoppingCart
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 cart-container">
          {/* Mostrar la alerta solo si showAlert es true */}
          {showAlert && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              ¡Compra realizada con éxito!
              {/* Botón para cerrar la alerta */}
              <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
            </div>
          )}
          <div className="bg-warning rounded-5">
            <h1 className="text-center text-black">Carrito de compras</h1>
            <div>Items en el carrito: {quantity}</div>
            {quantity > 3 && (
              <div>
                Sub-total: ${totalPrice.toFixed(2)}
              </div>
            )}
            <strong>
              <div>Total: ${discountedPrice.toFixed(2)}</div>
            </strong>
            <button onClick={handleCheckout} className="btn btn-warning">Checkout</button>
            <div>
              {cart.map(item => (
                <div className="div" key={item.productId}>
                  <p>Nombre: {item.nombre}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio por item: ${item.precio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
