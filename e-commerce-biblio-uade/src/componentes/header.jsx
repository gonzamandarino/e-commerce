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
            <header>
                <nav>
                    <div>
                    <img src={viteLogo} className="logo" alt="Vite logo" />

                    <h1>BIBLIO UADE</h1>
                    </div>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <button className={`btn btn-header ${botonesActivados[0] ? 'activo' : ''}`} onClick={() => cambiar(0)}> <a>Inicio</a> </button>
                        <button className={`btn btn-header ${botonesActivados[1] ? 'activo' : ''}`} onClick={() => cambiar(1)}> <a>Catalogo</a> </button>
                        <button className={`btn btn-header ${botonesActivados[2] ? 'activo' : ''}`} onClick={() => cambiar(2)}> <a >Preguntas</a></button>
                        <button className={`btn btn-header ${botonesActivados[3] ? 'activo' : ''}`} onClick={() => cambiar(3)}> <a >Contacto</a></button>
                    </div>
                    <div>
                        <button className="btn btn-lg btn-sesion btn-warning "><a href="">Iniciar sesión</a> </button> 
                        <button className="btn btn-lg btn-sesion  btn-header" aria-pressed="true"><a href="">Registro</a></button>   
                    </div>                    

                </nav>

            </header>
        
        </>
    
    )
}
export default Header;