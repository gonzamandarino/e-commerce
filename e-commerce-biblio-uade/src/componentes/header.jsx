import { useState, useContext } from "react";
import viteLogo from '/vite.svg'
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";

function Header(){ 
    const [cart, setCart] = useContext(CartContext);

    const quantity = cart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);
    
    
    return(
        <>
            <header className="container-fluid">
                <div className="row">
                <div className="col-md-2 position-relative" >
                            <img src={viteLogo} className="logo " alt="Vite logo" />
                        <Link to="/">
                            <h1>BIBLIO UADE</h1>
                        </Link>
                        </div>
                        <div className="col-md-6"></div>

                        <div className="col-md-4 ">
                            <Link to="/inicio-sesion">
                                Iniciar sesión
                            </Link>

                            <Link to="/registro">
                                Registro
                            </Link>
                    </div> 






                </div>
                <nav className="row  text-black">
                    <div className="col-md-1 bg-warning text-black"></div>
                    <div className=" col-md-11 bg-warning d-flex justify-content-start text-black">

                        <div className="btn-group btn-group-toggle position-relative text-black " >
                            <Link to={"/"}>
                                Inicio 
                            </Link>
                            <Link to={"/catalogo"} >
                                Catalogo
                            </Link>
                            <Link to={"/preguntas"}>
                                Preguntas
                            </Link>
                            <Link to={"/contacto"}>
                                Contacto
                            </Link>
                            <Link to={"/cart"}>
                                Cart items: <span className="cart-count">{quantity}</span>
                            </Link>
                        </div>
                    </div>                   
                </nav>
                <hr />
            </header>
        
        </>
    
    )
}
export default Header;