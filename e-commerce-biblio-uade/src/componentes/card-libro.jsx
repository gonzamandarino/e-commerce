import { Button } from "@mui/material";
import React from "react";

const Card = ({ item, setItem }) => {            
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          {item.map((Val) => {
            return (
              <div
                className="col-md-4 col-sm-6 card my-3 py-3 border-0"
                key={Val.id}
              >
                <div className="card-img-top text-center">
                  <img src={Val.imagen} alt={Val.nombre} className="photo w-75" width={"25%"} height={"150px"} />
                </div>
                <div className="card-body">
                  <div className="card-price">
                    {Val.precio}
                  </div>
                  <div className="card-title fw-bold fs-4">
                    {Val.nombre} &nbsp;&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;
                    {Val.autor}
                  </div>
                  <div className="card-text">{Val.resumen}</div>
                  <div className="card-button">
                    <Button disabled = {!Val.stock} onClick={agregarCarrito({Val,setItem})}>Agregar</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

//Intento de funcion para agregar a carrito y poner stock como false. No anda
function agregarCarrito(item,setItem) {
  const agregar = (item, setItem) => {
      alert(item);
      setItem.stock = false;
  }
}

export default Card;