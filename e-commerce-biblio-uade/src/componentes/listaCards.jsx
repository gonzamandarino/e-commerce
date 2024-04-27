import React, { useEffect, useState } from "react";
import storeItems from "../DATOS/datos.json"
import { Card } from "./card-libro";

const ListaCard = () => {





    const [libros,setLibros] = useState([]);

    useEffect(  ()=>{
        fetch("http://localhost:3000/libros") .then((response) => response.json()) .then((data) => setLibros(data))

        console.log("aca te los imprimi")
         console.log(libros)


    }, [])


    return (
        

    


        <div className="items-list ">

        {libros.map((product, idx) => {

            return <Card key={product.id} {...product} />;

        })}
        </div>
    );
};

export default ListaCard