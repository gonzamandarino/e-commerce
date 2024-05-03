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

                        <div className="col-md-2 btn btn-lg btn-sesion   ">
                            <div className="bg-warning rounded-2">
                            <Link   to="/inicio-sesion">
                                Iniciar sesión
                            </Link>
                            </div>
                    </div> 
                    <div className="col-md-2 btn btn-lg btn-sesion  ">
                    <div className="bg-warning rounded-2">
                            <Link to="/registro">
                                Registro
                            </Link>
                            </div>


                    </div>






                </div>
                <nav className="row  text-black">
                    <div className=" col-md-1 bg-warning text-black"></div>
                    <div className=" col-md-11 bg-warning d-flex justify-content-start text-black">

                    <div id="inicio" className=" col-md-1 text-white" >
                    <Link to={"/"}>
                                Inicio 
                            </Link>


                    </div>
                    <div id="catalogo" className=" col-md-1">
                    <Link to={"/catalogo"} >
                                Catalogo
                            </Link>


                    </div>

                    <div id="contacto" className=" col-md-1">
                    <Link to={"/contacto"}>
                                Contacto
                            </Link>


                    </div>
                    <div id="cart" className=" col-md-2">
                    <Link to={"/cart"}>
                                Cart items: <span className="cart-count">{quantity}</span>
                            </Link>


                    </div>
                    <div className="col-md 4"></div>
                    <div id="mis-libros" className=" col-md-1">
                    <Link to={"/mislibros"}>
                                Mis libros
                            </Link>
                    </div>

                        <div className="btn-group btn-group-toggle position-relative text-black " >





                        </div>
                    </div>                   
                </nav>
                <hr />
            </header>
        
        </>
    
    )
}
export default Header;