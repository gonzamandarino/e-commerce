
import React, { useEffect, useState } from "react";
import getLibros from "../service/getLibros"
import { Card } from "./card-libro";
import { Outlet, useParams } from "react-router-dom";
function ListaPorCategoria(){
    const [librosOriginales, setLibrosOriginales] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);

    const{categoria}=useParams()
    useEffect(() => {
        getLibros().then((data) => {
          setLibrosOriginales(data);
          
        });
      }, []);
    
      useEffect(() => {
        console.log(categoria)
        if (categoria) {
          const filtrados = librosOriginales.filter(
            (libro) => libro.categoria === categoria
          );
          setLibrosFiltrados(filtrados);
        } else {
         
          
        }
      }, [categoria, librosOriginales]);
    
      return (
        <>
          {librosFiltrados.map((product) => (
            <div className="col-md-4 col-sm-6 mb-3" key={product.id}>

              <div className="card my-3 py-3 border-0">
                <Card {...product} />
              </div>
            </div>
          ))}
        </>
      );
    }
    export default ListaPorCategoria