import React, { useEffect, useState } from "react";
import getLibros from "../service/getLibros"
import { Card } from "./card-libro";
import { Outlet, useParams } from "react-router-dom";


const ListaCard = () => {

    const [libros,setLibros]=useState([])
      
    useEffect(()=>{
      getLibros().then((data) => setLibros(data));
    },[])

    return (
      <>
      <div className="container-fluid">
          <div className="row justify-content-center">
            <Outlet></Outlet>
            <h3>Catálogo</h3>
        <hr style={{ border: 'none', borderTop: '1px solid #ffffff', margin: '1rem 0', width: '100%' }} />


        {
      
          
        libros.map((product) => (
           
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
    );
          
};

export default ListaCard