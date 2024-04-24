import React, { useState } from 'react';
import DATOS from '../../DATOS/datos.json';
import Card from '../../componentes/card-libro';
import './Contacto.css'
import { Hidden } from '@mui/material';



    
    const Contacto = ({item, setItem}) => {


        const [datoContacto,setDatoContacto] = useState([
            {nombre:''},
            {mail:''},
            {telefono:''},
            {texto:''}
            ])
            
            const [nombre,setCnombre] = useState({})
            const [mail,setCmail] = useState({})
            const [telefono,setCtelefono] = useState({})
            const [texto,setCtexto] = useState({})


            const handleChangen = (event) => setCnombre(event.target.value);
            const handleChangem = (event) => setCmail(event.target.value);
            const handleChanget = (event) => setCtelefono(event.target.value);
            const handleChangetxt = (event) => setCtexto(event.target.value);


            const handleClick=()=>{
setDatoContacto([...datoContacto,{nombre},{mail},{telefono},{texto}])
console.log(datoContacto)


            }


return (



        <>


        <h1>Contacto</h1>
        <h3 class="subtexto">¿queres comunicarte con nosotros?</h3>
        <h3 class="subtexto">Utiliza las siguientes vías de contacto,o rellena el formulario.</h3>
        <br />
        <div class="dos-partes">



        <div class="parte-izq">

        <h3 class="subtexto">Nuestro Mail:</h3>
        <h4>hola@unsitiogenial.es</h4>
        <h3 class="subtexto">Nuestras redes sociales</h3>
        <h4>@redes</h4>
        <h3 class="subtexto">Nuestro Teléfono:</h3>
        <h4>15-1111-1111</h4>

        </div>

        <div class="parte-der">
            <form onSubmit={e => e.preventDefault()}>
        <label class="subtexto"> Ingrese sus datos</label>
        <br />     
        <input class="data" type="text" placeholder='Ingrese su nombre' name="nombre" onChange={handleChangen}/>
        <br />     
        <input class="data" type="text" placeholder='Ingrese su Mail' name="mail" onChange={handleChangem} />
        <br />       
        <input class="data" type="text" placeholder='Ingrese su Teléfono(opcional)'  name="telefono" onChange={handleChanget} />
        <br />
        <input class="texto" type="text" placeholder='Ingrese su mensaje' name="texto" onChange={handleChangetxt} />
        <br />
        <button onClick={handleClick} >enviar</button>
        </form>
        </div>


        </div>
        </>
        
)
    }
    
export default Contacto;