import React, { useState } from 'react';
import ig from '/ig.png'
import tw from '/twitter.png' 
import fb from '/fb.png' 


    
    function Contacto() {





        const [datoContacto,setDatoContacto] = useState({
            nombre:"" ,
            mail:"" ,
            telefono:"" ,
            texto:""

    });
            



    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatoContacto({
            ...datoContacto,
            [name]: value
        });

    };



            const handleClick=()=>{
                

if(datoContacto.nombre.trim()===""){
    alert("Por favor, rellene su nombre")
    return;
}



if(datoContacto.mail.trim()===""){
    alert("Por favor, rellene su mail")
    return;
}
if(datoContacto.texto.trim()===""){
    alert("Por favor, ingrese un mensaje")
    return;
}

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
            <input className="p-2 col-md-6 text-black bg-white  " type="text" placeholder='Ingrese su nombre' name="nombre" onChange={handleChange}/>
            </form>
            </div>
        </div>
        <div className="row">
            <div className="p-3 col-md-5 text-black display-7 rounded-5 bg-warning ">Nuestras redes sociales</div>
            <div className="col-md-2"></div>
            <div className="p-2 col-md-5 bg-warning">            <form onSubmit={(e) => e.preventDefault()}> 
            <input className="p-2 col-md-6 text-black bg-white  " type="text" placeholder='Ingrese su Mail' name="mail" onChange={handleChange} />
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
            <input className="p-2 col-md-6 text-black bg-white " type="text" placeholder='Ingrese su Teléfono(opcional)'  name="telefono" onChange={handleChange} />
            </form></div>
        </div>
        <div className="row">
            <div className="p-3 col-md-5 text-black display-7 rounded-5 bg-warning ">Nuestro Teléfono:</div>
            <div className="col-md-2"></div>
            <div className="p-2 col-md-5 bg-warning">            <form onSubmit={(e) => e.preventDefault()}> 
            <input className="p-2 col-md-6 text-black bg-white " type="text" placeholder='Ingrese su mensaje' name="texto" onChange={handleChange} />
            </form></div>
        </div>
        <div className="row">
            <div className="p-2 col-md-5 text-white">15-1111-1111</div>
            <div className="col-md-2"></div>
            <div className="p-2 col-md-5 rounded-bottom-5 bg-warning">            <form onSubmit={(e) => e.preventDefault()}> 
            <button onClick={handleClick} >enviar</button>
            </form></div>
        </div>
        
        </div>
        </>
        
)
    }
    
export default Contacto;