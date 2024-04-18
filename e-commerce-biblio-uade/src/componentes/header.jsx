import { useState } from "react";
import viteLogo from '/vite.svg'


function Header(){


    const [botonesActivados, setBotonesActivados] = useState([false, false, false, false]);

    const cambiar = (index) => {
        const nuevosBotonesActivados = botonesActivados.map((estado, i) => i === index);
        setBotonesActivados(nuevosBotonesActivados);
    }
    

    return(
        <>
            <header className="container-fluid">
                <nav className="row">
                    <div className=" col-md-8">
                        <div className="position-relative row">
                            <div className="col-md-2 position-relative" >
                            <img src={viteLogo} className="logo " alt="Vite logo" />

                        <h1>BIBLIO UADE</h1>
                        </div>
                        </div>
                        <div className="btn-group btn-group-toggle position-relative" data-toggle="buttons">
                            <button className={`btn btn-header ${botonesActivados[0] ? 'activo' : ''}`} onClick={() => cambiar(0)}> <a>Inicio</a> </button>
                            <button className={`btn btn-header ${botonesActivados[1] ? 'activo' : ''}`} onClick={() => cambiar(1)}> <a>Catalogo</a> </button>
                            <button className={`btn btn-header ${botonesActivados[2] ? 'activo' : ''}`} onClick={() => cambiar(2)}> <a >Preguntas</a></button>
                            <button className={`btn btn-header ${botonesActivados[3] ? 'activo' : ''}`} onClick={() => cambiar(3)}> <a >Contacto</a></button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-lg btn-sesion btn-warning "><a href="">Iniciar sesión</a> </button> 
                        <button className="btn btn-lg btn-sesion  btn-header" aria-pressed="true"><a href="">Registro</a></button>   
                    </div>                    

                </nav>
                <hr />
            </header>
        
        </>
    
    )
}
export default Header;