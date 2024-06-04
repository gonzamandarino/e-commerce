import React, { useEffect, useState } from "react";
import getLibros from "../service/getLibros";
import { Card } from "./card-libro";
import { Outlet } from "react-router-dom";
import Buscador from "./buscador";
import Filtro from "./Filtro"

const ListaCard = () => {
  const [libros, setLibros] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getLibros().then((data) => {
      setLibros(data);
      const categoriasUnicas = [...new Set(data.map(libro => libro.categoria))];
      setCategorias(categoriasUnicas);
    });
  }, []);

  const handleFilterChange = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const librosFiltrados = categoriaSeleccionada
    ? libros.filter(libro => libro.categoria === categoriaSeleccionada)
    : libros;

  return (
    <div className="container-fluid">
      <Buscador />
      <div className="row justify-content-center">
        <h2>Llevando más de 3 libros tenes un 15% de descuento con tu compra!</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 col-sm-6 mb-3">
        <Filtro categorias={categorias} onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="row justify-content-center">
        <Outlet />
      </div>
      <div className="row justify-content-center">
        {librosFiltrados.map((product) => (
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

export default ListaCard;
