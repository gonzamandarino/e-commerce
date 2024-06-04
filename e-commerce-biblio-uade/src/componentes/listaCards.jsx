import React, { useEffect, useState } from "react";

import getLibros from "../service/getLibros"
import { Card } from "./card-libro";
import { Outlet } from "react-router-dom";
import Buscador from "./buscador";

const ListaCard = () => {
    const [libros,setLibros]=useState([])

    useEffect(() => {
        getLibros().then((data) => {
            setLibros(data);
        });
    }, []);

    





    return (
      <div className="container-fluid">
        <Buscador ></Buscador>
        <div className="row justify-content-center">
          <h2>Llevando más de 3 libros tenes un 15% de descuento con tu compra!</h2>  
        </div>
          <div className="row justify-content-center">
            <Outlet></Outlet>
          </div>
        <div className="row justify-content-center">
          
          {libros.map((product) => (
            <div className="col-md-4 col-sm-6 mb-3" key={product.id}>
            <div className="card my-3 py-3 border-0">
              <Card {...product} />
              
            </div>
          </div>
          ))}
        </div>
          
      </div>
      
        
      
    );
          
};

export default ListaCard