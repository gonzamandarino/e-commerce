import React, { useEffect, useState } from "react";
import getLibros from "../service/getLibros"
import { Card } from "./card-libro";
import {  useParams } from "react-router-dom";
function ListaPorAutor(){
    const [libros,setLibros]=useState([])
    const [libroAutor,setLibrosAutor]=useState([])


    const {autor}=useParams();
       
    useEffect(()=>{
        getLibros().then((data) => setLibros(data));
      },[])
      useEffect(() => {
        if (autor) {
            console.log("ruta: "+autor)
            const filtrados = libros.filter(libro => libro.autor.toLowerCase() === autor.toLowerCase());
            setLibrosAutor(filtrados);
        }else{}

    }, [autor,libros]);  
return(

    <>
    <div className="container-fluid">
          <div className="row justify-content-center">
           
          </div>
        <div className="row justify-content-center" id="listado">

        {
      
          
      libroAutor.map((product) => (
           
                <div className="col-md-4 col-sm-6 mb-3" key={product.id}>
                    <div className="card my-3 py-3 border-0">
                        <Card {...product} />
                    </div>
                </div>
              
     

        ))
        

       
        
        }
        </div>
          
      </div>
      
        
    </>
)
}export default ListaPorAutor