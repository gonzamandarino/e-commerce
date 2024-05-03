import { useParams,useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getLibrosxId from "../service/getLibrosxId"


export  const DetalleLibro = () =>{

    const cadena = "/catalogo/1";
    const indice = "/catalogo/".length;
    const numero = cadena.substring(indice);
    const [libros,setLibros]=useState([])
    const location = useLocation();
    console.log(numero);
    console.log(location.pathname);

    useEffect(() => {
        getLibrosxId(numero).then((data) => {
            setLibros(data);
        });
    }, []);


const{DetalleLibro} =useParams();

return(
    
<>


<div>{libros.nombre}</div>












</>)}
export default DetalleLibro