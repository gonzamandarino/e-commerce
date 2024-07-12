// src/components/Header.js
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import logoLibros from '/logoLibros.png';
import { logout, selectUsername, selectIsAuthenticated } from "../features/auth/authSlice"; // Importa selectUsername y selectIsAuthenticated
import Button from '@mui/material/Button';

function Header() {
    const [cart] = useContext(CartContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated); // Obtén el estado de autenticación
    const username = useSelector(selectUsername); // Obtén el nombre de usuario desde el estado de Redux

    const quantity = cart.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <>
            <header className="container-fluid">
                <div className="row">
                    <div className="col-md-2 position-relative">
                        <img src={logoLibros} className="logo" alt="Vite logo" />
                        <Link to="/">
                            <h4>BIBLIO UADE</h4>
                        </Link>
                    </div>
                    <div className="col-md-6"></div>
                    {!isAuthenticated ? (
                        <>
                            <div className="col-md-2 ">
                                <div className="bg-warning rounded-2 btn">
                                    <Link to="/inicio-sesion">
                                        Iniciar sesión
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="bg-warning rounded-2 btn">
                                    <Link to="/registro">
                                        Registro
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="col-md-2">
                                Bienvenido {username}
                                <div className="col-md-12">
                                <Button variant="contained" className="col-md-4 btn" onClick={handleLogout}>Cerrar sesión</Button>
                                </div>
                            
                        </div>
                    )}
                </div>
                <nav className="row text-black">
                    <div className="col-md-12 bg-warning text-black"></div>
                    <div className="col-md-12 bg-warning d-flex justify-content-start text-black">
                        <div id="inicio" className="col-md-1 text-white">
                            <Link to={"/"}>
                                Inicio
                            </Link>
                        </div>
                        <div id="catalogo" className="col-md-1">
                            <Link to={"/catalogo"}>
                                Catalogo
                            </Link>
                        </div>
                        <div id="contacto" className="col-md-1">
                            <Link to={"/contacto"}>
                                Contacto
                            </Link>
                        </div>
                        {!isAuthenticated ? (
                            <div id="cart" className="col-md-1 disabled">
                                <span>Cart items: <span className="cart-count">{quantity}</span></span>
                            </div>
                        ) : (
                            <div id="cart" className="col-md-1">
                                <Link to={"/cart"}>
                                    Cart items: <span className="cart-count">{quantity}</span>
                                </Link>
                            </div>
                        )}
                        <div className="col-md-7"></div>
                        {!isAuthenticated ? (
                            <div id="mis-libros" className="col-md-1 disabled">
                                <span>Mis libros</span>
                            </div>
                        ) : (
                            <div id="mis-libros" className="col-md-1">
                                <Link to={"/mislibros"}>
                                    Mis libros
                                </Link>
                            </div>
                        )}
                        <div className="btn-group btn-group-toggle position-relative text-black">
                        </div>
                    </div>
                </nav>
                <hr />
            </header>
        </>
    );
}

export default Header;
