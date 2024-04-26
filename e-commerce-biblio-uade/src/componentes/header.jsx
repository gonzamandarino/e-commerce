import { useState } from "react";
import viteLogo from '/vite.svg'


function Header({actualizarEstado}){
    const [botonesActivados, setBotonesActivados] = useState([false, false, false, false]);

    const handleClick=(index)=>{
        const nuevosBotonesActivados = botonesActivados.map((estado, i) => i === index);
        setBotonesActivados(nuevosBotonesActivados);
        actualizarEstado(index)
    }
    
    

    return(
        <>
            <header className="container-fluid">
                <div className="row">
                <div className="col-md-2 position-relative" >
                            <img src={viteLogo} className="logo " alt="Vite logo" />

                        <h1>BIBLIO UADE</h1>
                        </div>
                        <div className="col-md-6"></div>

                        <div className="col-md-4 ">
                        <button className={`btn btn-lg btn-sesion btn-warning ${botonesActivados[5] ?'activo':''}`} onClick={()=>handleClick(5)}><a href="">Iniciar sesión</a> </button> 
                        <button className={`btn btn-lg btn-sesion  btn-header  ${botonesActivados[4] ?'activo':''}`}aria-pressed="true" onClick={()=>handleClick(4)}><a >Registro</a></button>   
                    </div> 






                </div>
                <nav className="row  text-black">
                    <div className="col-md-1 bg-warning text-black"></div>
                    <div className=" col-md-11 bg-warning d-flex justify-content-start text-black">

                        <div className="btn-group btn-group-toggle position-relative text-black " data-toggle="buttons">
                            <button className={` text-black btn btn-header ${botonesActivados[0] ? 'activo' : ''}`} onClick={()=>handleClick(0)}> <a>Inicio</a> </button>
                            <button className={` text-black btn btn-header ${botonesActivados[1] ? 'activo' : ''}`} onClick={()=>handleClick(1)}> <a>Catalogo</a> </button>
                            <button className={` text-black btn btn-header ${botonesActivados[2] ? 'activo' : ''}`} onClick={() => handleClick(2)}> <a >Preguntas</a></button>
                            <button className={` text-black btn btn-header ${botonesActivados[3] ? 'activo' : ''}`} onClick={() => handleClick(3)}> <a >Contacto</a></button>
                            
                        </div>
                    </div>                   
                </nav>
                <hr />
            </header>
        
        </>
    
    )
}
export default Header;