import React, { useState } from 'react';
import DATOS from '../../DATOS/datos.json';
import Card from '../../componentes/card-libro';
import './Contacto.css'
import { Hidden } from '@mui/material';
import ig from '/ig.png'
import tw from '/twitter.png' 
import fb from '/fb.png' 
import Footer from '../footer';


    
    const Contacto = () => {

        const [nombre,setCnombre] = useState({})
        const [mail,setCmail] = useState({})
        const [telefono,setCtelefono] = useState({})
        const [texto,setCtexto] = useState({})

        const [datoContacto,setDatoContacto] = useState([
            { nombre:"" },
            { mail:"" },
            { telefono:"" },
            {texto:""}

            ]);
            



            const handleChangen = (event) => setCnombre(event.target.value);
            const handleChangem = (event) => setCmail(event.target.value);
            const handleChanget = (event) => setCtelefono(event.target.value);
            const handleChangetxt = (event) => setCtexto(event.target.value);


            const handleClick=()=>{
                
                if(nombre.trim() ===""){
                    alert("El campo no puede estar vacio");
                    return;
                }
                if(mail.trim() ===""){
                    alert("El campo no puede estar vacio");
                    return;
                }
                if(texto.trim() ===""){
                    alert("El campo no puede estar vacio");
                    return;
                }

setDatoContacto([{nombre},{mail},{telefono},{texto}])
console.log(datoContacto)


            }


return (



        <>

        <div className="container text-center">
        <div className="row">
            <div  className="rounded-top-5 bg-warning p-2 col-md-12 text-black display-2 ">Contacto</div>
        </div>
        <div className="row">
            <div className="bg-warning p-2 col-md-12 text-black display-5">¿queres comunicarte con nosotros?</div>
        </div>
        <div className="row">
            <div className="rounded-bottom-5 bg-warning p-2 col-md-12 text-black display-5">Utiliza las siguientes vías de contacto o rellena el formulario.</div>
        </div>
        <div className="pt-3 row">
            <div className="p-3 col-md-5 text-black display-7 rounded-5 bg-warning ">Nuestro Mail:</div>
            <div className="col-md-2"></div>
            <div className="p-3 col-md-5 text-black display-7 rounded-top-5 bg-warning  d-flex justify-content-center ">Ingrese sus datos:</div>
        </div>
        <div className="row">
            <div className="p-2 col-md-5 text-white ">hola@unsitiogenial.es</div>
            <div className="col-md-2"></div>
            <div className="p-2 col-md-5 text-black bg-warning">
            <form onSubmit={(e) => e.preventDefault()}> 
            <input className="p-2 col-md-6 text-black bg-white  " type="text" placeholder='Ingrese su nombre' name="nombre" onChange={handleChangen}/>
            </form>
            </div>
        </div>
        <div className="row">
            <div className="p-3 col-md-5 text-black display-7 rounded-5 bg-warning ">Nuestras redes sociales</div>
            <div className="col-md-2"></div>
            <div className="p-2 col-md-5 bg-warning">            <form onSubmit={(e) => e.preventDefault()}> 
            <input class="p-2 col-md-6 text-black bg-white  " type="text" placeholder='Ingrese su Mail' name="mail" onChange={handleChangem} />
            </form></div>
        </div>
        <div className="row">
            <div className="p-2 col-md-5 text-white">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><img className="col-md-1" src={ig} alt="instagram logo" href="www.youtube.com" /></a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><img className="col-md-1 rounded-3" src={tw} alt="twitter logo" href="www.youtube.com" /></a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"><img className="col-md-1 rounded-3 " src={fb} alt="facebook logo" href="www.youtube.com" /></a>
            </div>
            <div className="col-md-2"></div>
            <div className="p-2 col-md-5 bg-warning">            <form onSubmit={(e) => e.preventDefault()}> 
            <input class="p-2 col-md-6 text-black bg-white " type="text" placeholder='Ingrese su Teléfono(opcional)'  name="telefono" onChange={handleChanget} />
            </form></div>
        </div>
        <div className="row">
            <div className="p-3 col-md-5 text-black display-7 rounded-5 bg-warning ">Nuestro Teléfono:</div>
            <div className="col-md-2"></div>
            <div className="p-2 col-md-5 bg-warning">            <form onSubmit={(e) => e.preventDefault()}> 
            <input class="p-2 col-md-6 text-black bg-white " type="text" placeholder='Ingrese su mensaje' name="texto" onChange={handleChangetxt} />
            </form></div>
        </div>
        <div className="row">
            <div className="p-2 col-md-5 text-white">15-1111-1111</div>
            <div className="col-md-2"></div>
            <div className="p-2 col-md-5 rounded-bottom-5 bg-warning">            <form onSubmit={(e) => e.preventDefault()}> 
            <button onClick={handleClick} >enviar</button>
            </form></div>
        </div>
        <Footer />
        </div>
        </>
        
)
    }
    
export default Contacto;